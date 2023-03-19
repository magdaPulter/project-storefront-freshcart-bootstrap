export interface ProductsWithRatingQueryModel {
  readonly name: string;
  readonly price: number;
  readonly imageUrl: string;
  readonly featureValue: number;
  readonly storeIds: string[];
  readonly storeNames: string[];
  readonly ratingCount: number;
  readonly ratingValue: number;
  readonly ratingValueArr: number[];
}
