export interface ProductModel {
  readonly name: string;
  readonly price: number;
  readonly categoryId: string;
  readonly storeIds: string[];
  readonly ratingCount: number;
  readonly ratingValue: number;
  readonly featureValue: number;
  readonly id: string;
  readonly imageUrl: string;
}
