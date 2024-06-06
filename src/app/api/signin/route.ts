import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST" || req.method === "post") {
    try {
      const { username, email, password } = await req.json();
      console.log("UserName: ", username);
      console.log("Email: ", email);
      console.log("Password: ", password);
      return NextResponse.json(
        { success: "The message is sent" },
        { status: 200 }
      );
    } catch (e) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { NotAllowed: "Method not Allowed" },
      { status: 405 }
    );
  }
}
