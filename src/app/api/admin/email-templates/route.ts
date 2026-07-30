import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/data/email-templates.json");
    let templates = {};
    try {
      const data = await fs.readFile(filePath, "utf-8");
      templates = JSON.parse(data);
    } catch (e) {
      // return default empty
    }
    return NextResponse.json({ templates });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch templates" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { templates } = body;

    if (!templates) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "src/data/email-templates.json");
    await fs.writeFile(filePath, JSON.stringify(templates, null, 2), "utf-8");

    return NextResponse.json({ message: "Email templates saved dynamically!", templates });
  } catch (err) {
    console.error("Error saving email templates:", err);
    return NextResponse.json({ message: "Failed to save templates" }, { status: 500 });
  }
}
