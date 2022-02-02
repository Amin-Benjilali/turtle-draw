import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { Command } from '../../models/command.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { HttpService } from '../../services/http.service';

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
    readonly dialog: MatDialog,
    private httService: HttpService
    ) { }

  interpretCommand() {
    this.board.interpretCommand();
    this.command = '';
  }

  openDialog(config?: MatDialogConfig) {
    return this.dialog.open(this.history, config)
  }

  fetchCommand(param: string) {
    this.httService.getCommands(param).subscribe(data => {
      for(var i = 0; i < data.length; i++)
      {
        this.board.runCommand(data[i]);
      }
    });
  }
}
