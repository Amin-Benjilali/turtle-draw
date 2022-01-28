import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent {

  @Input() id: number = 0;

  @Input() x: number = 0;
  @Input() y: number = 0;

  constructor() { }
}
