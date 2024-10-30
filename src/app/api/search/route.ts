import { NextResponse } from "next/server";

const API_BASE_URL = "https://museumcollection.tokyo/works/";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");

  if (!keyword) {
    return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
  }

  const apiUrl = new URL(API_BASE_URL);
  apiUrl.searchParams.append("keyword", keyword);
  apiUrl.searchParams.append("output", "json");

  try {
    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    //console.log("API response data:", data); // Log the API response data

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
