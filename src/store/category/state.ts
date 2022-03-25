export interface Category {
  categoryID: string;
  categoryName: string;
  numProd?: string;
  stockQuantity?: string;
}

export interface CategoryStateInterface {
  allCategory: Category[];
  activeCategory?: Category;
}

function state(): CategoryStateInterface {
  return {
    allCategory: [],
  };
}

export default state;
