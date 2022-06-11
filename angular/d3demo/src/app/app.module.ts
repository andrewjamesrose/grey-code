import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponentComponent } from './components/table-component/table-component.component';
import { DisplayGraphComponent } from './components/display-graph/display-graph.component';
import { ButtonPanelComponent } from './components/button-panel/button-panel.component';
import { AppDataService } from './services/app-data.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponentComponent,
    DisplayGraphComponent,
    ButtonPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AppDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
