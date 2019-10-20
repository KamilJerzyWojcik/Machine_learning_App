import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OPERATORS, SELF_OPERATORS } from '../../../models/operator';
import { DataModificationService } from 'src/app/services/data-modification-service/data-modification.service';

@Component({
  selector: 'app-create-column-form',
  templateUrl: './create-column-form.component.html',
  styleUrls: ['./create-column-form.component.css']
})
export class CreateColumnFormComponent implements OnInit {

  @Input() Head = [];
  @Input() SubdatasetId: number;
  @Output() cancel: EventEmitter<boolean> = new EventEmitter();

  public ShowInputParameter = false;

  public Operators = [];
  public SelfOperators = [];

  public CurrentSelfOperatorWithParameter = "";
  public CurrentOperationParameter: number = null;

  public SeletcedColumns: string[] = [];
  public Operation: string = null;
  public OperationParameter: number = null;

  constructor(private _dataModificationService: DataModificationService) { }

  ngOnInit() {
    this.Operators = OPERATORS;
    this.SelfOperators = SELF_OPERATORS;
  }

  addToSelectedColumn(column) {
    if (this.SeletcedColumns.indexOf(column) === -1) {
      if (this.Operation === null) {
        this.SeletcedColumns.push(column);
      }

      if (this.Operators.indexOf(this.Operation) !== -1 && this.SeletcedColumns.length < 2) {
        this.SeletcedColumns.push(column);
      }
      if (this.SelfOperators.indexOf(this.Operation) !== -1) {
        this.SeletcedColumns.push(column);
      }
    }
  }

  removeSelectedColumn(column) {
    let index = this.SeletcedColumns.indexOf(column);
    if (index !== -1) {
      this.SeletcedColumns.splice(index, 1);
    }
  }

  addOpertor(operator) {

    if (this.Operators.indexOf(operator) !== -1 && this.SeletcedColumns.length > 2) {
      let newCols = [this.SeletcedColumns[0], this.SeletcedColumns[1]];
      this.SeletcedColumns = newCols;
    }

    if (operator === "pow" && this.CurrentOperationParameter === null) {
      this.CurrentSelfOperatorWithParameter = operator;
      this.ShowInputParameter = true;
      return;
    }

    if (operator === "pow" && this.CurrentOperationParameter !== null) {
      this.Operation = this.CurrentSelfOperatorWithParameter;
      this.OperationParameter = this.CurrentOperationParameter;

      this.CurrentOperationParameter = null;
      this.CurrentSelfOperatorWithParameter = null;
      this.ShowInputParameter = false;
      return;
    }

    this.OperationParameter = null;
    this.Operation = operator;

  }

  selectAllColumns() {
    if (this.Operation == null || this.SelfOperators.indexOf(this.Operation) !== -1) {
      this.SeletcedColumns = this.Head;
    }
  }

  removeOperator() {
    this.Operation = null;
  }

  clearSelectedItems() {
    this.SeletcedColumns = [];
    this.Operation = null;
    this.OperationParameter = null;
  }

  cancelCreation() {
    this.cancel.emit(false);
  }

  createColumn() {
    this._dataModificationService.CreateNewColumn(this.SubdatasetId,
      this.SeletcedColumns,
      this.Operation,
      this.OperationParameter,
    ).subscribe(data => {
      console.log(data);
      this.cancelCreation();
    })
  }

  createIsVisible() {
    const result = 
      (this.SeletcedColumns.length == 2 && this.Operators.indexOf(this.Operation) !== -1) ||
      (this.SeletcedColumns.length > 0 && this.SelfOperators.indexOf(this.Operation) !== -1);

    return result;
  }
}
