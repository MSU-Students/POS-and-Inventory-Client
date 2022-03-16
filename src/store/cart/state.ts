export interface ICartInfo {
  productName: string;
  quantity: number;
  size: string;
}
export interface CartStartInterface {
  allCart: ICartInfo[];
}
function state(): CartStartInterface {
  return {
    allCart: [],
  };
}

export default state;
