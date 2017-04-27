import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class StorageService {

  constructor(public http: Http, public storage: Storage) {
  }

  getObject(key:any): Promise<any> {
  	// return null
  	return this.storage.get(key).then((val) => {
    	console.log(val);
    	return val ? JSON.parse(val) : null;
   	})
  }

  setObject(key, obj) {
    var str = JSON.stringify(obj);
    this.storage.set(key, str);
  }

}
