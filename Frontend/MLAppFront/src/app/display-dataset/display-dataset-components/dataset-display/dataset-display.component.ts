import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubdatasetService } from 'src/app/services/subdataset-service/subdataset.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dataset-display',
  templateUrl: './dataset-display.component.html',
  styleUrls: ['./dataset-display.component.css']
})
export class DatasetDisplayComponent implements OnInit, OnDestroy {

  isVisible: boolean = false;
  subscription: Subscription;
  subscriptionName: Subscription;
  currentSubdatasetName: string;

  constructor(private router: Router, private _subdatasetService: SubdatasetService) { }

  ngOnInit() {
    this.router.navigate( [ '/dataset_display/datasets' ] );
    this.subscription = this._subdatasetService.changeVisibleEditor.subscribe((v) => {
      this.isVisible = v;
    })

    this.subscriptionName = this._subdatasetService.currentSubdatasetName.subscribe((name) => {
      this.currentSubdatasetName = name;
    });
  }

  onManageDataset() {
    this.isVisible = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
