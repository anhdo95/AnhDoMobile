export class Menu {
  Id: number;
  Text: string;
  Link: string;
  Icon: string;
  Target: TargetLink;
}

export enum TargetLink {
  _blank = 0,
  _self = 1,
  _parent = 2,
  _top = 3
}
