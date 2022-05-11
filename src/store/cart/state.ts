export interface ICartInfo {
  order_id?: number;
  orderName: string;
  orderSize: string;
  prodQuant: number;
  orderPrice: number;
  orderCategory: string;
  orderSubCategory: string;
  orderSubTotal: number;
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
