import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartService } from 'src/app/services/part.service';

export interface PartNoDialogData {
  partNo: string;
}

@Component({
  selector: 'app-get-new-prt-no-dialog',
  templateUrl: './get-new-prt-no-dialog.component.html',
  styleUrls: ['./get-new-prt-no-dialog.component.scss']
})
export class GetNewPrtNoDialogComponent implements OnInit {
  error: string = '';

  constructor(
    public dialogRef: MatDialogRef<GetNewPrtNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PartNoDialogData,
    private partService: PartService
  ) { }

  ngOnInit(): void {
  }

  onOk() {
    if (this.data.partNo === '') {
      this.error = 'Part No cannot be empty';
      return;
    }

    this.partService.isPartNoInUse(this.data.partNo)
      .subscribe(res => {
        if (res) {
          this.error = 'This Part No is Use';
        } else {
          this.dialogRef.close(this.data);
        }
      });

  }

}
