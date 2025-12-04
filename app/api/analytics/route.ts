import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

// Typ dla danych analitycznych
interface AnalyticsData {
  users: {
    value: number;
    change: number;
  };
  pageviews: {
    value: number;
    change: number;
  };
  bounceRate: {
    value: number;
    change: number;
  };
  avgSessionDuration: {
    value: string;
    change: number;
  };
  topPages: Array<{
    path: string;
    views: number;
    users: number;
  }>;
}

// Funkcja do formatowania czasu sesji
function formatSessionDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

// Funkcja do obliczania zmiany procentowej
function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

export async function GET() {
  try {
    // Sprawdź czy zmienne środowiskowe są ustawione
    const propertyId = process.env.GA4_PROPERTY_ID;

    if (!propertyId) {
      return NextResponse.json(
        { error: 'GA4_PROPERTY_ID not configured' },
        { status: 500 }
      );
    }

    // Inicjalizacja klienta Analytics
    let analyticsDataClient: BetaAnalyticsDataClient;

    // Sprawdź czy jesteśmy w produkcji (Vercel) czy lokalnie
    if (process.env.GA4_SERVICE_ACCOUNT_JSON) {
      // Produkcja - użyj JSON z zmiennej środowiskowej
      const credentials = JSON.parse(process.env.GA4_SERVICE_ACCOUNT_JSON);
      analyticsDataClient = new BetaAnalyticsDataClient({
        credentials: {
          client_email: credentials.client_email,
          private_key: credentials.private_key,
        },
      });
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      // Lokalne środowisko - użyj pliku JSON
      analyticsDataClient = new BetaAnalyticsDataClient({
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      });
    } else {
      return NextResponse.json(
        { error: 'Google Analytics credentials not configured' },
        { status: 500 }
      );
    }

    const today = new Date();
    const last30Days = new Date(today);
    last30Days.setDate(today.getDate() - 30);
    const previous30Days = new Date(last30Days);
    previous30Days.setDate(last30Days.getDate() - 30);

    // Format dat dla API (YYYY-MM-DD)
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    // 1. Pobierz dane z ostatnich 30 dni
    const [currentResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: formatDate(last30Days),
          endDate: formatDate(today),
        },
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
      ],
    });

    // 2. Pobierz dane z poprzednich 30 dni (do porównania)
    const [previousResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: formatDate(previous30Days),
          endDate: formatDate(last30Days),
        },
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
      ],
    });

    // 3. Pobierz najpopularniejsze strony
    const [topPagesResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: formatDate(last30Days),
          endDate: formatDate(today),
        },
      ],
      dimensions: [{ name: 'pagePath' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'activeUsers' },
      ],
      orderBys: [
        {
          metric: {
            metricName: 'screenPageViews',
          },
          desc: true,
        },
      ],
      limit: 5,
    });

    // Parsowanie danych bieżących
    const currentMetrics = currentResponse.rows?.[0]?.metricValues || [];
    const currentUsers = Number(currentMetrics[0]?.value || 0);
    const currentPageviews = Number(currentMetrics[1]?.value || 0);
    const currentBounceRate = Number(currentMetrics[2]?.value || 0);
    const currentAvgDuration = Number(currentMetrics[3]?.value || 0);

    // Parsowanie danych poprzednich
    const previousMetrics = previousResponse.rows?.[0]?.metricValues || [];
    const previousUsers = Number(previousMetrics[0]?.value || 0);
    const previousPageviews = Number(previousMetrics[1]?.value || 0);
    const previousBounceRate = Number(previousMetrics[2]?.value || 0);
    const previousAvgDuration = Number(previousMetrics[3]?.value || 0);

    // Parsowanie najpopularniejszych stron
    const topPages = (topPagesResponse.rows || []).map((row) => ({
      path: row.dimensionValues?.[0]?.value || '/',
      views: Number(row.metricValues?.[0]?.value || 0),
      users: Number(row.metricValues?.[1]?.value || 0),
    }));

    // Przygotowanie odpowiedzi
    const analyticsData: AnalyticsData = {
      users: {
        value: currentUsers,
        change: calculatePercentageChange(currentUsers, previousUsers),
      },
      pageviews: {
        value: currentPageviews,
        change: calculatePercentageChange(currentPageviews, previousPageviews),
      },
      bounceRate: {
        value: Number((currentBounceRate * 100).toFixed(1)),
        change: calculatePercentageChange(currentBounceRate, previousBounceRate),
      },
      avgSessionDuration: {
        value: formatSessionDuration(currentAvgDuration),
        change: calculatePercentageChange(currentAvgDuration, previousAvgDuration),
      },
      topPages,
    };

    return NextResponse.json(analyticsData);

  } catch (error) {
    console.error('Error fetching analytics data:', error);

    // Zwróć szczegółowy błąd w development
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json(
        {
          error: 'Failed to fetch analytics data',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
