export class Cart {
  constructor(
    public CartItems: CartItem[],
    public CartTotalPrice: number
  ) {
  }
}

export class CartItem {
  constructor(
    public RecordId: number,
    public ProductId: number,
    public Quantity: number,
    public ProductImage: string,
    public ProductName: string,
    public ProductMetaTitle: string,
    public Price: number) {
  }
}
