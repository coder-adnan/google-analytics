// app/api/dashboard/route.ts

import { NextResponse } from "next/server";
import { google, analyticsdata_v1beta } from "googleapis";


interface AnalyticsDataRow {
  dimensionValues: Array<{ value: string }>;
  metricValues: Array<{ value: string }>;
}

interface AnalyticsResponse {
  rows: AnalyticsDataRow[];
  dimensionHeaders: Array<{ name: string }>;
  metricHeaders: Array<{ name: string; type: string }>;
}


export async function GET(request: Request): Promise<Response> {
  try {
    // Validate GA4_PROPERTY_ID
    const propertyId = process.env.GA4_PROPERTY_ID;
    if (!propertyId) {
      throw new Error(
        "GA4_PROPERTY_ID is not defined in environment variables."
      );
    }

    // Initialize JWT client with credentials from environment variables
    const jwtClient = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      undefined,
      process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/analytics.readonly"]
    );

    // Authenticate the client
    await jwtClient.authorize();

    // Initialize the Analytics Data API
    const analyticsData = google.analyticsdata({
      version: "v1beta",
      auth: jwtClient,
    });

    // Define the request payload
    const requestBody: analyticsdata_v1beta.Schema$RunReportRequest = {
      dateRanges: [
        {
          startDate: "30daysAgo",
          endDate: "today",
        },
      ],
      dimensions: [{ name: "date" }, { name: "country" }],
      metrics: [
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "totalUsers" },
        { name: "newUsers" },
        { name: "averageSessionDuration" },
        { name: "bounceRate" },
      ],
      orderBys: [
        {
          dimension: {
            orderType: "NUMERIC",
            dimensionName: "date",
          },
          desc: false,
        },
      ],
    };

    // Fetch the report
    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: requestBody,
    });

    // Type assertion to ensure response.data matches AnalyticsResponse
    const data: AnalyticsResponse = response.data as AnalyticsResponse;

    // Return the data as JSON
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json(
      {
        error: "Error fetching data from Google Analytics.",
        details: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
