export interface IInventoryCatInfo {
  categoryID?: number;
  invCategoryName: string;
  totalProd?: number;
  stockQuantity?: number;
}

export interface InventoryCatStateInterface {
  allInventoryCat: IInventoryCatInfo[];
}

function state(): InventoryCatStateInterface {
  return {
    allInventoryCat: [
      {
        invCategoryName: 'Utensils',
      },
    ],
  };
}

export default state;
