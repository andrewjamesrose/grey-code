import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalcTestComponent } from './components/_archive-of-experiments/calc-test/calc-test.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table'
import {MatSortModule} from '@angular/material/sort'
import {MatRadioModule} from '@angular/material/radio'
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { KatexModule } from 'ng-katex';
import { KatexExampleComponent } from './components/_archive-of-experiments/katex-example/katex-example.component';
import { AngularAutofilterExampleComponent } from './components/_archive-of-experiments/angular-autofilter-example/angular-autofilter-example.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserIoComponent } from './components/user-io/user-io.component';
import { GameLogicService } from './services/game-logic.service';
import { MathsDemoComponent } from './components/_archive-of-experiments/maths-demo/maths-demo.component';
import { GlobeVisualiser } from './components/globe-visualiser/globe-visualiser.component';
import { LocalStorageService } from './services/local-storage.service';
import { GameStatisticsService } from './services/game-statistics.service';
import { StatsTestingComponent } from './components/stats-testing/stats-testing.component';
import { StatsTableComponent } from './components/stats-table/stats-table.component';
import { StatsComponent } from './components/stats/stats.component';
import { GlobeControlsComponent } from './components/globe-controls/globe-controls.component';


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
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatSliderModule,
    MatCheckboxModule,
    MatTableModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatSortModule
  ],
  providers: [LocalStorageService, GameLogicService, GameStatisticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
