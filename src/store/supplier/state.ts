export interface SupplierInfo {
  supplierName: string;
  company: string;
  email: string;
  Contact: string;
  address: string;
}

export interface SupplierStateInterface {
  supplier: SupplierInfo[];
  activeSupplier?: SupplierInfo;
}

function state(): SupplierStateInterface {
  return {
    supplier: [
      {
        supplierName: 'Basam C. Serad',
        company: 'Nestle Corporation',
        email: 'basamsera1998@gmail.com',
        Contact: '+6392222222',
        address: 'Dimaluna 2, MSU, Marawi City',
      },
    ],
  };
}

export default state;
