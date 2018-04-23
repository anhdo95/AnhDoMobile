export class Product {
  constructor(
    public Id: number,
    public Name: string,
    public MetaTitle: string,
    public Image: string,
    public Price: number,
    public PromotionPrice?: number) {
  }
}
