import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: any[] = [];
  @Output() selectedRowsChange = new EventEmitter<any[]>();

  selectedRows: any[] = [];

  onCheckboxChange(row: any, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedRows.push(row);
    } else {
      this.selectedRows = this.selectedRows.filter(item => item !== row);
    }
    this.selectedRowsChange.emit(this.selectedRows);
  }
}
