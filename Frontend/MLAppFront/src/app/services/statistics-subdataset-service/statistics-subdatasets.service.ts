import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsSubdatasetsService {

  private _statisticsSubdatasetByIdEndPoint = "statistic_subdataset/get_statistics_subdataset_by_id";

  constructor(private _httpClient: HttpClient ) { }

  getStatisticsById(id: number) {
    return this._httpClient.post<any>(environment.api + this._statisticsSubdatasetByIdEndPoint, id);
  }

}
