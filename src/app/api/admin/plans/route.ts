import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const plansFilePath = path.join(process.cwd(), "src/data/plans-config.json");

export async function GET() {
  try {
    const fileData = await fs.readFile(plansFilePath, "utf-8");
    const json = JSON.parse(fileData);
    return NextResponse.json(json);
  } catch (error) {
    console.error("Error reading plans config:", error);
    return NextResponse.json({ error: "Failed to read plans configuration" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await fs.writeFile(plansFilePath, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ success: true, config: body });
  } catch (error) {
    console.error("Error updating plans config:", error);
    return NextResponse.json({ error: "Failed to update plans configuration" }, { status: 500 });
  }
}
