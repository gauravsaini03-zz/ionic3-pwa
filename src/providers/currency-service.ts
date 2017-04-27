import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { StorageService } from './storage-service';

@Injectable()
export class CurrencyService {

  constructor(public http: Http, public cache: StorageService) {
  }

  loadCurrencyList(base:String) {
  	return new Promise (resolve => {
  		let url = "https://api.fixer.io/latest?base=" + base;
  		this.http.get(url).map(res => res.json()).subscribe(data => {
	  		this.cache.setObject('base_'+ base, data);
	  		resolve(data);
	  	}, error => {
	  		resolve("Data not found");
  		})
  	})
  }

  convert(from,to) {
		return new Promise(resolve => {
  		this.http.get("https://api.fixer.io/latest?base=" + from + "&symbols=" + to).map(res => res.json()).subscribe(data => {
	  		resolve(data);
  		}, error => {
  			this.cache.getObject('base_'+ from).then((value) => {
	  			if(value) {
	  				resolve(value);
	  			} else {
		  			resolve("Data not found");
		  		}
	  		})
  		})
	  })
  }

}
