import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Command } from '../models/command.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getCommands(param: string): Observable<Command[]> {
    return this.http.get<Command[]>("https://turtledrawwebapi20220131235217.azurewebsites.net/api/Commands/" + param)
  }

  postCommand(command: Command): Observable<Command> {
    return this.http.post<Command>("https://turtledrawwebapi20220131235217.azurewebsites.net/api/Commands", command)
  }
}
