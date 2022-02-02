export interface ISubProdCategoryInfo {
  subProdCatId?: number;
  productCategory: string;
  subProdCat: string;
}

export interface SubCategoryStateInterface {
  allSubProdCat: ISubProdCategoryInfo[];
  activeSubCategory?: ISubProdCategoryInfo;
}

function state(): SubCategoryStateInterface {
  return {
    allSubProdCat: [
      {
        productCategory: 'Drinks',
        subProdCat: 'Frappe',
      },
    ],
  };
}

export default state;
