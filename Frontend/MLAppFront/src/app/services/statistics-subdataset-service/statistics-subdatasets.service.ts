import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsSubdatasetsService {

  private _statisticsSubdatasetByIdEndPoint = "statistic_subdataset/get_description_subdataset_by_id";
  private _statisticsSetLabelEndPoint = "statistic_subdataset/set_label_subdataset";

  constructor(private _httpClient: HttpClient ) { }

  getStatisticsById(id: number) {
    return this._httpClient.post<any>(environment.api + this._statisticsSubdatasetByIdEndPoint, id);
  }

  setLabel(id: number, name: string) {
    return this._httpClient.post<any>(environment.api + this._statisticsSetLabelEndPoint, {id, name});
  }

}
