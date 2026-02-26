export type User = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
};

export type FormError = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
};
