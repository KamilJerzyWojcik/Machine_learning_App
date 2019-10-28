import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataModificationService {
  private _deleteColumnsEndPoint = "subdataset/delete_columns";
  private _createColumnsEndPoint = "subdataset/create_column";
  private _getColumnsWithMissedValuesByIdEndPoint = "subdataset_modification/get_columns_with_missed_values";
  private _deleteRowsWithMissedValuesByIdEndPoint = "subdataset_modification/delete_rows_with_missed_values";
  private _fillMissedDataByMedianByIdEndPoint = "subdataset_modification/fill_missed_data_by_median";
  private _applyImputerToFillMissedValuesEndPoint = "subdataset_modification/apply_imputer_to_fill_missed_values";
  private _DeleteOneColumnByNameEndPoint = "subdataset_modification/delete_one_column_by_name";

  constructor(private _httpClient: HttpClient) { }

  DeleteColumns(columns: string[], id: number) {
    return this._httpClient.post<any>(environment.api + this._deleteColumnsEndPoint, { "id": id, "columns": columns });
  }

  DeleteOneColumnByName(column: string, id: number) {
    return this._httpClient.post<any>(environment.api + this._DeleteOneColumnByNameEndPoint, { "id": id, "column": column });
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

  GetColumnsWithMissedValuesById(id: number) {
    return this._httpClient.post<any>(environment.api + this._getColumnsWithMissedValuesByIdEndPoint, id);
  }

  DeleteRowsWithMissedValuesById(id: number, column: string) {
    return this._httpClient.post<any>(environment.api + this._deleteRowsWithMissedValuesByIdEndPoint, {id, column});
  }

  FillMissedDataByMedianById(id: number, column: string) {
    return this._httpClient.post<any>(environment.api + this._fillMissedDataByMedianByIdEndPoint, {id, column});
  }

  ApplyImputerToFillMissedValues(id: number) {
    return this._httpClient.post<any>(environment.api + this._applyImputerToFillMissedValuesEndPoint, id);
  }
}
