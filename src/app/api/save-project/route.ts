import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { filename, markdown } = await req.json();

    if (!filename || !markdown) {
      return NextResponse.json({ error: "filename과 markdown 내용이 필요합니다." }, { status: 400 });
    }

    const projectsDir = path.join(process.cwd(), "content", "projects");
    if (!fs.existsSync(projectsDir)) {
      fs.mkdirSync(projectsDir, { recursive: true });
    }

    const safeFilename = filename.endsWith(".md") ? filename : `${filename}.md`;
    const targetPath = path.join(projectsDir, safeFilename);

    fs.writeFileSync(targetPath, markdown, "utf8");

    return NextResponse.json({ success: true, savedPath: safeFilename });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "파일 저장에 실패했습니다." }, { status: 500 });
  }
}
