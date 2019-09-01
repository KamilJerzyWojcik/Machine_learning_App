import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UploadDataComponent } from './dataset-components/upload-data/upload-data.component';
import { DatasetComponent } from './dataset-components/dataset/dataset.component';
import { DatasetService } from '../services/dataset-service/dataset.service';


@NgModule({
  declarations: [UploadDataComponent, DatasetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatasetService]
})
export class DatasetModule { }
