import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatasetService } from 'src/app/services/dataset-service/dataset.service';
import { DataSet } from '../../models/dataset';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit, OnDestroy {

  public UploadedFile: string;
  public LastFileUploaded: string;
  public DatasetList: DataSet[] = []
  public CurrentEditDataset: DataSet;
  public File: any = null;
  public ShowDeleteConfirm: boolean = false;
  public DatasetToDelete: DataSet;
  public ShowUploadButton: boolean = false;
  private subscription: Subscription;

  constructor(private _datasetService: DatasetService) { }

  ngOnInit() {
    this.getDatasetList();
  }

  getDatasetList() {
    this.subscription = this._datasetService.GetListDataset().subscribe(data => {
      this.DatasetList = [];
      data.forEach(dataset => this.DatasetList.push(new DataSet(dataset)) );
      this.DatasetList.sort((a, b) => b.last_modified_date.getTime() - a.last_modified_date.getTime());
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.File = event.target.files[0];
      this.UploadedFile = this.File.name;
      this.ShowUploadButton=true;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.File);
    this._datasetService.UploadDatasetFile(formData).subscribe(
      data => {
        this.UploadedFile = data.file_name;
        this.LastFileUploaded = data.file_name;
        this.getDatasetList();
      }
    );
  }

  deleteDataset(id:number) {
    this._datasetService.DeleteDataset(id).subscribe(deletedName => {
      console.log(deletedName);
      this.getDatasetList();
    });
  }

  editDataset(id:number) {
    this.CurrentEditDataset = Object.assign({}, this.DatasetList.find(dataset => dataset.id === id));
  }

  isEditableName(id:number) {
    return this.CurrentEditDataset && this.CurrentEditDataset.id == id;
  }

  cancelEditDataset() {
    this.CurrentEditDataset = null;
    this.getDatasetList();
  }

  saveEditedDataset(dataset) {
      if(dataset.name !== this.CurrentEditDataset.name){
      this._datasetService.EditDataset(dataset).subscribe(newName => {
        console.log(newName);
        this.getDatasetList();
      })
    }
    this.CurrentEditDataset = null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
