import { SubprodCategory } from 'src/interfaces/sub-productCategory';

export interface SubCategoryStateInterface {
  allSubProdCat: SubprodCategory[];
  newSubCategory?: SubprodCategory;
}

function state(): SubCategoryStateInterface {
  return {
    allSubProdCat: [],
  };
}

export default state;
