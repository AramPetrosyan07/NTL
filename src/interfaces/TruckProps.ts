type TruckTypeProps = "տենտ" | "ռեֆ" | "կոնետյներ" | "ավիա";
type typeProps = "ամբողջակսն" | "հավաքական";
type ContactTypeProps = string | number;

export interface TruckProps {
  id: string;
  age: string;
  date: string;
  truckType: TruckTypeProps;
  type: typeProps;
  pickup: string;
  delivery?: string | null;
  distance?: number | null;
  company: string;
  contact: ContactTypeProps;
  length?: number | null;
  weight?: number | null;
  rate?: number | null;
  status: string;
  comment?: string | null;
}
