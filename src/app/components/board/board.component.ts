import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChildren,
} from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { Command } from '../../models/command.model';
import { HttpService } from '../../services/http.service';
import { InterpreterService } from 'src/app/services/interpreter.service';

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


  constructor(
    private httService: HttpService,
    private interpreterService: InterpreterService
    ) {}

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
    var currentCommand = this.interpreterService.interpretCommand(this.command.toLowerCase(), this.commandHistory.length);
    this.addToDb(currentCommand);
    this.runCommand(currentCommand);
  }

  runCommand(command: Command) {
    if(command.action == 'move')
    {
      this.move(command.value, command.direction);
    }
    if(command.action == 'pencil')
    {
      this.changeDrawingState(command.value == 'true');
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

  addToDb(command: Command) {
    command.drawingId = '5';
    this.httService.postCommand(command).subscribe(data => {
      command = data;
    });
    this.commandHistory.push(command);
    this.commandHistoryEvent.emit(this.commandHistory);
  }

  move(value: string, direction?: string, isErasing: boolean = false) {
    var numberValue = Number(value);
    for (var i = 0; i < numberValue; i++) {
      this.getCurrentTile().removePencil();
      switch (direction) {
        case 'right':
          this.maxX > this.x + 1 ? this.x++ : (i = numberValue);
          break;
        case 'left':
          0 <= this.x - 1 ? this.x-- : (i = numberValue);
          break;
        case 'up':
          0 <= this.y - 1 ? this.y-- : (i = numberValue);
          break;
        case 'down':
          this.maxY > this.y + 1 ? this.y++ : (i = numberValue);
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
