export interface ISupplierInfo {
  supplierID?: string;
  supplierName: string;
  company: string;
  email: string;
  contact: string;
  address: string;
}

export interface SupplierStateInterface {
  allSupplier: ISupplierInfo[];
  activeSupplier?: ISupplierInfo;
}

function state(): SupplierStateInterface {
  return {
    allSupplier: [
      {
        supplierID: 'DjeyU5OFMPjmzxVobvDFmNAhY',
        supplierName: 'Basam C. Serad',
        company: 'Nestle Corporation',
        email: 'basamsera1998@gmail.com',
        contact: '+6392222222',
        address: 'Dimaluna 2, MSU, Marawi City',
      },
    ],
  };
}

export default state;
