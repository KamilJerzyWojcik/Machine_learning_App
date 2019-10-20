import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataModificationService {
  private _deleteColumnsEndPoint = "subdataset/delete_columns";
  private _createColumnsEndPoint = "subdataset/create_column";

  constructor(private _httpClient: HttpClient) { }

  DeleteColumns(columns: string[], id: number) {
    return this._httpClient.post<any>(environment.api + this._deleteColumnsEndPoint, { "id": id, "columns": columns });
  }

  CreateNewColumn(SubdatasetId: number,
    SeletcedColumns: string[],
    Operation: string,
    OperationParameter: number) {
    const data = {
      "id": SubdatasetId,
      "columns": SeletcedColumns,
      "operation": Operation,
      "parameter": OperationParameter
    }
    return this._httpClient.post<any>(environment.api + this._createColumnsEndPoint, data);
  }
}
