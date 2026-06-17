export type AccessTokenPayload = {
  sub: string;
  name: string;
  role: "ADMIN" | "USER";
  email: string;
  sessionId: string;
};

export type RefreshTokenPayload = {
  sub: string;
  name: string;
  role: "ADMIN" | "USER";
  email: string;
  sessionId: string;
};

export type Token = {
  accessToken: string;
  refreshToken?: string;
};
