import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "src/data/demo-requests.json");

export async function GET() {
  try {
    let requests = [];
    try {
      const fileData = await fs.readFile(dataPath, "utf-8");
      requests = JSON.parse(fileData);
    } catch (e) {
      // File missing or empty
    }
    return NextResponse.json(requests);
  } catch (err) {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, website, meetingSlot } = body;

    if (!name || !email || !phone || !website) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    let requests = [];
    try {
      const fileData = await fs.readFile(dataPath, "utf-8");
      requests = JSON.parse(fileData);
    } catch (e) {
      // Empty
    }

    const newRequest = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      phone,
      website,
      meetingSlot: meetingSlot || null,
      createdAt: new Date().toISOString(),
    };

    requests.unshift(newRequest);
    await fs.writeFile(dataPath, JSON.stringify(requests, null, 2), "utf-8");

    return NextResponse.json({ message: "Demo scheduled successfully!", request: newRequest });
  } catch (err) {
    return NextResponse.json({ message: "Server error occurred" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });

    const fileData = await fs.readFile(dataPath, "utf-8");
    let requests: any[] = JSON.parse(fileData);

    requests = requests.filter((r) => r.id !== id);
    await fs.writeFile(dataPath, JSON.stringify(requests, null, 2), "utf-8");

    return NextResponse.json({ message: "Deleted successfully", requests });
  } catch (err) {
    return NextResponse.json({ message: "Failed to delete demo request" }, { status: 500 });
  }
}
