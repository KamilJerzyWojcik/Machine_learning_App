import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubdatasetService } from 'src/app/services/subdataset-service/subdataset.service';
import { DataModificationService } from 'src/app/services/data-modification-service/data-modification.service';

@Component({
  selector: 'app-dataset-display-table',
  templateUrl: './dataset-display-table.component.html',
  styleUrls: ['./dataset-display-table.component.css']
})
export class DatasetDisplayTableComponent implements OnInit {

  public subDatasetId: number;
  public SubDataset: any;
  public Page: number;
  public MaxPage: number;
  public DataPerPage: number;

  public ShowDeleteConfirm: boolean = false;
  public Head: any;
  public NumericHead = []
  public Columns = [];
  public showCreateColumnForm: boolean = false;

  constructor(
    private _router: Router,
    private _subDatasetService: SubdatasetService,
    private _dataModificationService: DataModificationService
  ) { }

  ngOnInit() {
    this.Page = 1;
    this.DataPerPage = 25;
    this.getData();
  }

  private getData() {
    this.isSubDatasetexist()
    this._subDatasetService.GetSubdatasetById(this.subDatasetId, this.Page, this.DataPerPage).subscribe(sub => {
      this.SubDataset = sub;
      this.Columns = [...sub[0]];

      let numeric = []
      let values = sub[1]
      for(let i = 0; i < values.length - 1; i++) {
        if(!Number.isNaN(Number.parseFloat(values[i]))) {
          numeric.push(this.Columns[i]);
        }
      }
      this.NumericHead = numeric;
    });
    this._subDatasetService.GetSubdatasetRowsById(this.subDatasetId).subscribe(data => {
      this.MaxPage = Math.ceil(data.row_count / this.DataPerPage)
    });
  }

  private isSubDatasetexist() {
    let subId = this.SubDatasetIdStorageGet();
    if (subId == "") {
      this._router.navigate(['/dataset_display/datasets']);
    }
    this.subDatasetId = subId;
  }

  private SubDatasetIdStorageGet() {
    return JSON.parse(localStorage.getItem('subdataset_id'));
  }

  addToDelete(column) {
    let index = this.Columns.indexOf(column);
    if (index != -1) {
      this.Columns.splice(index, 1);
    }
    else {
      this.Columns.push(column);
    }
  }

  cancelCreation(decision) {
    this.showCreateColumnForm = decision;
    this.getData();
  }

  refreshColumn() {
    this.Columns = [...this.SubDataset[0]];
  }

  keepColumns() {
    this._dataModificationService.DeleteColumns(this.Columns, this.subDatasetId).subscribe(data => {
      this._subDatasetService.GetSubdatasetById(this.subDatasetId, this.Page, this.DataPerPage).subscribe(sub => {
        this.SubDataset = sub;
        this.Columns = [...sub[0]]
      });
    })
  }

  next() {
    this.Page = this.Page + 1;
    this._subDatasetService.GetSubdatasetById(this.subDatasetId, this.Page, this.DataPerPage).subscribe(sub => {
      this.SubDataset = sub;
    });
  }

  previous() {
    this.Page = this.Page - 1;
    this._subDatasetService.GetSubdatasetById(this.subDatasetId, this.Page, this.DataPerPage).subscribe(sub => {
      this.SubDataset = sub;
    });
  }

  firts() {
    this.Page = 1;
    this._subDatasetService.GetSubdatasetById(this.subDatasetId, this.Page, this.DataPerPage).subscribe(sub => {
      this.SubDataset = sub;
    });
  }

  last() {
    this.Page = this.MaxPage;
    this._subDatasetService.GetSubdatasetById(this.subDatasetId, this.Page, this.DataPerPage).subscribe(sub => {
      this.SubDataset = sub;
    });
  }
}
