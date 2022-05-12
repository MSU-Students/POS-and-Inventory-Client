export interface ICartInfo {
  cart_ID?: number;
  orderName: string;
  orderSize: string;
  orderQuant: number;
  orderPrice: number;
  orderCategory: string;
  orderSubCategory: string;
  orderSubTotal: number;
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
