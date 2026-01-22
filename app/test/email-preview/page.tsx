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
          {/* Header */}
          <div style={{ 
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            padding: '30px 40px',
            textAlign: 'center' as const
          }}>
            {/* Logos */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '20px',
              marginBottom: '16px'
            }}>
              <img 
                src="https://rejestratory.info/takma_logo_footer.png" 
                alt="TAKMA" 
                style={{ height: '40px' }}
              />
              <span style={{ color: '#ffffff', fontSize: '24px', opacity: 0.5 }}>×</span>
              <img 
                src="https://rejestratory.info/rejestratory_logo.svg" 
                alt="rejestratory.info" 
                style={{ height: '35px' }}
              />
            </div>
            <p style={{ color: '#d1fae5', margin: 0, fontSize: '15px' }}>
              Urządzenia zostały dodane do Panelu Klienta
            </p>
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
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '12px',
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
              ✨ Co daje Panel Klienta?
            </h2>

            {/* Feature 1 */}
            <div style={{ 
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '16px',
              padding: '16px',
              background: '#f9fafb',
              borderRadius: '10px'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: '#dbeafe',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                flexShrink: 0,
                fontSize: '20px'
              }}>
                📋
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
              marginBottom: '16px',
              padding: '16px',
              background: '#f9fafb',
              borderRadius: '10px'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: '#d1fae5',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                flexShrink: 0,
                fontSize: '20px'
              }}>
                🌲
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
              background: '#f9fafb',
              borderRadius: '10px'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: '#fef3c7',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                flexShrink: 0,
                fontSize: '20px'
              }}>
                🚚
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
                🔐 Jak się zalogować?
              </h3>
              <p style={{ 
                color: '#d1fae5', 
                margin: '0 0 16px 0', 
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                Wystarczy wejść na stronę panelu i wpisać dowolny numer seryjny urządzenia Nadleśnictwa.
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
                💡 <strong>Wskazówka:</strong> Warto zapisać link do panelu w zakładkach przeglądarki 
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
            padding: '24px 40px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ textAlign: 'left' as const }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#374151', fontWeight: 'bold' }}>
                      TAKMA
                    </p>
                    <p style={{ margin: '0', fontSize: '13px', color: '#6b7280', lineHeight: '1.6' }}>
                      📞 601 619 898<br />
                      📧 serwis@takma.com.pl<br />
                      🌐 rejestratory.info
                    </p>
                  </td>
                  <td style={{ textAlign: 'right' as const, verticalAlign: 'top' }}>
                    <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>
                      ul. Poświęcka 1a<br />
                      51-128 Wrocław<br />
                      NIP: 9151004377
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
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
