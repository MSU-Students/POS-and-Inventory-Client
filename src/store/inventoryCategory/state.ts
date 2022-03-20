export interface InventoryCategory {
  categoryID?: number;
  categoryName: string;
  totalProd: number;
  stockQuantity: number;
}

export interface InventoryCatStateInterface {
  allInventoryCat: InventoryCategory[];
  newInventoryCat?: InventoryCategory;
}

function state(): InventoryCatStateInterface {
  return {
    allInventoryCat: [],
  };
}

export default state;
