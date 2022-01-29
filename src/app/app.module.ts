import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { TileComponent } from './tile/tile.component';
import { BoardComponent } from './board/board.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatDialogModule} from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FirstLetterUpperPipe } from './first-letter-upper.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    TileComponent,
    BoardComponent,
    FirstLetterUpperPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatListModule,
    ScrollingModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
