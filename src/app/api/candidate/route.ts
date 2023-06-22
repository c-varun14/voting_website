import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const admissionNo = searchParams.get("admissionNo");
  try {
    const data = await prisma.candidate.findUnique({
      where: { studentAdmissionNo: admissionNo },
      include: {
        studentVotes: true,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
