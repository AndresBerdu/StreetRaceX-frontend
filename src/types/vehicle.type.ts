export type Vehicle = {
  id?: string;
  slug: string;
  vehicle_type: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  plate: string | null;
  photo: string | null;
  modifications?: string | null;
  active?: boolean;
};
