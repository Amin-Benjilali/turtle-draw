export class Command {
  action?: string;
  value?: any;
  direction?: string;

  constructor(action?: string, value?: any, direction?: string) {
      this.action = action;
      this.direction = direction;
      this.value = value;
  }
}
