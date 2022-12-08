import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { RippleModule } from 'primeng/ripple';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { StyleClassModule } from 'primeng/styleclass';

import { ImageModule } from 'primeng/image';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';

import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';
import { SourcesComponent } from './components/sources/sources.component';
import { PanelComponent } from './components/panel/panel.component';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ResultsComponent } from './components/results/results.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    SourcesComponent,
    PanelComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AutoCompleteModule,
    FormsModule,
    HttpClientModule,
    StyleClassModule,
    InputTextModule,
    TableModule,
    MultiSelectModule,
    ListboxModule,
    RippleModule,
    TooltipModule,
    ImageModule,
    ScrollPanelModule,
    ButtonModule,
    ToastModule,
    DialogModule
  ],
  providers: [{ provide: MessageService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
