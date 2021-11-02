import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bom, PartHeader } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { GetNewPrtNoDialogComponent } from '../../dialogs/get-new-prt-no-dialog/get-new-prt-no-dialog.component';
import { PartNoSearchDialogComponent } from '../../dialogs/part-no-search-dialog/part-no-search-dialog.component';

@Component({
  selector: 'app-parts-form',
  templateUrl: './parts-form.component.html',
  styleUrls: ['./parts-form.component.scss']
})
export class PartsFormComponent implements OnInit {

  allCats: String[] = [];
  parts: PartHeader[] = [];
  partForSearch: string;

  public form: FormGroup = new FormGroup({
    part: new FormControl('', [Validators.required]),
    sku: new FormControl('', []),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    nonCalculatedPrice: new FormControl('', []),
    listPrice: new FormControl('', []),
    discountPercentage: new FormControl('', [])
  });

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.dataService.getPartCategories()
      .subscribe(cats => this.allCats = cats);
  }

  selectionChangeCategory(event: MatSelectChange) {
    const category = event.value;
    this.dataService.getPartsByCaterory(category)
      .subscribe(parts => {
        this.parts = parts
      })
  }

  getPartNoErrorMessage() {
    if (this.form.get('part')!.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  getSkuErrorMessage() {
    return '';
  }

  getDescriptionErrorMessage() {
    if (this.form.get('description')!.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  onNewPartBtnClick() {
    this.form.reset();
    const dialogRef = this.dialog.open(GetNewPrtNoDialogComponent, {
      width: '250px',
      data: { partNo: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.form.reset();
      this.form.patchValue({
        part: result.partNo
      });
    });
  }

  onSaveClick() {
    const bom: Bom = this.form.value;
    bom.discountPercentage /= 100;
    this.dataService.saveBom(bom).subscribe(res => {
      this._snackBar.open('Part saved', 'Close', { duration: 5000 });
    })
  }

  searchClick() {
    const dialogRef = this.dialog.open(PartNoSearchDialogComponent, {
      width: '600px',
      data: {
        parts: this.parts,
        partNo: this.partForSearch
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      const partNo = result.partNo;
      this.dataService.getPartByPartNo(partNo)
        .subscribe((part: Bom) => {
          part.discountPercentage *= 100;
          this.form.setValue(part);
        });
    });
  }
}
