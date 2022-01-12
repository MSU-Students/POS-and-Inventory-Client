export interface IOrderInfo {
  orderID?: string;
  prodName: string;
  prodQuant: number;
  price: number;
  subTotal: number;
}

export interface OrderStateInterface {
  allOrder: IOrderInfo[];
  activeOrder?: IOrderInfo;
}

function state(): OrderStateInterface {
  return {
    allOrder: [
      {
        orderID: '01',
        prodName: 'Monster Frappe',
        prodQuant: 2,
        price: 150,
        subTotal: 300,
      },
    ],
  };
}

export default state;
