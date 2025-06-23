import type { ReactElement, ReactNode } from "react";

export interface IWrapper {
    children: ReactNode | ReactElement;
    className?:string;
}