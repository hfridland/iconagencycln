import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

export interface ProductNoDialogData {
  productNo: string;
}


@Component({
  selector: 'app-get-new-product-no-dialog',
  templateUrl: './get-new-product-no-dialog.component.html',
  styleUrls: ['./get-new-product-no-dialog.component.scss']
})
export class GetNewProductNoDialogComponent implements OnInit {
  error: string = '';

  constructor(
    public dialogRef: MatDialogRef<GetNewProductNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductNoDialogData,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  onOk() {
    if (this.data.productNo === '') {
      this.error = 'Product No cannot be empty';
      return;
    }
    this.productService.isProductInUse(this.data.productNo)
      .subscribe(res => {
        if (res) {
          this.error = 'This Product Exists';
        } else {
          this.dialogRef.close(this.data);
        }
      });
  }

}
