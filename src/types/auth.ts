type UserResponse = {
  id: string;
  name: string;
  email: string;
};

export type RegisterResponse = {
  message: string;
  user: UserResponse;
};

export type LoginResponse = {
  message: string;
  user: UserResponse;
};
