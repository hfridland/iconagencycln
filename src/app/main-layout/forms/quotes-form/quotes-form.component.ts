import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quotes-form',
  templateUrl: './quotes-form.component.html',
  styleUrls: ['./quotes-form.component.scss']
})
export class QuotesFormComponent implements OnInit {
  repToken: string = '';


  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  onGetReportClick() {
    this.reportService.getQuoteWithoutSDPriceReport('652')
    /*.subscribe(token => {
      console.log(token);
      //this.repToken = token;
    })*/
  }

  getRepUri() {
    const ret = `${environment.srvHost}api/report/QuoteWithoutSDPrice/${this.repToken}`;
    console.log(ret)
    return ret;
  }

}
