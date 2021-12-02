export interface InventoryInfo {
  itemCode: string;
  itemName: string;
  quantProd: string;
  unitProd: string;
  catProd: string;
  ExpiryDate: string;
  dateProd: string;
}

export interface InventoryStateInterface {
  inventory: InventoryInfo[];
  activeInventory?: InventoryInfo;
}

function state(): InventoryStateInterface {
  return {
    inventory: [
      {
        itemCode: '3DDS456FVGHS23',
        itemName: 'Chocolate Powder',
        quantProd: '34',
        unitProd: 'Kilogram (kg)',
        catProd: 'Powder',
        ExpiryDate: '12/23/2022',
        dateProd: '12/23/2313',
      },
      {
        itemCode: '3DDS456FVGHS23',
        itemName: 'Milk Powder',
        quantProd: '34',
        unitProd: 'Kilogram (kg)',
        catProd: 'Powder',
        ExpiryDate: '12/23/2022',
        dateProd: '12/23/2313',
      },
    ],
  };
}

export default state;
