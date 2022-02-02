export class Command {
  drawingId?: string;
  action?: string;
  value?: any;
  direction?: string;
  order?: number;

  constructor(order?: number, action?: string, value?: any, direction?: string, drawingId?: string) {
      this.action = action;
      this.direction = direction;
      this.value = value;
      this.order = order;
      this.drawingId = drawingId;
  }
}
