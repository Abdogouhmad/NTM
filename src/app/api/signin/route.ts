import { signIn } from '@/utils/aws-auth';
import { setCookie } from 'cookies-next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    // Call the signIn function
    const result = await signIn(username, password);
    if (result && result.AccessToken) {
      const response = NextResponse.json(
        { username: username },
        { status: 202 }
      );
      // Set a cookie with the username
      setCookie('username', username, { req, res: response });
      // setCookie('refreshToken', result.RefreshToken, { req, res: response });
      setCookie('accessToken', result.AccessToken, { req, res: response });
      return response;
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
