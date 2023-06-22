import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const admissionNo = searchParams.get("admissionNo");
  try {
    const data = await prisma.student.findUnique({
      where: { admissionNo },
      include: {
        votes: true,
        candidate: true,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
