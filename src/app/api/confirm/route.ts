import { confirmSignUp } from "@/utils/aws-auth";
import { NextRequest, NextResponse } from "next/server";
// Ensure AWS Amplify is configured properly
// import awsconfig from "../src/aws-exports"; // Adjust the import path as needed
// Auth.configure(awsconfig);

export async function POST(req: NextRequest) {
  if (req.method.toUpperCase() === "POST") {
    try {
      // Deconstruct the data from signup form
      const { username, code } = await req.json();

      const result = confirmSignUp(username, code);
      // Return success response and redirect URL
      return NextResponse.json(
        { message: "Account is confirmed", result },
        { status: 200 }
      );
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
