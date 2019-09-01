import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dataset-display',
  templateUrl: './dataset-display.component.html',
  styleUrls: ['./dataset-display.component.css']
})
export class DatasetDisplayComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate( [ '/dataset_display/datasets' ] );
  }
}
