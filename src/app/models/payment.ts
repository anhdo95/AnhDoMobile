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
