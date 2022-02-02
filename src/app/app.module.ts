import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './components/game/game.component';
import { TileComponent } from './components/tile/tile.component';
import { BoardComponent } from './components/board/board.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatDialogModule} from '@angular/material/dialog';
import { FirstLetterUpperPipe } from './pipes/first-letter-upper.pipe';
import { HttpClientModule } from '@angular/common/http';

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
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
