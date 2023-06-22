import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const votes = await req.json();
  console.log("running mdlv text success:", votes);
  try {
    const data = await prisma.vote.createMany({ data: votes });
    console.log(data);
    return NextResponse.json({ messgage: "success" }, { status: 201 });
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { messgae: "Soemthing went wrong" },
      { status: 500 }
    );
  }
}
