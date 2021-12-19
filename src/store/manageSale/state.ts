export interface IManageSaleInfo {
  product_ID?: string;
  productName: string;
  productPrice: number;
  productCategory: string;
  productAvailability: string;
}

export interface ManageSaleStateInterface {
  allManageSale: IManageSaleInfo[];
  activeManageSale?: IManageSaleInfo;
}

function state(): ManageSaleStateInterface {
  return {
    allManageSale: [
      {
        product_ID: '200200001123',
        productName: 'Milk Tea',
        productPrice: 110,
        productCategory: 'Beverage/Drinks',
        productAvailability: 'Yes',
      },
      {
        product_ID: '200200005523',
        productName: 'Burger',
        productPrice: 50,
        productCategory: 'Food',
        productAvailability: 'Yes',
      },
      {
        product_ID: '200200006987',
        productName: 'Mango Shake',
        productPrice: 100,
        productCategory: 'Beverage/Drinks',
        productAvailability: 'No',
      },
    ],
  };
}

export default state;
