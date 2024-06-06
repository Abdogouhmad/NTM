import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST" || req.method === "post") {
    try {
      const { title, description, note, notetype } = await req.json();
      console.log("title: ", title);
      console.log("Description: ", description);
      console.log("Note type: ", notetype);
      console.log("Note: ", note);
      return NextResponse.json({ success: "The note is added" }, { status: 200 });
    } catch (e) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 400 },
      );
    }
  } else {
    return NextResponse.json(
      { Notallowed: "Method not Allowed" },
      { status: 405 },
    );
  }
}
