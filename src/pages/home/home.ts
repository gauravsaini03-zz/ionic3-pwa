import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CurrencyService } from '../../providers/currency-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	from:any = "USD";
	to:any = "INR";
	result:any;
	currencyList:Array<any>;

  constructor(public navCtrl: NavController, public currency: CurrencyService) {
  	this.currencyList = [
  		{
			  "name": "USD"
			}, {
			  "name": "AUD"
			}, {
			  "name": "BGN"
			}, {
			  "name": "BRL"
			}, {
			  "name": "CAD"
			}, {
			  "name": "CHF"
			}, {
			  "name": "CNY"
			}, {
			  "name": "CZK"
			}, {
			  "name": "DKK"
			}, {
			  "name": "GBP"
			}, {
			  "name": "HKD"
			}, {
			  "name": "HRK"
			}, {
			  "name": "HUF"
			}, {
			  "name": "IDR"
			}, {
			  "name": "ILS"
			}, {
			  "name": "INR"
			}, {
			  "name": "JPY"
			}, {
			  "name": "KRW"
			}, {
			  "name": "MXN"
			}, {
			  "name": "MYR"
			}, {
			  "name": "NOK"
			}, {
			  "name": "NZD"
			}, {
			  "name": "PHP"
			}, {
			  "name": "PLN"
			}, {
			  "name": "RON"
			}, {
			  "name": "RUB"
			}, {
			  "name": "SEK"
			}, {
			  "name": "SGD"
			}, {
			  "name": "THB"
			}, {
			  "name": "TRY"
			}, {
			  "name": "ZAR"
			}, {
			  "name": "EUR"
			}
		];
  }

  convert() {
  	this.currency.convert(this.from,this.to).then((val:any) => {
  		if(typeof val == "object") {
  			this.result = val.rates[this.to];
  		} else {
  			this.result = val;
  		}
  	});
  }
}
