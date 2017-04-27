import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrencyService } from '../../providers/currency-service';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

	baseCurrency:any = "USD";
	currencyList:any;
	queryText:'';

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public currency: CurrencyService) {

  	currency.loadCurrencyList(this.baseCurrency).then(val => {
  		this.processData(val)
  	});

  }

  processData(data:any) {
  	console.log(data);
  	let rates = data.rates;
  	let arr = [];
  	for (var key in rates) {
		  if (rates.hasOwnProperty(key)) {
		      arr.push({'name':key,'price':rates[key]});
		  }
		};
		this.currencyList = arr;
  }

  setBaseCurrency() {
  	this.currency.loadCurrencyList(this.baseCurrency).then(val => {
      if(typeof val == "object") {
        this.processData(val)
      } else {
        alert(val);
      }
  	});
  }
}
