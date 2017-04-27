import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IonicPWA } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from '../providers/storage-service';
import { CurrencyService } from '../providers/currency-service';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

@NgModule({
  declarations: [
    IonicPWA
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(IonicPWA),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp ],
  entryComponents: [
    IonicPWA
  ],
  providers: [
    SplashScreen,
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, StorageService, CurrencyService]
})
export class AppModule {}
