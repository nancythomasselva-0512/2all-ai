import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "src/data/sections-config.json");

let memorySectionsStore: Record<string, any> | null = null;

export async function GET() {
  try {
    if (memorySectionsStore) {
      return NextResponse.json(memorySectionsStore);
    }
    const fileData = await fs.readFile(CONFIG_PATH, "utf-8");
    const json = JSON.parse(fileData);
    memorySectionsStore = json;
    return NextResponse.json(json);
  } catch (error) {
    if (memorySectionsStore) return NextResponse.json(memorySectionsStore);
    console.error("Error reading sections config:", error);
    return NextResponse.json({ sections: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !Array.isArray(body.sections)) {
      return NextResponse.json({ message: "Invalid payload format. Expected { sections: [...] }" }, { status: 400 });
    }

    memorySectionsStore = body;

    try {
      await fs.writeFile(CONFIG_PATH, JSON.stringify(body, null, 2), "utf-8");
    } catch (fsErr) {
      console.warn("FS write skipped on read-only serverless environment:", fsErr);
    }

    return NextResponse.json({ success: true, message: "Sections configuration saved successfully!" });
  } catch (error) {
    console.error("Error writing sections config:", error);
    return NextResponse.json({ message: "Failed to write sections config file" }, { status: 500 });
  }
}
