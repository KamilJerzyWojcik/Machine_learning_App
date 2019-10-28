import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataModificationService } from 'src/app/services/data-modification-service/data-modification.service';
import { Subscription } from 'rxjs';
import { DescriptionStatiscticsItem } from '../dataset-display-statistics/models/description-statisctics-item';

@Component({
  selector: 'app-dataset-modification',
  templateUrl: './dataset-modification.component.html',
  styleUrls: ['./dataset-modification.component.css']
})
export class DatasetModificationComponent implements OnInit, OnDestroy {

  private subDatasetId;
  private subscriptionMissedColumn: Subscription;
  public missedColumns: DescriptionStatiscticsItem[];

  constructor(private _router: Router, private _dataModificationService: DataModificationService) { }

  ngOnInit() {
    this.subDatasetId = this.SubDatasetIdStorageGet();
    if(this.subDatasetId == "") {
      this._router.navigate( [ '/dataset_display/datasets' ] );
    }

    this.subscriptionMissedColumn = this._dataModificationService
    .GetColumnsWithMissedValuesById(this.subDatasetId)
    .subscribe((result) => {
      this.missedColumns = JSON.parse(result['data']) as DescriptionStatiscticsItem[];
      console.log(this.missedColumns);
    });
  }

  private SubDatasetIdStorageGet() {
    return JSON.parse(localStorage.getItem('subdataset_id'));
  }

  onApplyImputer() {
    this._dataModificationService
      .ApplyImputerToFillMissedValues(this.subDatasetId)
      .subscribe((result) => {
        console.log(result);
      });
  }

  onDeleteOnColumnByName(column: string) {
    this._dataModificationService
      .DeleteOneColumnByName(column, this.subDatasetId)
      .subscribe((result) => {
        console.log(result);
        this.subscriptionMissedColumn = this._dataModificationService
          .GetColumnsWithMissedValuesById(this.subDatasetId)
          .subscribe((result) => {
            this.missedColumns = JSON.parse(result['data']) as DescriptionStatiscticsItem[];
          });
      });
  }

  onDeleteRows(column: string) {
    this._dataModificationService
      .DeleteRowsWithMissedValuesById(this.subDatasetId, column)
      .subscribe((result) => {
        this.subscriptionMissedColumn = this._dataModificationService
          .GetColumnsWithMissedValuesById(this.subDatasetId)
          .subscribe((result) => {
            this.missedColumns = JSON.parse(result['data']) as DescriptionStatiscticsItem[];
          });
      });
  }

  onFillValuesMedian(column: string) {
    this._dataModificationService
      .FillMissedDataByMedianById(this.subDatasetId, column)
      .subscribe((result) => {
        this.subscriptionMissedColumn = this._dataModificationService
          .GetColumnsWithMissedValuesById(this.subDatasetId)
          .subscribe((result) => {
            this.missedColumns = JSON.parse(result['data']) as DescriptionStatiscticsItem[];
          });
      });
  }

  ngOnDestroy() {
    this.subscriptionMissedColumn.unsubscribe();
  }
  
}
