import { citysInterface } from "./citysInterface";

export interface gruopInfoInterface {
  _id?: string;
  name: string;
  citys: citysInterface[];
}