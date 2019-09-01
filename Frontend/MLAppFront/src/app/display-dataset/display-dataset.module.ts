import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatasetDisplayComponent } from './display-dataset-components/dataset-display/dataset-display.component';
import { DatasetDisplayChartComponent } from './display-dataset-components/dataset-display-chart/dataset-display-chart.component';
import { DatasetDisplayTableComponent } from './display-dataset-components/dataset-display-table/dataset-display-table.component';
import { DisplayDatasetRoutingModule } from './display-dataset-routing.module';
import { DatasetDisplayDatasetsComponent } from './display-dataset-components/dataset-display-datasets/dataset-display-datasets.component';
import { DatasetDisplayStatisticsComponent } from './display-dataset-components/dataset-display-statistics/dataset-display-statistics.component';
import { CreateColumnFormComponent } from './display-dataset-components/dataset-display-table/create-column-form/create-column-form.component';
import { ScientificNumberPipe } from '../pipes/scientific-number.pipe';

@NgModule({
  declarations: [
    DatasetDisplayComponent, 
    DatasetDisplayChartComponent, 
    DatasetDisplayTableComponent, 
    DatasetDisplayDatasetsComponent, 
    DatasetDisplayStatisticsComponent, 
    CreateColumnFormComponent,
    ScientificNumberPipe],
  imports: [
    FormsModule,
    CommonModule,
    DisplayDatasetRoutingModule
  ]
})
export class DisplayDatasetModule { }
