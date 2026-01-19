import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import WordExtractor from "word-extractor";

interface ParsedDevice {
  name: string;
  quantity: number;
  serialNumbers: string[];
  imeis: string[];
  isAccessory: boolean;
}

interface ParsedProtocol {
  invoiceNumber: string;
  invoiceDate: string;
  contractNumber: string;
  skladnica: string;
  clientName: string;
  devices: ParsedDevice[];
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "Brak pliku" }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    const isDocx = fileName.endsWith('.docx');
    const isDoc = fileName.endsWith('.doc');

    if (!isDocx && !isDoc) {
      return NextResponse.json({ error: "Nieobsługiwany format pliku. Dozwolone: .doc, .docx" }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let text = "";
    let html = "";

    if (isDocx) {
      // Use mammoth for .docx
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;

      const htmlResult = await mammoth.convertToHtml({ buffer });
      html = htmlResult.value;
    } else {
      // Use word-extractor for .doc
      const extractor = new WordExtractor();
      const extracted = await extractor.extract(buffer);
      text = extracted.getBody();
      html = ""; // word-extractor doesn't provide HTML
    }

    // Parse the protocol
    const parsed = parseProtocol(text, html);

    return NextResponse.json({ 
      success: true, 
      data: parsed,
      rawText: text.substring(0, 500) + "..." // For debugging
    });

  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json({ 
      error: "Błąd parsowania pliku", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

function parseProtocol(text: string, html: string): ParsedProtocol {
  // Initialize result
  const result: ParsedProtocol = {
    invoiceNumber: "",
    invoiceDate: "",
    contractNumber: "",
    skladnica: "",
    clientName: "",
    devices: []
  };

  // --- PARSE HEADER ---
  
  // Invoice number: "fakturą nr 1671/12/2025" or "faktura nr 1671/12/2025"
  const invoiceMatch = text.match(/faktur[aąę]\s+nr\s+([A-Z0-9\/\-]+)/i);
  if (invoiceMatch) {
    result.invoiceNumber = invoiceMatch[1];
  }

  // Invoice date: "z dnia 08.12.2025" or "dnia 08.12.2025"
  const dateMatch = text.match(/z?\s*dnia\s+(\d{1,2}[\.\/]\d{1,2}[\.\/]\d{4})/i);
  if (dateMatch) {
    result.invoiceDate = dateMatch[1].replace(/\//g, ".");
  }

  // Contract number: "Umową nr NH.271.42.2025" or "Umowa nr..."
  const contractMatch = text.match(/[Uu]mow[aąę]\s+nr\s+([A-Z0-9\.\/\-]+)/i);
  if (contractMatch) {
    result.contractNumber = contractMatch[1];
  }

  // Skladnica: "z ZUP LP w Łodzi" or "ZUP Łódź" etc.
  const skladnicaPatterns = [
    /z\s+(ZUP\s+LP\s+w\s+\w+)/i,
    /z\s+(ZSLP\s+\w+)/i,
    /z\s+(ZPUH\s+\w+)/i,
    /(ZUP\s+LP\s+w\s+\w+)/i,
    /(ZSLP\s+\w+)/i,
    /(ZPUH\s+\w+)/i,
  ];
  for (const pattern of skladnicaPatterns) {
    const match = text.match(pattern);
    if (match) {
      result.skladnica = match[1];
      break;
    }
  }

  // Client name: "Nadleśnictwa Wipsowo" or "Nadleśnictwo Wipsowo"
  const clientMatch = text.match(/[Nn]adle[sś]nictw[aoy]?\s+(\w+)/);
  if (clientMatch) {
    result.clientName = "Nadleśnictwo " + clientMatch[1];
  }

  // --- PARSE DEVICES AND ACCESSORIES ---
  
  // Serial number patterns - S followed by 10+ digits
  const serialNumberPattern = /S\d{10,}/g;
  // IMEI pattern - exactly 15 digits
  const imeiPattern = /\b\d{15}\b/g;
  
  // Extract ALL serial numbers from text first
  const allSerials = [...new Set(text.match(serialNumberPattern) || [])];
  const allImeis = [...new Set(text.match(imeiPattern) || [])];
  
  // Filter out IMEIs that might be part of serial numbers
  const filteredImeis = allImeis.filter(imei => 
    !allSerials.some(serial => serial.includes(imei) || imei.includes(serial.slice(-15)))
  );

  // Detect main device type
  let deviceName = "Nieznane urządzenie";
  if (text.match(/EM45/i)) deviceName = "Zebra EM45";
  else if (text.match(/TC27/i)) deviceName = "Zebra TC27";
  else if (text.match(/TC58/i)) deviceName = "Zebra TC58";
  else if (text.match(/EDA52/i)) deviceName = "Honeywell EDA52";
  else if (text.match(/CT47/i)) deviceName = "Honeywell CT47";
  else if (text.match(/PA768/i)) deviceName = "Unitech PA768";
  else if (text.match(/EA660/i)) deviceName = "Unitech EA660";
  else if (text.match(/Samsung.*A56/i) || text.match(/A56/i)) deviceName = "Samsung A56";
  else if (text.match(/Samsung.*S25.*Ultra/i) || text.match(/S25.*Ultra/i)) deviceName = "Samsung S25 Ultra";
  else if (text.match(/Samsung.*S25.*FE/i) || text.match(/S25.*FE/i)) deviceName = "Samsung S25 FE";
  else if (text.match(/Samsung.*S25/i)) deviceName = "Samsung S25";
  else if (text.match(/Mobilny\s+komputer\s+dotykowy/i)) deviceName = "Zebra EM45";
  else if (text.match(/ZEBRA/i)) deviceName = "Zebra";

  // Add main device if we found serial numbers
  if (allSerials.length > 0) {
    result.devices.push({
      name: deviceName,
      quantity: allSerials.length,
      serialNumbers: allSerials,
      imeis: filteredImeis,
      isAccessory: false
    });
  }

  // --- PARSE ACCESSORIES ---
  // Get main device quantity to use as default for accessories
  const mainDeviceQuantity = allSerials.length > 0 ? allSerials.length : 1;
  
  const lines = text.split(/\n|\r/).filter(l => l.trim());
  
  // Accessories to look for
  const accessoryKeywords = [
    { keyword: "Karta micro SD", name: "Karta micro SD" },
    { keyword: "Karta microSD", name: "Karta micro SD" },
    { keyword: "Ładowarka samochodowa", name: "Ładowarka samochodowa USB-C" },
    { keyword: "Ładowarka sieciowa", name: "Ładowarka sieciowa USB-C" },
    { keyword: "Akumulator", name: "Akumulator" },
    { keyword: "Etui", name: "Etui" },
    { keyword: "Folia", name: "Folia ochronna" },
    { keyword: "Rysik", name: "Rysik" },
    { keyword: "Uchwyt", name: "Uchwyt" },
    { keyword: "Podstawka", name: "Podstawka" },
    { keyword: "Kabel USB", name: "Kabel USB" },
    { keyword: "Pasek", name: "Pasek" },
  ];

  const foundAccessories = new Set<string>();

  for (const line of lines) {
    for (const acc of accessoryKeywords) {
      const keywordLower = acc.keyword.toLowerCase();
      const lineLower = line.toLowerCase();
      
      if (lineLower.includes(keywordLower) && !foundAccessories.has(acc.name)) {
        // Find where the accessory name ends in the line
        const keywordIndex = lineLower.indexOf(keywordLower);
        const afterKeyword = line.substring(keywordIndex + acc.keyword.length);
        
        // Skip any size specification (like "64 GB" or "3300 mAh") to find quantity
        // The quantity in the "Ilość" column comes AFTER the full product name
        // Pattern: "Karta micro SD 64 GB    30    Bn"
        // We need the number that's separated by whitespace and followed by "Bn" or "X"
        
        // Look for pattern: whitespace + number + whitespace + (Bn or X or number or end)
        const qtyMatch = afterKeyword.match(/(?:GB|mAh)?\s+(\d{1,3})\s+(?:Bn|X|\d|$)/i);
        
        let quantity = mainDeviceQuantity; // Default to main device quantity
        
        if (qtyMatch) {
          quantity = parseInt(qtyMatch[1]);
        } else {
          // Alternative: look for standalone number after skipping GB/mAh
          const cleanedAfter = afterKeyword.replace(/\d+\s*GB/gi, '').replace(/\d+\s*mAh/gi, '');
          const numMatch = cleanedAfter.match(/\b(\d{1,3})\b/);
          if (numMatch) {
            const num = parseInt(numMatch[1]);
            // Only use if it's a reasonable quantity (not a row number like 2, 3, 4)
            if (num >= 10 || num === mainDeviceQuantity) {
              quantity = num;
            }
          }
        }
        
        // Get better name for SD cards
        let finalName = acc.name;
        if (acc.name === "Karta micro SD") {
          const sizeMatch = line.match(/(\d+)\s*GB/i);
          if (sizeMatch) {
            finalName = `Karta micro SD ${sizeMatch[1]} GB`;
          }
        }
        if (acc.name === "Akumulator") {
          const mahMatch = line.match(/(\d+)\s*mAh/i);
          if (mahMatch) {
            finalName = `Akumulator ${mahMatch[1]} mAh`;
          }
        }

        foundAccessories.add(acc.name);
        result.devices.push({
          name: finalName,
          quantity: quantity,
          serialNumbers: [],
          imeis: [],
          isAccessory: true
        });
      }
    }
  }

  return result;
}

function extractDeviceName(line: string): string {
  // Try to extract meaningful device name
  if (line.match(/EM45/i)) return "Zebra EM45";
  if (line.match(/TC27/i)) return "Zebra TC27";
  if (line.match(/TC58/i)) return "Zebra TC58";
  if (line.match(/Samsung.*A56/i)) return "Samsung A56";
  if (line.match(/Samsung.*S25.*Ultra/i)) return "Samsung S25 Ultra";
  if (line.match(/Samsung.*S25.*FE/i)) return "Samsung S25 FE";
  if (line.match(/Samsung.*S25/i)) return "Samsung S25";
  if (line.match(/Honeywell.*CT47/i)) return "Honeywell CT47";
  if (line.match(/Honeywell.*EDA52/i)) return "Honeywell EDA52";
  if (line.match(/Unitech.*PA768/i)) return "Unitech PA768";
  if (line.match(/Unitech.*EA660/i)) return "Unitech EA660";
  
  // Return cleaned up line if no match
  return line.substring(0, 50).trim();
}

function extractAccessoryName(line: string): string {
  // Clean up accessory name
  if (line.match(/Karta\s+micro\s*SD\s*(\d+)/i)) {
    const match = line.match(/Karta\s+micro\s*SD\s*(\d+\s*GB)/i);
    return match ? `Karta micro SD ${match[1]}` : "Karta micro SD";
  }
  if (line.match(/Ładowarka\s+samochodowa/i)) return "Ładowarka samochodowa USB-C";
  if (line.match(/Ładowarka\s+sieciowa/i)) return "Ładowarka sieciowa USB-C";
  if (line.match(/Akumulator/i)) {
    const match = line.match(/Akumulator\s*(\d+\s*mAh)?/i);
    return match && match[1] ? `Akumulator ${match[1]}` : "Akumulator";
  }
  if (line.match(/Etui/i)) return "Etui";
  if (line.match(/Folia/i)) return "Folia ochronna";
  if (line.match(/Rysik/i)) return "Rysik";
  
  // Return first part of line
  return line.split(/\d/)[0].trim() || line.substring(0, 30).trim();
}
