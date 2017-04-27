import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { CurrencyService } from '../providers/currency-service';

declare var Notification: any;

@Component({
  templateUrl: 'app.html'
})
export class IonicPWA {
  rootPage = 'TabsPage';

  constructor(
    platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    currency: CurrencyService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    
    Notification.requestPermission().then(function(result) {
      if (result === 'denied') {
        console.log('Permission wasn\'t granted. Allow a retry.');
        return;
      }
      if (result === 'default') {
        console.log('The permission request was dismissed.');
        return;
      }
    });

    // load intital data for the application
    currency.loadCurrencyList("USD");
  }
}
