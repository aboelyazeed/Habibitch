export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  displayName: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    isCreator: boolean;
    isVerified: boolean;
  };
}

export interface CreateProfileRequest {
  displayName: string;
  avatarUrl?: string;
  bio?: string;
}
