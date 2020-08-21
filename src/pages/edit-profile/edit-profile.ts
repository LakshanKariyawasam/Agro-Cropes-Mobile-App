import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Profile } from '../../app/models/profile';
import { Reference, ThenableReference } from 'firebase/database'; 

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export default class EditProfilePage {

  profile ={} as Profile;
  employeeList: any[];

  constructor(public adminProvider: AuthProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }
  createProfile(){
    
    
  }
  ionViewDidLoad() {
    this.adminProvider.getEmployeeList().on('value', employeeListSnapshot => {
      this.employeeList = [];
      employeeListSnapshot.forEach(snap => {
        this.employeeList.push({
          id: snap.key,
          address: snap.val().address,
          email: snap.val().email,
          mobile: snap.val().mobile,
          name: snap.val().name,
        });
        return false;
      });
    });     
  }
  

  goToEmployeeDetail(userId): void {
    this.navCtrl.push('EditProfilePage', { employeeId: userId });
  }

}