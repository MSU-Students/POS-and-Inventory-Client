export interface CategoryInfo {
  code: string;
  name: string;
  numProd: number;
  stockQuantity: number;
}

export interface CategoryStateInterface {
  category: CategoryInfo[];
  activeCategory?: CategoryInfo;
}

function state(): CategoryStateInterface {
  return {
    category: [
      {
        code: 'hj4j324jbb34bj4',
        name: 'Utensils',
        numProd: 1,
        stockQuantity: 2000,
      },
      {
        code: 'h12323h451h14h41',
        name: 'Ingredients',
        numProd: 1,
        stockQuantity: 60,
      },
      {
        code: 'h55464dfds6sd4a1',
        name: 'Equipments',
        numProd: 1,
        stockQuantity: 1,
      },
    ],
  };
}

export default state;
