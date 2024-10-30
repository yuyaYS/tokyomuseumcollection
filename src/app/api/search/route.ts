import { NextResponse } from "next/server";

const API_BASE_URL = "https://museumcollection.tokyo/works/";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log("Received search params:", Object.fromEntries(searchParams));

  const keyword = searchParams.get("keyword");
  const artist_name = searchParams.get("artist_name");
  const museums = searchParams.getAll("museums[]");

  console.log("Keyword:", keyword);
  console.log("Artist Name:", artist_name);
  console.log("Museums:", museums);
  if (!keyword) {
    return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
  }
  const apiUrl = new URL(API_BASE_URL);
  apiUrl.searchParams.append("keyword", keyword);
  apiUrl.searchParams.append("output", "json");

  if (artist_name) {
    apiUrl.searchParams.append("artist_name", artist_name);
  }

  museums.forEach((museum) => {
    apiUrl.searchParams.append("museums[]", museum);
  });

  console.log("Final API URL:", apiUrl.toString());

  try {
    const response = await fetch(apiUrl.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("API Response:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
