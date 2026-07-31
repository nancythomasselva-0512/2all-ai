import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const configPath = path.join(process.cwd(), "src/data/site-config.json");

// Memory store for instant live production persistence even on serverless cold-starts
let memoryConfigStore: Record<string, any> | null = null;

export async function GET() {
  try {
    if (memoryConfigStore) {
      return NextResponse.json(memoryConfigStore);
    }
    const data = await fs.readFile(configPath, "utf-8");
    const parsed = JSON.parse(data);
    memoryConfigStore = parsed;
    return NextResponse.json(parsed);
  } catch (error) {
    if (memoryConfigStore) return NextResponse.json(memoryConfigStore);
    return NextResponse.json({ message: "Failed to read config" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Read the current configuration to preserve any untouched fields
    let currentConfig: Record<string, any> = {};
    try {
      const data = await fs.readFile(configPath, "utf-8");
      currentConfig = JSON.parse(data);
    } catch {
      currentConfig = memoryConfigStore || {};
    }

    // Merge new config values
    const newConfig = {
      ...currentConfig,
      ...body,
    };

    memoryConfigStore = newConfig;

    // Save back to JSON file
    try {
      await fs.writeFile(configPath, JSON.stringify(newConfig, null, 2), "utf-8");
    } catch (fsErr) {
      console.warn("FS write skipped on read-only serverless deployment:", fsErr);
    }

    return NextResponse.json({ message: "Configuration updated successfully", config: newConfig });
  } catch (error) {
    console.error("Config update error:", error);
    return NextResponse.json({ message: "Failed to update config" }, { status: 500 });
  }
}
