import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-components/app.component';
import { DatasetModule } from './dataset/dataset.module';
import { NavigationModule } from './navigation/navigation.module';
import { HttpClientModule } from '@angular/common/http';
import { DisplayDatasetModule } from './display-dataset/display-dataset.module';
import { ScientificNumberPipe } from './pipes/scientific-number.pipe';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DatasetModule,
    NavigationModule,
    DisplayDatasetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
