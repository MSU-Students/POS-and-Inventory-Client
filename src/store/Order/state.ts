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
    allOrder: [
      {
        orderID: 1,
        prodName: 'Milk tea',
        size: 'medium',
        prodQuant: 1,
        price: 200,
        subTotal: 300,
        orderDate: '2022/01/30',
      },
      {
        orderID: 1,
        prodName: 'Milk tea',
        size: 'medium',
        prodQuant: 1,
        price: 200,
        subTotal: 300,
        orderDate: '2022/02/30',
      },
      {
        orderID: 1,
        prodName: 'Milk tea',
        size: 'medium',
        prodQuant: 1,
        price: 200,
        subTotal: 300,
        orderDate: '2022/03/30',
      },
    ],
  };
}

export default state;
