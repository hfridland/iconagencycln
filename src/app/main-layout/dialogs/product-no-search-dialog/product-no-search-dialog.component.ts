import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductHeader } from 'src/app/interfaces';

export interface ProductNoSearchDialogData {
  products: ProductHeader[];
  prodNo: string;
}


@Component({
  selector: 'app-product-no-search-dialog',
  templateUrl: './product-no-search-dialog.component.html',
  styleUrls: ['./product-no-search-dialog.component.scss']
})
export class ProductNoSearchDialogComponent implements OnInit {
  dataSource = new MatTableDataSource(this.data.products);
  displayedColumns: string[] = ['productno', 'description'];
  filterVal: string;
  selProduct: ProductHeader = {
    productNo: '',
    description: ''
  };

  constructor(public dialogRef: MatDialogRef<ProductNoSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductNoSearchDialogData) { }

  ngOnInit(): void {
    this.filterVal = this.data.prodNo;
    if (this.filterVal) {
      this.dataSource.filter = this.filterVal.trim().toLowerCase();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setSelProduct(row: ProductHeader) {
    this.selProduct = row;
  }

  onOk() {
    this.dialogRef.close(this.selProduct);
  }


}
