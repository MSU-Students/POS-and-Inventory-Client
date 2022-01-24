

export interface IOrderInfo {
  orderID?: number;
  prodName: string;
  prodQuant: number;
  price: number;
  subTotal: number;
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
        prodName: 'Monster Frappe',
        prodQuant: 2,
        price: 150,
        subTotal: 300,
       
        
      },
      {
        orderID: 2,
        prodName: 'Red Velvet',
        prodQuant: 1,
        price: 80,
        subTotal: 80,
        
      },
      {
        orderID: 3,
        prodName: 'Lychee',
        prodQuant: 2,
        price: 75,
        subTotal: 150,
        
      },
    ],
  };
}

export default state;
