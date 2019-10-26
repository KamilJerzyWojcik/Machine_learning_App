import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  public statistics: Statisctics[];
  public head: string[] = [];
  public label: string;
  public oldLabel: string;
  private subscription: Subscription;
  public editMode = false;
  public visibleColumnNumber: number = 0;
  public maxColumnNumber: number = 0;

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

        if (this.statistics.length !== 0) {
          let index = 0

          for (let s of this.statistics) {
            index++;
            s.isVisible = false;
            if (index < 10 || s.name === this.label) {
              s.isVisible = true;
              this.visibleColumnNumber++;
            }
          }

          this.maxColumnNumber = index;

          for (let i of this.statistics[0].items) {
            this.head.push(i.name);
          }
        }
      });
  }

  setAsLabel(name: string) {
    this.label = name;
  }

  onEdit() {
    this.editMode = true;
    this.oldLabel = this.label;
  }

  onCancel() {
    this.label = this.oldLabel;
    this.oldLabel = '';
    this.editMode = false;
  }

  onSave() {
    this.editMode = false;
    this._statisticsSubdatasetsService.setLabel(this.subDatasetId, this.label).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


