export interface Purchase {
  purchaseID?: number;
  purchaseProduct: string;
  purchaseStatus: string;
  purchaseAmount: number;
  purchaseDate?: Date;
}
