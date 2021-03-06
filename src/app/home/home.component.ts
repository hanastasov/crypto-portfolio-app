import { Component, OnInit, NgModule, ViewChild } from '@angular/core';


import { DataService } from '../data.service';
import { IgxFilterOptions } from 'igniteui-angular';
import { resolveDefinition } from '@angular/core/src/view/util';
import { Router } from '@angular/router';
import { flyInOut } from '../router.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [flyInOut()]
})
export class HomeComponent implements OnInit {
  objectKeys = Object.keys;
  cryptos: any;
  public search1: string;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  get filterOptions() {
    const fo = new IgxFilterOptions();
    fo.key = 'name';
    fo.inputValue = this.search1 ? this.search1 : '';
    return fo;
  }

  private getData() {
    this.data.getData()
      .subscribe(res => {
        this.cryptos = this.data.sortDataByKey(res, 'rank');
      });
  }

  public clear(input) {
    input.value = '';
    this.getData();
  }

  public openChart(evt, symbol) {
    this.router.navigate(['/statistics', { text: 'Volatility', iconName: 'show_chart', cryptoName: symbol, daysCount: 100 }]);
  }
}
