// root/app/api/langflow-main/index.js

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req, res) {
  try {
    const { input_value, output_type, input_type, tweaks } = await req.json();

    const body = JSON.stringify({
      input_value,
      output_type,
      input_type,
      tweaks,
    });

    // API URL and token are fetched from environment variables
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = process.env.API_AUTH_TOKEN;
    console.log('apuurl:', apiUrl);
    console.log('token:', token);

    const response = await axios.post(apiUrl, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      maxBodyLength: Infinity,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Proxy server error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from the external API." },
      { status: 500 }
    );
  }
}
