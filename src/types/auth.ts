export type RegisterResponse = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};
