type TruckTypeProps = "տենտ" | "ռեֆ" | "կոնտեյներ" | "ավիա";
type typeProps = "ամբողջակսն" | "հավաքական";
type ContactTypeProps = string | number;

export interface LoadProps {
  id: string;
  age: string;
  date: string;
  truckType: TruckTypeProps;
  type: typeProps;
  pickup: string;
  delivery: string;
  distance: number;
  company: string;
  contact: ContactTypeProps;
  length: number | null;
  weight: number | null;
  rate: number | null;
  status: string;
  commodity: string | null;
  comment: string | null;
}

export interface AddLoadProps {
  date: string;
  truckType: "տենտ" | "ռեֆ" | "կոնտեյներ" | "ավիա";
  type: "ամբողջակսն" | "հավաքական";
  pickup: string;
  delivery: string;
  length?: number | null;
  weight?: number | null;
  rate?: number | null;
  commodity?: string | null;
  comment?: string | null;
}
