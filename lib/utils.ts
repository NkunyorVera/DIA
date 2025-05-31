import { UserType } from "./types";

export const logIfDev = (...args: any[]) => {
  if (process.env.APP_ENV === "development") {
    console.log(...args);
  }
};

export const validateInputs = ({
  email,
  password,
}: UserType): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return "Email is required";
  if (!emailRegex.test(email)) return "Enter a valid email address";
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters long";
  return null;
};
