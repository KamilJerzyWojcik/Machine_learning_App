import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatasetDisplayComponent } from './display-dataset-components/dataset-display/dataset-display.component';
import { DatasetModificationComponent } from './display-dataset-components/dataset-modification/dataset-modification.component';
import { DatasetDisplayDatasetsComponent } from './display-dataset-components/dataset-display-datasets/dataset-display-datasets.component';
import { DatasetDisplayTableComponent } from './display-dataset-components/dataset-display-table/dataset-display-table.component';
import { DatasetDisplayStatisticsComponent } from './display-dataset-components/dataset-display-statistics/dataset-display-statistics.component';

const routesDatasetDisplay: Routes = [
  {
    path: 'dataset_display', 
    component: DatasetDisplayComponent,
    children: [
      {
        path: 'datasets',
        component: DatasetDisplayDatasetsComponent
      },
      { 
        path: 'modification',
        component: DatasetModificationComponent
      },
      {
        path: 'table',
        component: DatasetDisplayTableComponent
      },
      {
        path: 'statistics',
        component: DatasetDisplayStatisticsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesDatasetDisplay)],
  exports: [RouterModule]
})
export class DisplayDatasetRoutingModule { }
