export class Province {
  constructor(
    public Id: number,
    public Name: string) {
  }
}

export class District {
  constructor(
    public Id: number,
    public Name: string,
    public ProvinceId: number) {
  }
}

export class Customer {
  public Id: number = -1;
  public Gender: boolean;
  public FullName: string;
  public PhoneNumber: string;
  public Address: string;
}

export class OrderComplete {
  public OrderId: number;
  public ShipGender: boolean;
  public ShipName: string;
  public ShipPhone: string;
  public ShipAddress: string;
  public OrderTotal: number;
  public OrderItems: OrderItem[];
}

export class OrderItem {
  constructor(
    public Name: string,
    public Image: string,
    public Price: number,
    public Quantity: number
  ) {
  }
}
