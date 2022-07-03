import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponentComponent } from './components/table-component/table-component.component';
import { DisplayGraphComponent } from './components/display-graph/display-graph.component';
import { ButtonPanelComponent } from './components/button-panel/button-panel.component';
import { AppDataService } from './services/app-data.service';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendHttpTestComponent } from './components/backend-http-test/backend-http-test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge'
import { MatDividerModule } from '@angular/material/divider';


import { HttpClientModule } from '@angular/common/http';
import { HttpViaServiceComponent } from './components/http-via-service/http-via-service.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponentComponent,
    DisplayGraphComponent,
    ButtonPanelComponent,
    ReactiveFormComponent,
    BackendHttpTestComponent,
    HttpViaServiceComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatTabsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatDividerModule
  ],
  providers: [AppDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
