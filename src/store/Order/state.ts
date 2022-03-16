export interface IOrderInfo {
  orderID?: number;
  prodName: string;
  size: string;
  prodQuant: number;
  price: number;
  subTotal: number;
  orderDate: string;
  img?: string;
}

export interface OrderStateInterface {
  allOrder: IOrderInfo[];
  activeOrder?: IOrderInfo;
}

function state(): OrderStateInterface {
  return {
    allOrder: [],
  };
}

export default state;
