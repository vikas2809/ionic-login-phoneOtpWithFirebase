import { Component, ViewChild } from '@angular/core';
import { NavController, Navbar } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Navbar) navbar: Navbar;

  constructor(  public navCtrl: NavController,
                private storage: Storage) {
    // this.viewController.showBackButton(false);
    this.storage.get('token').then((data)=>{
      console.log(data)
    }).catch((error)=>{
      console.log(error);
    })
  }

  logout(){
      this.navCtrl.popToRoot();
      this.storage.remove('token').then((data)=>{
        console.log(data);
      }).catch((error)=>{
        console.log(error);
      });
  }

  ionViewWillEnter() {
    this.navbar.hideBackButton = true;
  }

}
