import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PartHeader } from 'src/app/interfaces';

export interface PartNoSearchDialogData {
  parts: PartHeader[];
  partNo: string;
}

@Component({
  selector: 'app-part-no-search-dialog',
  templateUrl: './part-no-search-dialog.component.html',
  styleUrls: ['./part-no-search-dialog.component.scss']
})
export class PartNoSearchDialogComponent implements OnInit {
  dataSource = new MatTableDataSource(this.data.parts);
  displayedColumns: string[] = ['partno', 'description'];
  filterVal: string;
  selPart: PartHeader = {
    partNo: '',
    sku: '',
    description: ''
  };

  constructor(
    public dialogRef: MatDialogRef<PartNoSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PartNoSearchDialogData) { }

  ngOnInit(): void {
    this.filterVal = this.data.partNo;
    if (this.filterVal) {
      this.dataSource.filter = this.filterVal.trim().toLowerCase();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setSelPart(row: PartHeader) {
    this.selPart = row;
  }

  onOk() {
    this.dialogRef.close(this.selPart);
  }
}
