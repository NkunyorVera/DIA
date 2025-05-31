export type UserType = {
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  password: string;
  disability?: string;
  photoUrl?: string;
};

export type UserUpdateType = {
  name?: string;
  phone?: string;
  address?: string;
  disability?: string;
  photoUrl?: string;
};

export type AuthRoutes = "/" | "/signin" | "/signup";
