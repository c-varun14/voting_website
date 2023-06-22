import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const admissionNo = searchParams.get("admissionNo");
  try {
    const data = await prisma.student.findUnique({
      where: { admissionNo },
      include: {
        votes: true,
      },
    });
    if (!data) throw new Error();
   
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: "Wrong details" }, { status: 400 });
  }
}

// export async function POST(req: NextRequest) {
//   const data = await req.json();
//   console.log(data);
//   try {
//     const r = await prisma.student.createMany({ data });
//     return NextResponse.json({ data: "success" });
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json({ err: err }, {status: 500});
//   }
// }
