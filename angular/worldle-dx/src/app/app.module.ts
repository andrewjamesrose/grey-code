import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KatexModule } from 'ng-katex';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataReviewComponent } from './components/data-review/data-review.component';
import { DebugComponent } from './components/debug/debug.component';
import { GameClueComponent } from './components/game-clue/game-clue.component';
import { GlobeControlsComponent } from './components/globe-controls/globe-controls.component';
import { GlobeVisualiser } from './components/globe-visualiser/globe-visualiser.component';
import { GridComponent } from './components/grid/grid.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SolutionCardComponent } from './components/solution-card/solution-card.component';
import { StatsTableComponent } from './components/stats-table/stats-table.component';
import { StatsTestingComponent } from './components/stats-testing/stats-testing.component';
import { StatsComponent } from './components/stats/stats.component';
import { UserIoComponent } from './components/user-io/user-io.component';
import { AngularAutofilterExampleComponent } from './components/_archive-of-experiments/angular-autofilter-example/angular-autofilter-example.component';
import { CalcTestComponent } from './components/_archive-of-experiments/calc-test/calc-test.component';
import { KatexExampleComponent } from './components/_archive-of-experiments/katex-example/katex-example.component';
import { MathsDemoComponent } from './components/_archive-of-experiments/maths-demo/maths-demo.component';
import { GameLogicService } from './services/game-logic.service';
import { GameStatisticsService } from './services/game-statistics.service';
import { LocalStorageService } from './services/local-storage.service';
import {MatDialogModule} from '@angular/material/dialog'
import { PopUpDialogServiceService } from './services/pop-up-dialog-service.service';
import { PopUpDialogComponent } from './shared/pop-up-dialog/pop-up-dialog.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    CalcTestComponent,
    KatexExampleComponent,
    AngularAutofilterExampleComponent,
    UserIoComponent,
    MathsDemoComponent,
    GlobeVisualiser,
    StatsTestingComponent,
    StatsTableComponent,
    StatsComponent,
    GlobeControlsComponent,
    GridComponent,
    NavbarComponent,
    DebugComponent,
    GameClueComponent,
    SolutionCardComponent,
    DataReviewComponent,
    PopUpDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    KatexModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatSliderModule,
    MatCheckboxModule,
    MatTableModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [LocalStorageService, GameLogicService, GameStatisticsService, PopUpDialogServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
