import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChildren,
} from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { Command } from './command.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  cursorPosition = 0;
  rowInput =
    (document.body.clientHeight - (document.body.clientHeight % 10)) / 10 - 2;
  rows: number[] = [];
  columnInput =
    (document.body.clientWidth - (document.body.clientWidth % 10)) / 10;
  columns: number[] = [];

  x: number = 0;
  y: number = 0;
  maxX: number = 0;
  maxY: number = 0;

  @Input() command: string = '';
  @Input() pencilColor: string = 'black';
  @Output() colorChangedEvent = new EventEmitter<string>();
  @Input() isDrawing: boolean = true;
  @Output() isDrawingEvent = new EventEmitter<boolean>();

  @Input() commandHistory: Command[] = [];
  @Output() commandHistoryEvent = new EventEmitter<Command[]>();

  @ViewChildren(TileComponent) tiles!: any;

  constructor() {}

  ngOnInit(): void {
    this.render();
  }

  ngAfterViewInit(): void {
    this.x = Math.round(this.maxX / 2);
    this.y = Math.round(this.maxY / 2);
    this.getCurrentTile().addPencil('pencil');
  }

  render() {
    for (var i = 0; i < this.rowInput; i++) {
      this.rows[i] = i;
    }

    for (var j = 0; j < this.columnInput; j++) {
      this.columns[j] = j;
    }
    this.maxX = this.columns.length;
    this.maxY = this.rows.length;
  }

  interpretCommand() {
    if (this.command.toLowerCase().startsWith('move')) {
      var currentCommand = new Command(this.command.split(' ')[0], Number(this.command.split(' ')[2]), this.command.split(' ')[1].toLowerCase())

      this.commandHistory.push(currentCommand);
      this.commandHistoryEvent.emit(this.commandHistory);
      this.runCommand(currentCommand);
    }
    if (this.command.toLowerCase().startsWith('pencil') && (this.command.split(' ')[1] == 'true' || this.command.split(' ')[1] == 'false'))
    {
      var currentCommand = new Command('pencil', this.command.split(' ')[1] == 'true');

      this.commandHistory.push(currentCommand);
      this.commandHistoryEvent.emit(this.commandHistory);
      this.runCommand(currentCommand);
    }
    if (this.command.toLowerCase().startsWith('color') && (this.command.split(' ')[1] == 'red' || this.command.split(' ')[1] == 'black'))
    {
      var currentCommand = new Command('color', this.command.split(' ')[1].toLowerCase());

      this.commandHistory.push(currentCommand);
      this.commandHistoryEvent.emit(this.commandHistory);
      this.runCommand(currentCommand);
    }
    if(this.command.toLowerCase().startsWith('erase')) {
      var currentCommand = new Command(this.command.split(' ')[0], Number(this.command.split(' ')[2]), this.command.split(' ')[1].toLowerCase())

      this.commandHistory.push(currentCommand);
      this.commandHistoryEvent.emit(this.commandHistory);
      this.runCommand(currentCommand);
    }
    console.log(this.commandHistory);
  }

  runCommand(command: Command) {
    if(command.action == 'move')
    {
      this.move(command.value, command.direction);
    }
    if(command.action == 'pencil')
    {
      this.changeDrawingState(command.value);
    }
    if(command.action == 'color')
    {
      this.changeColor(command.value);
    }
    if(command.action == 'erase')
    {
      this.move(command.value, command.direction, true)
    }
  }

  move(value: number, direction?: string, isErasing: boolean = false) {
    for (var i = 0; i < value; i++) {
      this.getCurrentTile().removePencil();
      switch (direction) {
        case 'right':
          this.maxX > this.x + 1 ? this.x++ : (i = value);
          break;
        case 'left':
          0 <= this.x - 1 ? this.x-- : (i = value);
          break;
        case 'up':
          0 <= this.y - 1 ? this.y-- : (i = value);
          break;
        case 'down':
          this.maxY > this.y + 1 ? this.y++ : (i = value);
          break;
        default:
          console.log(direction + ' is not a valid direction! ');
      }
      if (this.isDrawing && isErasing == false) {
        this.getCurrentTile().changeColor(this.pencilColor);
      }
      if (isErasing) {
        this.getCurrentTile().changeColor('');
      }
      this.getCurrentTile().addPencil(' pencil');
    }
  }

  changeColor(value: string) {
    this.pencilColor = value;
    this.colorChanged(this.pencilColor);
  }

  colorChanged(value: string) {
    this.colorChangedEvent.emit(value);
  }

  changeDrawingState(value: boolean) {
    this.isDrawing = value;
    this.isDrawingChanged(value);
  }

  isDrawingChanged(value: boolean) {
    this.isDrawingEvent.emit(value);
  }

  getCurrentTile() {
    return this.tiles._results.find(
      (element: { x: number; y: number }) =>
        element.x == this.x && element.y == this.y
    );
  }
}
