import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bom, PartHeader } from 'src/app/interfaces';
import { PartService } from 'src/app/services/part.service';
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
    public partService: PartService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.partService.getPartCategories()
      .subscribe(cats => this.allCats = cats);
  }

  selectionChangeCategory(event: MatSelectChange) {
    const category = event.value;
    this.partService.getPartsByCaterory(category)
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
      data: {
        isNonUsed: true,
        partNo: ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.form.reset();
      this.form.patchValue({
        part: result.partNo,
        category: this.allCats[0]
      });
    });
  }

  onSaveClick() {
    const bom: Bom = this.form.value;
    bom.discountPercentage /= 100;
    this.partService.saveBom(bom).subscribe(res => {
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
      this.partService.getPartByPartNo(partNo)
        .subscribe((part: Bom) => {
          part.discountPercentage *= 100;
          this.form.setValue(part);
        });
    });
  }
}
