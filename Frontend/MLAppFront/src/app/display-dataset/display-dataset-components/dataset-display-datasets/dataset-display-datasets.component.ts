import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DatasetService } from 'src/app/services/dataset-service/dataset.service';
import { DataSet } from 'src/app/dataset/models/dataset';
import { SubdatasetService } from 'src/app/services/subdataset-service/subdataset.service';
import { Router } from '@angular/router';
import { SubDataSet } from '../../models/subdataset';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dataset-display-datasets',
  templateUrl: './dataset-display-datasets.component.html',
  styleUrls: ['./dataset-display-datasets.component.css']
})
export class DatasetDisplayDatasetsComponent implements OnInit, OnDestroy {

  public CurrentDatasetId: number;
  public CurrentSubDatasetId: number;
  public DatasetNames: any;
  public Dataset: DataSet;
  public SubDatasets: SubDataSet[];
  public NewSubdatasetName:string;

  public SubDatasetToDelete: SubDataSet;
  public ShowDeleteConfirm: boolean;
  public ShowCreateEditor: boolean;
  private subscription: Subscription;

  constructor(private _datasetService: DatasetService,
              private _subdatasetService: SubdatasetService,
              private _router: Router) { }

  ngOnInit() {
    this.subscription = this._datasetService.GetDatasetNames().subscribe(names => this.DatasetNames = names);
    this.CurrentSubDatasetId = this.SubDatasetIdStorageGet();
    this.getDataset();
  }

  private getDataset() {
    let datasetId = this.DatasetIdStorageGet();
    if(datasetId !== null && datasetId !== undefined) {
      this.CurrentDatasetId = datasetId;
      this.selectDataset();
    } else {
      this.CurrentDatasetId = 0;
    }
  }

  selectDataset() {
    if(this.CurrentDatasetId !== null && this.CurrentDatasetId !== undefined) {
      this.SubDatasetIdStorageClear();
      this.DatasetIdStorageClear();
      this._datasetService.GetDatasetById(this.CurrentDatasetId).subscribe(dataset => {
        if(dataset !== null && dataset !== undefined) {
          this.Dataset = new DataSet(dataset);
          this.DatasetIdStorageSet(this.CurrentDatasetId);
          this.getListSubDatasets(this.CurrentDatasetId)
        } else {
          this.Dataset = null;
          this.DatasetIdStorageSet(null);
          this.getListSubDatasets(null)
        }
      });
    }
    
  }

  createNewSubDataset() {
    let newName = this.NewSubdatasetName ? this.NewSubdatasetName : this.Dataset.name;
    this._subdatasetService.CreateSubDataset(this.Dataset.id, newName)
    .subscribe(() => this.getListSubDatasets(this.Dataset.id));
  }

  getListSubDatasets(dataset_id:number) {
    this.SubDatasets = null;
    this._subdatasetService.GetSubDatasetList(dataset_id).subscribe(subs => this.SubDatasets = subs);
  }

  selectSubDataset(subdataset_id:number, index: number) {
    this.CurrentSubDatasetId = subdataset_id;
    this.SubDatasetIdStorageSet(subdataset_id);
    this._subdatasetService.changeVisibleEditor.next(true);
    this._subdatasetService.currentSubdatasetName.next(this.SubDatasets[index].name);
    this._router.navigate( [ '/dataset_display/table' ] );
  }

  deleteSubDataset(subdataset_id) {
    this._subdatasetService.DeleteSubDataset(subdataset_id).subscribe(() => this.getListSubDatasets(this.Dataset.id));
  }

  private DatasetIdStorageSet(datasetId) {
    localStorage.setItem('dataset_id', JSON.stringify(datasetId));
  }

  private DatasetIdStorageGet() {
    return JSON.parse(localStorage.getItem('dataset_id'));
  }

  private DatasetIdStorageClear() {
    localStorage.setItem('dataset_id', JSON.stringify(""));
  }

  private SubDatasetIdStorageSet(datasetId) {
    localStorage.setItem('subdataset_id', JSON.stringify(datasetId));
  }

  private SubDatasetIdStorageGet() {
    return JSON.parse(localStorage.getItem('subdataset_id'));
  }

  private SubDatasetIdStorageClear() {
    localStorage.setItem('subdataset_id', JSON.stringify(""));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
