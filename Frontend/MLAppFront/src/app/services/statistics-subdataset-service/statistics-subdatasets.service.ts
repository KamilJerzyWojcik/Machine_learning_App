import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsSubdatasetsService {

  private _statisticsDescriptionSubdatasetByIdEndPoint = "statistic_subdataset/get_description_subdataset_by_id";
  private _statisticsSetLabelEndPoint = "statistic_subdataset/set_label_subdataset";
  private _statisticsInfoSubdatasetByIdEndPoint = "statistic_subdataset/create_report_subdataset_by_id";

  constructor(private _httpClient: HttpClient ) { }

  getStatisticsDescriptionById(id: number) {
    return this._httpClient.post<any>(environment.api + this._statisticsDescriptionSubdatasetByIdEndPoint, id);
  }

  setLabel(id: number, name: string) {
    return this._httpClient.post<any>(environment.api + this._statisticsSetLabelEndPoint, {id, name});
  }

  getgetStatisticsInfoById(id: number) {
    return this._httpClient.post<any>(environment.api + this._statisticsInfoSubdatasetByIdEndPoint, id);
  }

}
