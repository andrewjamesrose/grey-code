import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalcTestComponent } from './components/calc-test/calc-test.component';
import { ThreeTestComponent } from './components/three-test/three-test.component';
import { ThreeGlobeTestComponent } from './components/three-globe-test/three-globe-test.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultsMapComponent } from './components/results-map/results-map.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { KatexModule } from 'ng-katex';
import { KatexExampleComponent } from './components/katex-example/katex-example.component';


@NgModule({
  declarations: [
    AppComponent,
    CalcTestComponent,
    ThreeTestComponent,
    ThreeGlobeTestComponent,
    ResultsMapComponent,
    KatexExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatButtonModule,
    KatexModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
