import { CitysInfosInterface } from "./citysInfos.interface";
import { UserInterface } from "./user.interface";

export interface GroupInfosInterface extends Document {
  readonly _id: string;
  readonly citys: CitysInfosInterface[];
  readonly name: string;
  readonly user: UserInterface;
}