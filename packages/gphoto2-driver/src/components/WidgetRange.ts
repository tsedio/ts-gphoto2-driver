export class WidgetRange {
  /**
   * The minimum accepted value.
   */
  readonly min: number;
  /**
   * The maximum accepted value.
   */
  readonly max: number;
  /**
   * The stepping.
   */
  readonly step: number;

  constructor(options: {min: number; max: number; step: number}) {
    this.min = options.min;
    this.max = options.max;
    this.step = options.step;
  }

  public toString() {
    return "Range{" + this.min + ".." + this.max + ", step=" + this.step + "}";
  }
}
