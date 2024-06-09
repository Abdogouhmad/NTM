import AWS from 'aws-sdk';

// Define the configuration type
type AwsConfigType = {
  COGNITO_CLIENT_ID: string;
  AWS_REGION: string;
}

// Load and validate environment variables
const loadConfig = (): AwsConfigType => {
  const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID;
  const AWS_REGION = process.env.AWS_REGION;

  if (!COGNITO_CLIENT_ID) {
    throw new Error("Missing required environment variable: COGNITO_CLIENT_ID");
  }
  if (!AWS_REGION) {
    throw new Error("Missing required environment variable: AWS_REGION");
  }

  return {
    COGNITO_CLIENT_ID,
    AWS_REGION,
  };
}

// Load configuration
const ConfigAws = loadConfig();

// Update AWS configuration
AWS.config.update({ region: ConfigAws.AWS_REGION });

const cognito = new AWS.CognitoIdentityServiceProvider();

type SignUpResult = AWS.CognitoIdentityServiceProvider.SignUpResponse;
type ConfirmSignUpResult = AWS.CognitoIdentityServiceProvider.ConfirmSignUpResponse;
type SignInResult = AWS.CognitoIdentityServiceProvider.InitiateAuthResponse;

// SignUp function
export async function signUp(username: string, email: string, password: string): Promise<SignUpResult> {
  const params: AWS.CognitoIdentityServiceProvider.SignUpRequest = {
    ClientId: ConfigAws.COGNITO_CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  return cognito.signUp(params).promise();
}

// ConfirmSignUp function
export async function confirmSignUp(username: string, code: string): Promise<ConfirmSignUpResult> {
  const params: AWS.CognitoIdentityServiceProvider.ConfirmSignUpRequest = {
    ClientId: ConfigAws.COGNITO_CLIENT_ID,
    Username: username,
    ConfirmationCode: code,
  };

  return cognito.confirmSignUp(params).promise();
}

// SignIn function
export async function signIn(identifier: string, password: string): Promise<SignInResult> {
  const params: AWS.CognitoIdentityServiceProvider.InitiateAuthRequest = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: ConfigAws.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: identifier,
      PASSWORD: password,
    },
  };

  return cognito.initiateAuth(params).promise();
}
