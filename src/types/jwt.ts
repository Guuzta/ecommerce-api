export type AccessTokenPayload = {
  sub: string;
  name: string;
  email: string;
  sessionId: string;
};

export type RefreshTokenPayload = {
  sub: string;
  name: string;
  email: string;
  sessionId: string;
};

export type Token = {
  accessToken: string;
  refreshToken?: string;
};
