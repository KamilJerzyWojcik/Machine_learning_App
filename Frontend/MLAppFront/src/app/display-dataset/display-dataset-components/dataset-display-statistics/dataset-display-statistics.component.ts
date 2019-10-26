import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StatisticsSubdatasetsService } from 'src/app/services/statistics-subdataset-service/statistics-subdatasets.service';
import { DescriptionStatisctics } from './models/description-statisctics';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dataset-display-statistics',
  templateUrl: './dataset-display-statistics.component.html',
  styleUrls: ['./dataset-display-statistics.component.css']
})
export class DatasetDisplayStatisticsComponent implements OnInit, OnDestroy {

  private subDatasetId: number;
  public descriptionStatistics: DescriptionStatisctics[];
  public head: string[] = [];
  public label: string;
  public oldLabel: string;
  private subscription: Subscription;
  private infoSubscription: Subscription;
  public editMode = false;
  public visibleColumnNumber: number = 0;
  public maxColumnNumber: number = 0;
  public spinnerVisible: boolean = false;
  public report: string;
  public reportUrl: string;

  constructor(private _router: Router, private _statisticsSubdatasetsService: StatisticsSubdatasetsService) { }

  ngOnInit() {
    const id = this.SubDatasetIdStorageGet();
    if (id == "") {
      this._router.navigate(['/dataset_display/datasets']);
    }
    this.subDatasetId = Number.parseInt(id);
    this.getDescriptionStatistics();
  }

  private SubDatasetIdStorageGet() {
    return JSON.parse(localStorage.getItem('subdataset_id'));
  }

  private getDescriptionStatistics() {
    this.subscription = this._statisticsSubdatasetsService
      .getStatisticsDescriptionById(this.subDatasetId)
      .subscribe((result) => {
        this.descriptionStatistics = JSON.parse(result['data']) as DescriptionStatisctics[];
        this.label = result['label'];
        this.reportUrl = result['raport_url'];

        if (this.descriptionStatistics.length !== 0) {
          let index = 0;

          for (let s of this.descriptionStatistics) {
            index++;
            s.isVisible = false;
            s.isVisible = true;
            this.visibleColumnNumber++;
          }

          this.maxColumnNumber = index;

          for (let i of this.descriptionStatistics[0].items) {
            this.head.push(i.name);
          }
        }
      });
  }

  public getReportStatistics() {
    this.spinnerVisible = true;
    this.infoSubscription = this._statisticsSubdatasetsService
      .getgetStatisticsInfoById(this.subDatasetId)
      .subscribe((data) => {
        this.spinnerVisible = false;
        this.reportUrl = data.urlReport;
      },
        (error) => {
          console.log(error);
          this.spinnerVisible = false;
        });
  }

  public openReportStatistics() {
    window.open(`http://127.0.0.1:8000/statistic_subdataset/report/${this.reportUrl}`, "_blank");
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


