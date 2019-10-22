import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticsSubdatasetsService } from 'src/app/services/statistics-subdataset-service/statistics-subdatasets.service';

@Component({
  selector: 'app-dataset-display-statistics',
  templateUrl: './dataset-display-statistics.component.html',
  styleUrls: ['./dataset-display-statistics.component.css']
})
export class DatasetDisplayStatisticsComponent implements OnInit {

  private subDatasetId: number;
  private statistics: any;

  constructor(private _router: Router, private _statisticsSubdatasetsService: StatisticsSubdatasetsService) { }

  ngOnInit() {
    const id = this.SubDatasetIdStorageGet();
    if(id == "") {
      this._router.navigate( [ '/dataset_display/datasets' ] );
    }
    this.subDatasetId = Number.parseInt(id);
    this.getStatistics();
  }

  private SubDatasetIdStorageGet() {
    return JSON.parse(localStorage.getItem('subdataset_id'));
  }

  private getStatistics() {
    this.statistics = this._statisticsSubdatasetsService
                        .getStatisticsById(this.subDatasetId)
                        .subscribe((result) => {
                          this.statistics = result;
                          console.log(this.statistics);
                        });
  }

}
