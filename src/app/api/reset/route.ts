import { resetPassword } from "@/utils/aws-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, resetcode, newpassword } = await req.json();

    // Call the signIn function
    const result = await resetPassword(username, resetcode, newpassword);

    if (result) {
      return NextResponse.json(
        { message: "The password updated" },
        { status: 202 }
      );
    } else {
      return NextResponse.json(
        { message: "Something wrong while resting password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error },
      { status: 400 }
    );
  }
}
