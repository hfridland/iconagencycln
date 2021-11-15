import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Bom, PartHeader, Product, ProductHeader } from 'src/app/interfaces';
import { PartService } from 'src/app/services/part.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductForSave } from '../../../interfaces';
import { GetNewProductNoDialogComponent } from '../../dialogs/get-new-product-no-dialog/get-new-product-no-dialog.component';
import { GetNewPrtNoDialogComponent } from '../../dialogs/get-new-prt-no-dialog/get-new-prt-no-dialog.component';
import { PartNoSearchDialogComponent } from '../../dialogs/part-no-search-dialog/part-no-search-dialog.component';
import { ProductNoSearchDialogComponent } from '../../dialogs/product-no-search-dialog/product-no-search-dialog.component';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit, AfterViewInit {

  allCats: String[] = [];
  products: ProductHeader[] = [];
  productForSearch: string;
  dataSource = new MatTableDataSource<Bom>();
  displayedColumns: string[] = ['partno', 'sku', 'description', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Bom>;
  parts: PartHeader[] = [];

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
    public partService: PartService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.productService.getProductCategories()
      .subscribe(cats => this.allCats = cats);
  }

  selectionChangeCategory(event: MatSelectChange) {
    const category = event.value;
    this.productService.getProductsByCaterory(category)
      .subscribe(products => {
        this.products = products

        this.partService.getPartsByCaterory(category)
          .subscribe(parts => {
            this.parts = parts
          })

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
      this.productService.getProjectByProjectNo(productNo)
        .subscribe((product: Product) => {
          this.form.setValue({
            product: product.productNo,
            description: product.productDescription,
            category: product.category,
            htmlLink: product.htmlLink,
            subtotal: product.subtotal,
            notes: product.notes,
            productListPrice: product.productListPrice
          });
          this.dataSource.data = product.parts;
        })
    });

  }

  removePart(part: string) {
    this.dataSource.data = this.dataSource.data.filter(p => p.part !== part);
  }

  addPart() {
    const dialogRef = this.dialog.open(PartNoSearchDialogComponent, {
      width: '600px',
      data: {
        parts: this.parts,
        partNo: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      const partNo = result.partNo;
      this.partService.getPartByPartNo(partNo)
        .subscribe(part => {
          const data: Bom[] = this.dataSource.data;
          data.push(part);
          this.dataSource.data = data;
        });
    });

  }

  onNewProductBtnClick() {
    this.form.reset();
    const dialogRef = this.dialog.open(GetNewProductNoDialogComponent, {
      width: '250px',
      data: {
        productNo: ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.form.reset();
      this.form.patchValue({
        product: result.productNo,
        category: this.allCats[0]
      });
      this.dataSource.data = [];
    });

  }

  onSaveClick() {
    const product: ProductForSave = {
      ...this.form.value,
      parts: this.dataSource.data.map(p => p.part)
    }
    this.productService.saveProduct(product)
      .subscribe(p => this._snackBar.open('Project saved', 'Close', { duration: 5000 }));
  }

}
