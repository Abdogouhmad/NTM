import { signIn } from '@/utils/aws-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Call the signIn function
    const result = await signIn(username, password);

    if (result.AuthenticationResult) {
      return NextResponse.json(
        { message: 'Sign In process done' },
        { status: 202 }
      );
    } else {
      return NextResponse.json(
        { message: 'Sign In process failed' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json(
      { error: 'Something went wrong', details: error.message },
      { status: 400 }
    );
  }
}
