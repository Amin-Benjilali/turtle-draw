import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  cursorPosition = 0;
  rowInput =
    (document.body.clientHeight - (document.body.clientHeight % 10)) / 10 - 2;
  rows: number[] = [];
  columnInput =
    (document.body.clientWidth - (document.body.clientWidth % 10)) / 10;
  columns: number[] = [];
  command: number = 0;
  isBlack = true;
  pencilColor: string = 'black';
  isDrawing: boolean = true;

  constructor() {}

  ngOnInit(): void {
    for (var i = 0; i < this.rowInput; i++) {
      this.rows[i] = i;
    }

    for (var j = 0; j < this.columnInput; j++) {
      this.columns[j] = j;
    }

    console.log(this.columnInput);
    console.log(this.rowInput);


  }

  move(direction: string) {
    for (var i = 0; i < Number(this.command); i++) {
      this.removePencil();
      switch (direction) {
        case 'right':
          if((this.cursorPosition + 1) % this.columnInput != 1 || this.cursorPosition == 0)
          {
            this.cursorPosition += 1;
          }
          break;
        case 'left':
          if((this.cursorPosition - 1) % this.columnInput > 0)
          {
            this.cursorPosition -= 1;
          }
          break;
        case 'up':
          if(this.cursorPosition - this.columnInput > 0)
          {
            this.cursorPosition -= this.columnInput;
          }
          break;
        case 'down':
          if(this.cursorPosition + this.columnInput <= this.rowInput * this.columnInput)
          {
            this.cursorPosition += this.columnInput;
          }
          break;
        default:
          console.log(direction + ' is not a valid direction! ');
      }

      document.getElementById(this.cursorPosition.toString())!.className +=
        'pencil';

      if (this.isDrawing) {
        document.getElementById(this.cursorPosition.toString())!.className =
          this.pencilColor + ' pencil';
      }
    }
  }

  removePencil() {
    if (this.cursorPosition != 0) {
      var previousElement = document.getElementById(
        this.cursorPosition.toString()
      );
      if (previousElement!.className.length > 1) {
        previousElement!.className = previousElement!.className.substring(
          0,
          previousElement!.className.length - 6
        );
      }
    }
  }

  changeColor() {
    if (this.isBlack) {
      this.pencilColor = 'red';
      this.isBlack = false;
    } else {
      this.pencilColor = 'black';
      this.isBlack = true;
    }
  }
}
