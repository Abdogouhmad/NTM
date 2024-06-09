import { signUp } from "@/utils/aws-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  if (req.method.toUpperCase() === "POST") {
    try {
      // Deconstruct the data from signup form
      const { username, email, password } = await req.json();

      const result = await signUp(username, email, password);
      
      // Check if the signup was successful
      if (result.UserSub) {
        return NextResponse.json(
          { message: "Sign up process done" },
          { status: 202 }
        );
      } else {
        return NextResponse.json(
          { message: "Sign up process failed" },
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
