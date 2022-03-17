import { Inventory } from 'src/interfaces/inventory.interface';
import { InventoryDto } from 'src/services/rest-api';

export interface InventoryStateInterface {
  allInventory: InventoryDto[];
  newInventory?: Inventory;
}

function state(): InventoryStateInterface {
  return {
    allInventory: [],
  };
}

export default state;
