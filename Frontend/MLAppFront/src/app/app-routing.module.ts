import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from './navigation/navigation-components/cards/cards.component';
import { DatasetComponent } from './dataset/dataset-components/dataset/dataset.component';
import { DatasetDisplayComponent } from './display-dataset/display-dataset-components/dataset-display/dataset-display.component';

const routes: Routes = [
  {path: 'dataset_display', component: DatasetDisplayComponent},
  {path: 'dataset', component: DatasetComponent},
  {path: '', component: CardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
