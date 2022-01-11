export interface IOrderInfo {
  OrderID: string;
  prodName: string;
  prodQuant?: string;
  price: string;
  total: string;
}

export interface OrderStateInterface {
  allOrder: IOrderInfo[];
  activeOrder?: IOrderInfo;
}

function state(): OrderStateInterface {
  return {
    allOrder: [
      {
        OrderID: '01',
        prodName: 'Frozen Yogurt',
        prodQuant: '1',
        price: '10.00',
        total: '10.00',
      },
    ],
  };
}

export default state;
