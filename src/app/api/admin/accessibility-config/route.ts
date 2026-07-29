import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const configFilePath = path.join(process.cwd(), "src/data/accessibility-menu-config.json");

export async function GET() {
  try {
    const fileData = await fs.readFile(configFilePath, "utf-8");
    const json = JSON.parse(fileData);
    return NextResponse.json(json);
  } catch (error) {
    console.error("Error reading accessibility config:", error);
    return NextResponse.json({ error: "Failed to read config" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await fs.writeFile(configFilePath, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ success: true, config: body });
  } catch (error) {
    console.error("Error updating accessibility config:", error);
    return NextResponse.json({ error: "Failed to update config" }, { status: 500 });
  }
}
