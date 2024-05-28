export type User = {
  userName: string;
  email: string;
  password: string;
  token: string;
};

export type LoginData = Pick<User, "email" | "password">;
export type RegisterData = Pick<User, "email" | "password" | "userName">;
export type FotgotPasswordData = Pick<User, "email">;
export type NewPasswordData = Pick<User, "password">;
export type OtpData = {
  email: string;
  otp: string;
};
