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
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import { KatexModule } from 'ng-katex';
import { KatexExampleComponent } from './components/katex-example/katex-example.component';
import { D3OrthographicGlobeComponent } from './components/d3-orthographic-globe/d3-orthographic-globe.component';
import { AngularAutofilterExampleComponent } from './components/angular-autofilter-example/angular-autofilter-example.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserIoComponent } from './components/user-io/user-io.component';



@NgModule({
  declarations: [
    AppComponent,
    CalcTestComponent,
    ThreeTestComponent,
    ThreeGlobeTestComponent,
    ResultsMapComponent,
    KatexExampleComponent,
    D3OrthographicGlobeComponent,
    AngularAutofilterExampleComponent,
    UserIoComponent,
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
    MatCardModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
