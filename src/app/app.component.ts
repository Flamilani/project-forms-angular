import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
import { BehaviorSubject, delay, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading$ = new BehaviorSubject(true);

  response$ = of('response').pipe(
    delay(0),
    tap(() => this.loading$.next(false)),
  );

  @ViewChild(ModalComponent) modal!: ModalComponent;
  modalVisible = false;

  openModal() {
    this.modal.openModal();
  }

  closeModal() {
    this.modalVisible = false;
  }

  title = 'project-forms';
  isApproveDisabled: boolean = true;
  isCancelDisabled: boolean = true;

  data = [
    { name: 'John Doe', age: 28, status: 'pendente' },
    { name: 'Jane Doe', age: 24, status: 'concluído' },
    { name: 'Sam Smith', age: 30, status: 'em cadastro' }
  ];

  selectedRows: any[] = [];

  ngOnInit(): void {
    this.handleApproveDisabled();
    this.handleCancelDisabled();
  }

  onSelectedRowsChange(selectedRows: any[]) {
    this.selectedRows = selectedRows;
    this.handleApproveDisabled();
    this.handleCancelDisabled();
  }

  private handleApproveDisabled() {
    this.isApproveDisabled = this.selectedRows.every(row => row.status === 'em cadastro' || row.status === 'pendente')
  }

  private handleCancelDisabled() {
    this.isCancelDisabled = this.selectedRows.every(row => row.status === 'em cadastro');
  }
}
