export interface IOrderInfo {
  orderID?: number;
  prodName: string;
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
        prodName: 'Monster Frappe',
        prodQuant: 2,
        price: 150,
        subTotal: 300,
        orderDate: '01/31/2022',
      },
      {
        orderID: 2,
        prodName: 'Red Velvet',
        prodQuant: 1,
        price: 80,
        subTotal: 80,
        orderDate: '01/31/2022',
      },
      {
        orderID: 3,
        prodName: 'Lychee',
        prodQuant: 2,
        price: 75,
        subTotal: 150,
        orderDate: '01/31/2022',
      },
      {
        orderID: 4,
        prodName: 'Milk Tea',
        prodQuant: 2,
        price: 75,
        subTotal: 150,
        orderDate: '01/31/2022',
      },
    ],
  };
}

export default state;
