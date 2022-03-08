export interface IProductInfo {
  productID?: number;
  prodName: string;
  price: number;
  type: string;
  date: string;
  img?: string;
}

export interface ProductStateInterface {
  allProduct: IProductInfo[];
  activeProduct?: IProductInfo;
}

function state(): ProductStateInterface {
  return {
    allProduct: [
      {
        productID: 100001,
        prodName: 'Monster Frappe',
        price: 150,
        type: 'Frappe',
        date: '01/31/2022',
      },
      {
        productID: 100002,
        prodName: 'Red Velvet',
        price: 80,
        type: 'Milk Tea',
        date: '01/31/2022',
      },
      {
        productID: 100003,
        prodName: 'Lychee',
        price: 75,
        type: 'Milk Tea',
        date: '01/31/2022',
      },
      {
        productID: 200001,
        prodName: 'Spaghetti',
        price: 50,
        type: 'Food',
        date: '01/31/2022',
      },
    ],
  };
}

export default state;
