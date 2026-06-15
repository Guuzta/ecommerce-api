export type AccessTokenPayload = {
  sub: string;
  name: string;
  email: string;
  sessionId: string;
};

export type RefreshTokenPayload = {
  sessionId: string;
};

export type Token = {
  accessToken: string;
  refreshToken?: string;
};
