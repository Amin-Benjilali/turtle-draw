import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent {
  @Input() x: number = 0;
  @Input() y: number = 0;

  class: string = '';

  constructor() { }

  changeColor(color: string) {
    this.class = color;
  }

  addPencil(value: string) {
    this.class += value
  }

  removePencil() {
    this.class = this.class.substring(0,this.class.length - 6);
  }
}
