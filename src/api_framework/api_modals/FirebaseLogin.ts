export interface IUserAuthorization {
  accessToken: string | null;
  isValid: boolean;
}
export interface IDecodedAuthAccessToken {
  exp: number;
  iat: number;
  sub: {
    user_id: string;
    email: string;
  };
}

export interface ISessionUserDetails {
  displayName: string;
  email: string;
  photoURL: string;
}

export interface IOAuthUser {
  id?: string;
  email: string;
  displayName: string;
  photoURL: string;
}

// Interface for Configuration

export interface IFirebaseAPIConfig {
  readonly apiKey: string;
  readonly authDomain: string;
  readonly projectId: string;
  readonly storageBucket: string;
  readonly messagingSenderId: string;
  readonly appId: string;
  readonly measurementId: string;
}

// Create Login USER

export interface ISignalUserCreateProps {
  email: string;
  password: string;
  name: string;
}

// Signup Response
export interface IUserSignUpResponseData {
  user_id: string;
  created_at: number | null;
  updated_at: number | null;
  name: string;
  email: string;
  password: string;
  is_deleted: boolean;
  is_email_verified: boolean;
  status: string;
  auth_token: string;
}
export interface IUserSignUpResponse {
  status: boolean;
  data: IUserSignUpResponseData | null;
}
