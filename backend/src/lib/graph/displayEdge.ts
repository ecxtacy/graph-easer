export class DisplayEdge {
  public toColor: boolean;
  public x: number;
  public y: number;

  constructor(toColor: boolean, x: number, y: number) {
    this.toColor = toColor;
    this.x = x;
    this.y = y;
  }
}
