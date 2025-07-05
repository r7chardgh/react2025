import type { ReactElement, ReactNode } from "react";

export interface IWrapper {
    children: ReactNode | ReactElement;
    className?: string;
}


export interface ILocation {
    addressZH: string;
    nameZH: string;
    districtZH: string;
    x: number;
    y: number;
    nameEN: string;
    addressEN: string;
    districtEN: string;
}