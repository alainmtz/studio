import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { updateItemImageUrl } from "@/actions/inventory";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("image") as File;
  const itemId = formData.get("itemId") as string;

  if (!file || !itemId) {
    return NextResponse.json({ error: "Missing file or itemId" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const filePath = path.join(uploadsDir, fileName);
  await fs.writeFile(filePath, buffer);

  // Save image URL to DB
  const imageUrl = `/uploads/${fileName}`;
  await updateItemImageUrl(Number(itemId), imageUrl);

  return NextResponse.json({ imageUrl });
}
