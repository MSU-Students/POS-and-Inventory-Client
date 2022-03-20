import { Supplier } from 'src/interfaces/supplier.interface';

export interface SupplierStateInterface {
  allSupplier: Supplier[];
  newSupplier?: Supplier;
}

function state(): SupplierStateInterface {
  return {
    allSupplier: [],
  };
}

export default state;
