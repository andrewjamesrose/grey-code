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

@NgModule({
  declarations: [
    AppComponent,
    CalcTestComponent,
    ThreeTestComponent,
    ThreeGlobeTestComponent,
    ResultsMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
