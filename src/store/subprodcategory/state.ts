export interface ISubProdCategoryInfo {
  subCategoryID: string;
  mainCategoryName: string;
  subCategoryName: string;
 
}

export interface SubprodCategoryStateInterface {
  allSubCategory: ISubProdCategoryInfo[];
  activeSubCategory?: ISubProdCategoryInfo;
}

function state(): SubprodCategoryStateInterface {
  return {
    allSubCategory: [
      {
        subCategoryID: '41001',
        mainCategoryName: 'Drinks', 
        subCategoryName: 'Milk Teas',
      },
      {
        subCategoryID: '41002',
        mainCategoryName: 'Drinks', 
        subCategoryName: 'Fruit Teas',
      },
      {
        subCategoryID: '41003',
        mainCategoryName: 'Drinks', 
        subCategoryName: 'Yogurt Teas',
      },
      {
        subCategoryID: '41004',
        mainCategoryName: 'Drinks', 
        subCategoryName: 'IceBlended Drinks',
      },
    ],
  };
}

export default state;
