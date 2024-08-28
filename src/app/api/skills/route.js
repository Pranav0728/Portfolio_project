import { NextResponse } from "next/server";
import Skill from "@/models/Skill";
import connectMongoDB from "@/lib/db";
import { isApiValid } from "@/lib/function";


export async function GET(req) {
  try {
    const apiKey = await req.headers.get("Authorization"); // Extract API key from header

    if (!isApiValid(apiKey)) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectMongoDB();
    const result = await Skill.find().sort({ _id: -1 }).exec();
    if (result.length > 0) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json({ message: "no Skill" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}

export async function POST(req) {
  try {

    const apiKey = await req.headers.get("Authorization"); // Extract API key from header

    if (!isApiValid(apiKey)) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    await connectMongoDB();
    const data = await req.json();
    const {
      name,
      level,
    } = data;
    await Skill.create({
        name,
      level,
    });
    return NextResponse.json(
      { message: "Skill Added Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({message: error}, { status: 500 });
  }
}
