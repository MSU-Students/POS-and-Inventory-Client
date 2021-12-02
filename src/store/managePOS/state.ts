export interface ManagePOSInfo {
  product_ID: string;
  name: string;
  productPrice: number;
  Category: string;
  Availability: string;
}

export interface ManagePOSStateInterface {
  managePOS: ManagePOSInfo[];
  activeManagePOS?: ManagePOSInfo;
}

function state(): ManagePOSStateInterface {
  return {
    managePOS: [
      {
        product_ID: '200200001123',
        name: 'Milk Tea',
        productPrice: 110,
        Category: 'Beverage/Drinks',
        Availability: 'YES',
      },
      {
        product_ID: '200200005523',
        name: 'Burger',
        productPrice: 50,
        Category: 'Food',
        Availability: 'YES',
      },
      {
        product_ID: '200200006987',
        name: 'Mango Shake',
        productPrice: 100,
        Category: 'Beverage/Drinks',
        Availability: 'No',
      },
    ],
  };
}

export default state;
