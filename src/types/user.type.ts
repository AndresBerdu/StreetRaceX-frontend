export type Locality = {
  zone_localicity: string;
  zone_city: string;
  zone_state: string;
  zone_country: string;
};

export type Rank = "S" | "A" | "B" | "C" | "D";

export type State = "active" | "inactive" | "suspended";

export type Role = "admin" | "racer";

export type User = {
  id?: string;
  slug: string;
  username: string;
  email: string;
  password: string;
  profile_photo: string | null;
  public_id_photo: string | null;
  locality: Locality;
  role: Role;
  rank: Rank;
  victories: number;
  defeats: number;
  consecutive_victories: number;
  state: State;
  updated_at: Date;
  created_at: Date;
};
