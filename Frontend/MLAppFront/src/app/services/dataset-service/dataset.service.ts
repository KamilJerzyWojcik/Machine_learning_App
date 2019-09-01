import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  private _uploadDataSetEndPoint = "dataset/upload_data";
  private _getListDataSetEndPoint = "dataset/get_list_dataset";
  private _deleteDatasetEndPoint = "dataset/delete_dataset";
  private _editDatasetEndPoint = "dataset/edit_dataset";
  private _getDatasetNamesPoint = "dataset/get_names_dataset";
  private _getDatasetByIdPoint = "dataset/get_dataset_by_id";



  constructor( private _httpClient: HttpClient ) { }

  GetDatasetById(id:number) {
    return this._httpClient.post<any>(environment.api + this._getDatasetByIdPoint, id);
  }

  GetDatasetNames() {
    return this._httpClient.get<any>(environment.api + this._getDatasetNamesPoint);
  }

  GetListDataset() {
    return this._httpClient.get<any>(environment.api + this._getListDataSetEndPoint);
  }

  UploadDatasetFile(file) {
    return this._httpClient.post<any>(environment.api + this._uploadDataSetEndPoint, file);
  }

  DeleteDataset(id:number) {
    return this._httpClient.post<number>(environment.api + this._deleteDatasetEndPoint, id);
  }

  EditDataset(dataset) {
    return this._httpClient.post<any>(environment.api + this._editDatasetEndPoint, dataset);
  }

}
