export interface ICategoryInfo {
  categoryID: string;
  categoryName: string;
  numProd?: string;
  stockQuantity?: string;
}

export interface CategoryStateInterface {
  allCategory: ICategoryInfo[];
  activeCategory?: ICategoryInfo;
}

function state(): CategoryStateInterface {
  return {
    allCategory: [
      {
        categoryID: '01',
        categoryName: 'Rent',
        numProd: '20',
        stockQuantity: '30',
      },
    ],
  };
}

export default state;
