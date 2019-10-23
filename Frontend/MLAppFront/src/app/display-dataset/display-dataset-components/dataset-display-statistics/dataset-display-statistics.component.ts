import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticsSubdatasetsService } from 'src/app/services/statistics-subdataset-service/statistics-subdatasets.service';
import { Statisctics } from './models/statisctics';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dataset-display-statistics',
  templateUrl: './dataset-display-statistics.component.html',
  styleUrls: ['./dataset-display-statistics.component.css']
})
export class DatasetDisplayStatisticsComponent implements OnInit, OnDestroy {

  private subDatasetId: number;
  private statistics: Statisctics[];
  private label: string;
  private subscription: Subscription;

  constructor(private _router: Router, private _statisticsSubdatasetsService: StatisticsSubdatasetsService) { }

  ngOnInit() {
    const id = this.SubDatasetIdStorageGet();
    if (id == "") {
      this._router.navigate(['/dataset_display/datasets']);
    }
    this.subDatasetId = Number.parseInt(id);
    this.getStatistics();
  }

  private SubDatasetIdStorageGet() {
    return JSON.parse(localStorage.getItem('subdataset_id'));
  }

  private getStatistics() {
    this.subscription = this._statisticsSubdatasetsService
      .getStatisticsById(this.subDatasetId)
      .subscribe((result) => {
        this.statistics = JSON.parse(result['data']) as Statisctics[];
        this.label = result['label']
        console.log(this.statistics);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


