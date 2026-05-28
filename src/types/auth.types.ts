export interface LoginFormData {
  username: string;
  password: string;
}

export type Locality = {
  zone_localicity: string;
  zone_city: string;
  zone_state: string;
  zone_country: string;
}

export type RegisterFormData = {
  username: string;
  email: string;
  locality: Locality;
  profile_photo: File | null;
  password: string;
}