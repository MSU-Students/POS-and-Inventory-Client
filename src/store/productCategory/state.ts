export interface ProductCategory {
  Id: string;
  prodCategoryName: string;
}
export interface ProductCategoryStateInterface {
  allProdCategory: ProductCategory[];
  newProductCategory?: ProductCategory;
}

function state(): ProductCategoryStateInterface {
  return {
    allProdCategory: [],
  };
}

export default state;
