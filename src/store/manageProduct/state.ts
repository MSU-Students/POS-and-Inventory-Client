import { ManageProduct } from 'src/interfaces/manage-product.interface';

export interface ManageProductStateInterface {
  allProduct: ManageProduct[];
  newProduct?: ManageProduct;
}

function state(): ManageProductStateInterface {
  return {
    allProduct: [],
  };
}

export default state;
