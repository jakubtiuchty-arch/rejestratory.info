// Parse a copy in a bounded worker. Never serialize or rewrite the signed original.
const { parentPort, workerData } = require('node:worker_threads');
const { PDFDocument, PDFDict, PDFArray, PDFName, PDFStream } = require('pdf-lib');
const forbidden = new Set(['JS','JavaScript','AA','OpenAction','Launch','RichMedia','RichMediaContent','XFA','EmbeddedFiles','EmbeddedFile','Filespec','SubmitForm','ImportData','GoToR','GoToE','URI','Sound','Movie','Rendition','3D','Collection']);
(async () => {
  try {
    const pdf = await PDFDocument.load(new Uint8Array(workerData), { ignoreEncryption: false, throwOnInvalidObject: true, updateMetadata: false });
    if (pdf.isEncrypted || pdf.getPageCount() < 1 || pdf.getPageCount() > 300) throw Error('invalid');
    const objects = pdf.context.enumerateIndirectObjects();
    if (objects.length > 10000) throw Error('complex');
    const seen = new WeakSet(); let count = 0;
    function visit(object, depth = 0) {
      if (!object || typeof object !== 'object' || seen.has(object)) return;
      if (++count > 50000 || depth > 128) throw Error('complex');
      seen.add(object);
      if (object instanceof PDFName && forbidden.has(object.decodeText())) throw Error('active');
      if (object instanceof PDFStream) visit(object.dict, depth + 1);
      if (object instanceof PDFDict) for (const [key, value] of object.entries()) { visit(key, depth + 1); visit(value, depth + 1); }
      if (object instanceof PDFArray) for (const value of object.asArray()) visit(value, depth + 1);
    }
    visit(pdf.catalog);
    for (const [, object] of objects) visit(object);
    parentPort.postMessage({ valid: true });
  } catch { parentPort.postMessage({ valid: false }); }
})();
