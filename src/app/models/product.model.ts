export interface ProductModel {
  readonly name: string;
  readonly price: number;
  readonly categoryId: string;
  readonly storeIds: string[];
  readonly ratingValue: number;
  readonly featureValue: number
  readonly id: string;
  readonly imageUrl: string;
}
