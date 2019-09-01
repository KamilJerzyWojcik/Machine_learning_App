import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubdatasetService {

  private _getListSubDataSetEndPoint = "subdataset/get_list_subdataset";
  private _createSubDataSetEndPoint = "subdataset/create_subdataset";
  private _deleteSubDataSetEndPoint = "subdataset/delete_subdataset";
  private _getSubDataSetByIdEndPoint = "subdataset/get_by_id_subdataset";
  private _getGetSubdatasetRowsByIdEndPoint = "subdataset/get_max_pages_by_id";


  constructor(private _httpClient: HttpClient ) { }

  GetSubDatasetList(dataset_id:number) {
    return this._httpClient.post<any>(environment.api + this._getListSubDataSetEndPoint, dataset_id);
  }

  CreateSubDataset(dataset_id:number, dataset_name:string) {
    console.log(dataset_id);
    console.log(dataset_name);

    return this._httpClient.post<any>(environment.api + this._createSubDataSetEndPoint, {dataset_id: dataset_id, dataset_name: dataset_name});
  }

  DeleteSubDataset(id:number) {
    return this._httpClient.post<number>(environment.api + this._deleteSubDataSetEndPoint, id);
  }

  GetSubdatasetById(sub_Id:number, page:number, page_size:number){
    return this._httpClient.post<any>(environment.api + this._getSubDataSetByIdEndPoint, {"id": sub_Id, "page": page, "page_size": page_size});
  }

  GetSubdatasetRowsById(sub_Id:number) {
    return this._httpClient.post<any>(environment.api + this._getGetSubdatasetRowsByIdEndPoint, {"id": sub_Id});    
  }

}
