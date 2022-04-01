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
        type: 'milk tea',
        date: '01/31/2022',
      },
      {
        productID: 100002,
        prodName: 'Nescafe Iced Coffee',
        price: 80,
        type: 'iced coffee',
        date: '01/31/2022',
      },
      {
        productID: 100003,
        prodName: 'Green tea',
        price: 75,
        type: 'yogurt teas',
        date: '01/31/2022',
      },
      {
        productID: 200001,
        prodName: 'Spaghetti',
        price: 50,
        type: 'pasta',
        date: '01/31/2022',
      },

      {
        productID: 200002,
        prodName: 'Grilled Cheese sandwich',
        price: 75,
        type: 'sandwich',
        date: '01/31/2022',
      },

      {
        productID: 200001,
        prodName: 'Tuna sandwich',
        price: 75,
        type: 'sandwich',
        date: '01/31/2022',
      },

      {
        productID: 200001,
        prodName: 'Beef steak',
        price: 125,
        type: 'meals',
        date: '01/31/2022',
      },
      {
        productID: 200001,
        prodName: 'Banana Milk tea',
        price: 70,
        type: 'milk tea',
        date: '01/31/2022',
      },
      {
        productID: 200001,
        prodName: 'Tapioca Pearls',
        price: 70,
        type: 'addons',
        date: '01/31/2022',
      },
      {
        productID: 200001,
        prodName: 'Nata De Coco',
        price: 70,
        type: 'addons',
        date: '01/31/2022',
      },
    ],
  };
}

export default state;
