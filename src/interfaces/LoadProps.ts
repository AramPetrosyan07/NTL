type TruckTypeProps = "տենտ" | "ռեֆ" | "կոնտեյներ" | "ավիա";
type LoadTypeProps = "ամբողջակսն" | "հավաքական";
type ContactTypeProps = string | number;

export interface LoadProps {
  id:string;
  age: string;
  date: string;
  truckType: TruckTypeProps;
  loadType: LoadTypeProps;
  pickup: string;
  delivery: string;
  distance: number;
  company: string;
  contact: ContactTypeProps;
  length : number | null;
  weight : number | null;
  rate : number |null;
  status:string,
  commodity:string | null,
  comment:string | null
}

export interface AddLoadProps {
  date: string
  truckType:  "տենտ" | "ռեֆ" | "կոնտեյներ" | "ավիա";
  loadType: "ամբողջակսն" | "հավաքական";
  pickup: string;
  delivery: string;
  length? : number | null;
  weight? : number | null;
  rate? : number | null;
  commodity?:string | null;
  comment?:string | null
}
