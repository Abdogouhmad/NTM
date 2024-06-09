import { confirmSignUp } from "@/utils/aws-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method.toUpperCase() === "POST") {
    try {
      // Deconstruct the data from signup form
      const { username, code } = await req.json();

      const result = await confirmSignUp(username, code);
      // Return success response and redirect URL
      if (result) {
        return NextResponse.json(
          { message: "Confirmation done well" },
          { status: 202 }
        );
      } else {
        return NextResponse.json(
          { message: "COnfirmation failed" },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("Sign up error:", error); // Log the error for debugging
      return NextResponse.json(
        { error: "Something went wrong", details: error },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }
}
