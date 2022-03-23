export interface Inventory {
  itemCode?: string;
  itemName: string;
  itemQuantProd: number;
  itemUnitProd: string;
  itemExpiryDate: string;
  itemDateCreated: Date;
  categoryID: number;
  inventoryCatCategoryID: number;
}
