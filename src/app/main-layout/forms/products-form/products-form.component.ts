import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Product, ProductHeader } from 'src/app/interfaces';
import { ProductService } from 'src/app/services/product.service';
import { ProductNoSearchDialogComponent } from '../../dialogs/product-no-search-dialog/product-no-search-dialog.component';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {

  allCats: String[] = [];
  products: ProductHeader[] = [];
  productForSearch: string;

  public form: FormGroup = new FormGroup({
    product: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
    category: new FormControl('', []),
    htmlLink: new FormControl('', []),
    subtotal: new FormControl(false, []),
    notes: new FormControl('', []),
    productListPrice: new FormControl('', [])
  })

  constructor(
    public productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.productService.getProductCategories()
      .subscribe(cats => this.allCats = cats);
  }

  selectionChangeCategory(event: MatSelectChange) {
    const category = event.value;
    this.productService.getProductsByCaterory(category)
      .subscribe(products => {
        this.products = products
        //console.log(this.products);
      })
  }

  searchClick() {
    const dialogRef = this.dialog.open(ProductNoSearchDialogComponent, {
      width: '600px',
      data: {
        products: this.products,
        prodNo: this.productForSearch
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      const productNo = result.productNo;
      console.log(productNo);
      this.productService.getProjectByProjectNo(productNo)
        .subscribe((product: Product) => {
          console.log(product);
          this.form.setValue({
            product: product.productNo,
            description: product.productDescription,
            category: product.category,
            htmlLink: product.htmlLink,
            subtotal: product.subtotal,
            notes: product.notes,
            productListPrice: product.productListPrice
          });
        })
    });

  }


}
