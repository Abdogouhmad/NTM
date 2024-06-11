import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand, ConfirmSignUpCommand, AuthFlowType, ForgotPasswordCommand, ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"

// Define the configuration type
type AwsConfigType = {
  COGNITO_CLIENT_ID: string;
  AWS_REGION: string;
  COGNITO_USER_POOL_ID: string;
}

// Load and validate environment variables
const loadConfig = (): AwsConfigType => {
  const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID;
  const AWS_REGION = process.env.AWS_REGION;
  const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID;

  if (!COGNITO_CLIENT_ID) {
    throw new Error("Missing required environment variable: COGNITO_CLIENT_ID");
  }
  if (!AWS_REGION) {
    throw new Error("Missing required environment variable: AWS_REGION");
  }

  if (!COGNITO_USER_POOL_ID) {
    throw new Error("Missing required environment variable: COGNITO_USER_POOL_ID");
  }
  return {
    COGNITO_CLIENT_ID,
    AWS_REGION,
    COGNITO_USER_POOL_ID,
  };
}

// Load configuration
const ConfigAws = loadConfig();



// v3 JS aws-sdk
const cognitoClient = new CognitoIdentityProviderClient({
  region: ConfigAws.AWS_REGION,
});




// SignUp function v3
async function signUp(username: string, email: string, password: string) {
  const params = {
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
  try {
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    console.log("Sign up success: ", response);
    return response;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
}

// ConfirmSignUp function v3
async function confirmSignUp(username: string, code: string) {
  const params = {
    ClientId: ConfigAws.COGNITO_CLIENT_ID,
    Username: username,
    ConfirmationCode: code,
  };
  try {
    const command = new ConfirmSignUpCommand(params);
    await cognitoClient.send(command);
    console.log("User confirmed successfully");
    return true;
  } catch (error) {
    console.error("Error confirming sign up: ", error);
    throw error;
  }
}

// SignIn function aws-sdk v3
async function signIn(identifier: string, password: string) {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH' as AuthFlowType,
    ClientId: ConfigAws.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: identifier,
      PASSWORD: password,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await cognitoClient.send(command);
    const { AuthenticationResult } = response;

    if (AuthenticationResult) {
      return AuthenticationResult;
    } else {
      console.error("Authentication result is undefined or null");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error signing in: ", error.message);
    } else {
      console.error("Error signing in: ", error);
    }
    throw error;
  }
}

// reset password v3 aws-sdk
async function sendResetPassword(username: string) {
  // create a param
  const param = {
    ClientId: ConfigAws.COGNITO_CLIENT_ID,
    Username: username,
  };
  try {
    const command = new ForgotPasswordCommand(param);
    const response = await cognitoClient.send(command);
    if (response) {
      return response
    } else {
      console.error("There is error sending reset password email to you check later");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error signing in: ", error.message);
    } else {
      console.error("Error signing in: ", error);
    }
    throw error;
  }
}


async function resetPassword(username: string, code: string, newpassword: string) {
  if (!username) {
    throw new Error("Username is required");
  }
  if (!code) {
    throw new Error("Confirmation code is required");
  }
  if (!newpassword) {
    throw new Error("New password is required");
  }
  const param = {
    ClientId: ConfigAws.COGNITO_CLIENT_ID,
    Username: username,
    ConfirmationCode: code,
    Password: newpassword
  }
  try {
    const command = new ConfirmForgotPasswordCommand(param);
    const response = await cognitoClient.send(command);
    if (response) {
      return response
    } else {
      console.error("There is error sending reseting password");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error resting password: ", error.message);
    } else {
      console.error("Error resting password: ", error);
    }
    throw error;
  }
}

export { signIn, signUp, confirmSignUp, resetPassword, sendResetPassword }

