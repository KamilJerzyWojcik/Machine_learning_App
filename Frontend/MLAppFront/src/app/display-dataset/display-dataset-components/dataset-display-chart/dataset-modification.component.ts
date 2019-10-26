import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dataset-modification',
  templateUrl: './dataset-modification.component.html',
  styleUrls: ['./dataset-modification.component.css']
})
export class DatasetModificationComponent implements OnInit {

  private subDatasetId;

  constructor(private _router: Router) { }

  ngOnInit() {
    this.subDatasetId = this.SubDatasetIdStorageGet();
    if(this.subDatasetId == "") {
      this._router.navigate( [ '/dataset_display/datasets' ] );
    }
    console.log(this.subDatasetId);
  }

  private SubDatasetIdStorageGet() {
    return JSON.parse(localStorage.getItem('subdataset_id'));
  }

}
