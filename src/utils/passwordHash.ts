import bcrypt from "bcrypt";

const hash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export { hash };
