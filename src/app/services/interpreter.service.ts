import { Injectable } from '@angular/core';
import { Command } from '../models/command.model';

@Injectable({
  providedIn: 'root'
})
export class InterpreterService {

  constructor() { }

  interpretCommand(command: string, length: number): Command {
    var currentCommand: Command;
    if (command.toLowerCase().startsWith('move')) {
      currentCommand = new Command(length, command.split(' ')[0], command.split(' ')[2], command.split(' ')[1].toLowerCase())
    }
    if (command.toLowerCase().startsWith('pencil') && (command.split(' ')[1] == 'true' || command.split(' ')[1] == 'false'))
    {
      currentCommand = new Command(length, 'pencil', command.split(' ')[1]);
    }
    if (command.toLowerCase().startsWith('color') && (command.split(' ')[1] == 'red' || command.split(' ')[1] == 'black'))
    {
      currentCommand = new Command(length, 'color', command.split(' ')[1].toLowerCase());
    }
    if(command.toLowerCase().startsWith('erase')) {
      currentCommand = new Command(length, command.split(' ')[0], command.split(' ')[2], command.split(' ')[1].toLowerCase())
    }
    return currentCommand!;
  }
}
