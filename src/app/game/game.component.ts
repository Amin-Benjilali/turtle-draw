import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { Command } from '../board/command.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {

  @ViewChild(TemplateRef) history!: TemplateRef<any>;
  @ViewChild(BoardComponent)
  board!: BoardComponent;
  command = '';
  commandHistory: Command[] = [];
  pencilColor = 'black';
  isDrawing: boolean = true;

  constructor(
    readonly dialog: MatDialog
    ) {}

  interpretCommand() {
    this.board.interpretCommand();
    this.command = '';
  }

  openDialog(config?: MatDialogConfig) {
    return this.dialog.open(this.history, config)
  }
}
