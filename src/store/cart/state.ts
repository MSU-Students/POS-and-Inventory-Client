export interface ICartInfo {
  orderID?: number;
  prodName: string;
  size: string;
  prodQuant: number;
  price: number;
  subTotal: number;
  img?: string;
}

export interface CartStateInterface {
  allCart: ICartInfo[];
}

function state(): CartStateInterface {
  return {
    allCart: [],
  };
}

export default state;
