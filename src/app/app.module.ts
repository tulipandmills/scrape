import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AutoCompleteModule } from 'primeng/autocomplete';



import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';
import { SourcesComponent } from './components/sources/sources.component';
import { PanelComponent } from './components/panel/panel.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    SourcesComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AutoCompleteModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    TableModule,
    MultiSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
