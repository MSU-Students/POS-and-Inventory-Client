export interface ManageProduct {
  product_ID?: string;
  productName: string;
  productPrice: number;
  productAvailability: 'Yes' | 'No';
  productDateCreated?: Date;
  url?: string;
}
