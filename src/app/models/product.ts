export class Product {
  constructor(
    public Id: number,
    public Name: string,
    public MetaTitle: string,
    public Image: string,
    public Price: number,
    public PromotionPrice?: number,
    public DiscountAccompanying?: string,
    public LargeImage?: string,
    public CategoryName?: string) {
  }
}

export class Category {
  constructor(
    public Id: number,
    public Name: string,
    public MetaTitle: string) {
  }
}

export class ProductDetail {
  constructor(
    public Code: string,
    public Detail: string,
    public Description: string,
    public MoreImages: string[],
    public IncludeVAT: boolean,
    public Quantity: number,
    public CategoryName: string,
    public Status: boolean,
    public Id: number,
    public Name: string,
    public MetaTitle: string,
    public Image: string,
    public Price: number,
    public PromotionPrice: number,
    public Spec: Specification
  ) { }
}

export class Specification {
  constructor(
    public Id: number,
    public Screen: string,
    public OperatingSystem: string,
    public CameraAfter: string,
    public CameraBefore: string,
    public CPU: string,
    public RAM: string,
    public InternalMemory: string,
    public SIM: string,
    public PinCapacity: string
  ) { }
}
