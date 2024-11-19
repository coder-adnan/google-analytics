import { NextResponse } from "next/server";
import { google, analyticsdata_v1beta } from "googleapis";
const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];

const getAuthClient = async (): Promise<analyticsdata_v1beta.Analyticsdata> => {
  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };
  const { client_email, private_key } = credentials;
  const auth = new google.auth.JWT(
    client_email,
    undefined,
    private_key,
    SCOPES
  );
  await auth.authorize();
  return google.analyticsdata({ version: "v1beta", auth });
};

export async function GET() {
  try {
    const analytics = await getAuthClient();
    const response = await analytics.properties.runReport({
      property: "properties/467395843", // Replace with your actual Property ID
      requestBody: {
        dateRanges: [
          {
            startDate: "30daysAgo",
            endDate: "today",
          },
        ],
        metrics: [
          {
            name: "sessions",
          },
          {
            name: "screenPageViews",
          },
        ],
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json(
      {
        error: "Error fetching data from Google Analytics.",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}