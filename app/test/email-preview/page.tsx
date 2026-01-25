"use client";

export default function EmailPreview() {
  const sampleData = {
    clientName: "Nadleśnictwo Gorlice",
    serialNumber: "EM45A123456789",
    deviceType: "Zebra EM45",
    contactEmail: "admin@gorlice.lasy.gov.pl"
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 text-white px-4 py-2 rounded-t-lg text-sm">
          <p><strong>Od:</strong> TAKMA &lt;serwis@takma.com.pl&gt;</p>
          <p><strong>Do:</strong> {sampleData.contactEmail}</p>
          <p><strong>Temat:</strong> Urządzenia zostały dodane do Panelu Klienta | TAKMA</p>
        </div>
        
        {/* Email Content */}
        <div 
          style={{ 
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#ffffff',
            padding: '0',
            margin: '0'
          }}
        >
          {/* Header z logo */}
          <div style={{ 
            background: '#ffffff',
            padding: '24px 40px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <img 
              src="https://rejestratory.info/rejestratory_logo_footer_header.png" 
              alt="rejestratory.info" 
              style={{ height: '38px' }}
            />
          </div>

          {/* Banner */}
          <div style={{ 
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            padding: '28px 40px',
          }}>
            <h1 style={{ 
              color: '#ffffff', 
              margin: 0, 
              fontSize: '22px',
              fontWeight: 'bold'
            }}>
              Urządzenia dodane do Panelu Klienta
            </h1>
          </div>

          {/* Main Content */}
          <div style={{ padding: '40px' }}>
            {/* Greeting */}
            <p style={{ 
              fontSize: '16px', 
              color: '#374151', 
              margin: '0 0 24px 0',
              lineHeight: '1.6'
            }}>
              Szanowni Państwo,
            </p>
            
            <p style={{ 
              fontSize: '15px', 
              color: '#4b5563', 
              margin: '0 0 30px 0',
              lineHeight: '1.6'
            }}>
              Informujemy, że urządzenia dla Państwa Nadleśnictwa zostały zarejestrowane w <strong>Panelu Klienta</strong>. 
              Od teraz mają Państwo pełną kontrolę nad ewidencją urządzeń oraz możliwość szybkiego zgłaszania serwisu.
            </p>

            {/* Device Info Box */}
            <div style={{ 
              background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '30px'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '14px', width: '140px' }}>Klient:</td>
                    <td style={{ padding: '8px 0', color: '#111827', fontSize: '14px', fontWeight: 'bold' }}>{sampleData.clientName}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '14px' }}>Typ urządzenia:</td>
                    <td style={{ padding: '8px 0', color: '#111827', fontSize: '14px', fontWeight: 'bold' }}>{sampleData.deviceType}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '14px' }}>Przykładowy S/N:</td>
                    <td style={{ padding: '8px 0', fontSize: '14px' }}>
                      <code style={{ 
                        background: '#e5e7eb', 
                        padding: '4px 10px', 
                        borderRadius: '6px',
                        fontFamily: 'monospace',
                        color: '#059669',
                        fontWeight: 'bold'
                      }}>
                        {sampleData.serialNumber}
                      </code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Features Section */}
            <h2 style={{ 
              fontSize: '18px', 
              color: '#111827', 
              margin: '0 0 20px 0',
              fontWeight: 'bold'
            }}>
              Co daje Panel Klienta?
            </h2>

            {/* Feature 1 */}
            <div style={{ 
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '12px',
              padding: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
              borderRadius: '10px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '14px',
                flexShrink: 0,
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#ffffff'
              }}>
                1
              </div>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#111827', fontWeight: 'bold' }}>
                  Ewidencja urządzeń
                </h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                  Pełna lista wszystkich urządzeń Nadleśnictwa w jednym miejscu z datami zakupu i gwarancjami.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div style={{ 
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '12px',
              padding: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
              borderRadius: '10px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '14px',
                flexShrink: 0,
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#ffffff'
              }}>
                2
              </div>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#111827', fontWeight: 'bold' }}>
                  Przypisanie do leśnictwa
                </h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                  Możliwość przypisania każdego urządzenia do konkretnego leśnictwa dla łatwego zarządzania sprzętem.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div style={{ 
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '30px',
              padding: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
              borderRadius: '10px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '14px',
                flexShrink: 0,
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#ffffff'
              }}>
                3
              </div>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#111827', fontWeight: 'bold' }}>
                  Serwis jednym kliknięciem
                </h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                  W razie awarii możliwość wysłania urządzenia do serwisu bez dzwonienia - zamówienie kuriera online.
                </p>
              </div>
            </div>

            {/* Note about new features */}
            <p style={{ 
              fontSize: '13px', 
              color: '#6b7280', 
              margin: '0 0 30px 0',
              fontStyle: 'italic',
              textAlign: 'center' as const
            }}>
              Stale pracujemy nad nowymi funkcjami - kolejne udogodnienia będą sukcesywnie dodawane.
            </p>

            {/* CTA Section */}
            <div style={{ 
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center' as const,
              marginBottom: '30px'
            }}>
              <h3 style={{ 
                color: '#ffffff', 
                margin: '0 0 8px 0', 
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                Jak się zalogować?
              </h3>
              <p style={{ 
                color: '#d1fae5', 
                margin: '0 0 16px 0', 
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                Wystarczy wejść na stronę panelu i wpisać numer seryjny jednego z dostarczonych urządzeń.
              </p>
              <a 
                href="https://rejestratory.info/panel-klienta"
                style={{ 
                  display: 'inline-block',
                  background: '#ffffff',
                  color: '#059669',
                  padding: '14px 32px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '15px'
                }}
              >
                Przejdź do Panelu Klienta →
              </a>
            </div>

            {/* Tip Box */}
            <div style={{ 
              background: '#fef3c7',
              borderLeft: '4px solid #f59e0b',
              padding: '16px',
              borderRadius: '0 8px 8px 0',
              marginBottom: '30px'
            }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#92400e', lineHeight: '1.5' }}>
                <strong>Wskazówka:</strong> Warto zapisać link do panelu w zakładkach przeglądarki 
                dla szybkiego dostępu.
              </p>
            </div>

            {/* Signature */}
            <p style={{ 
              fontSize: '14px', 
              color: '#4b5563', 
              margin: '0 0 16px 0',
              lineHeight: '1.6'
            }}>
              Z poważaniem,<br />
              <strong>Zespół TAKMA</strong>
            </p>
          </div>

          {/* Footer */}
          <div style={{ 
            background: '#f3f4f6',
            padding: '20px 40px',
            borderTop: '1px solid #e5e7eb',
            textAlign: 'center' as const
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#374151', fontWeight: 'bold' }}>
              TAKMA
            </p>
            <p style={{ margin: '0', fontSize: '13px', color: '#6b7280' }}>
              Tel: 601 619 898 &nbsp;•&nbsp; serwis@takma.com.pl &nbsp;•&nbsp; rejestratory.info
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto mt-6 text-center">
        <a 
          href="/handlowy/dashboard" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Powrót do panelu
        </a>
      </div>
    </div>
  );
}
