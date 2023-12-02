import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ButtonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color: string;
  bg: string;
  children: ReactNode;
}