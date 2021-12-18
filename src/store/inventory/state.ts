export interface iInventoryInfo {
  itemCode: string;
  itemName: string;
  itemQuantProd: string;
  itemUnitProd: string;
  itemCategory: string;
  itemExpiryDate: string;
  itemDateCreated: string;
}

export interface InventoryStateInterface {
  allInventory: iInventoryInfo[];
  activeInventory?: iInventoryInfo;
}

function state(): InventoryStateInterface {
  return {
    allInventory: [
      {
        itemCode: '3DDS456FVGHS23',
        itemName: 'Chocolate Powder',
        itemQuantProd: '34',
        itemUnitProd: 'Kilogram (kg)',
        itemCategory: 'Powder',
        itemExpiryDate: '12/23/2022',
        itemDateCreated: '12/23/2313',
      },
      {
        itemCode: '3DDS456FVGHS23',
        itemName: 'Milk Powder',
        itemQuantProd: '34',
        itemUnitProd: 'Kilogram (kg)',
        itemCategory: 'Powder',
        itemExpiryDate: '12/23/2022',
        itemDateCreated: '12/23/2313',
      },
    ],
  };
}

export default state;
