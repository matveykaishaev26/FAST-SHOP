import { IBasketCardItem } from "./card.interface";
import { IUser } from "./user.interface";

interface IAmount {
  value: string;
  currency: string;
}

interface IRecipient {
  account_id: string;
  gateway_id: string;
}

interface IPaymentMethod {
  type: string;
  id: string;
  saved: boolean;
}

interface IConfirmation {
  type: string;
  return_url: string;
  confirmation_url: string;
}
export interface IPaymenentResponse {
  id: string;
  status: string;
  url: string;
  amount: IAmount;
  recipient: IRecipient;
  paynment_method: IPaymentMethod;
  created_at: Date;
  confirmation: IConfirmation;
}

export enum EnumOrderStatus {
  PENDING = "PENDING",
  PAYED = "PAYED",
}
export interface IOrder {
  id: string;
  createdAt: string;
  total: number;
  items: IBasketCardItem[];
}
