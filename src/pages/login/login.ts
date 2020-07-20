import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController, NavController, ToastController, IonicPage } from "ionic-angular";
import { UserData } from "../../providers/user-data";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage implements OnInit {
  signupform: FormGroup;
  userData = { "username": "", "password": "" };

  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, public userDataOne: UserData) {
    this.menu.swipeEnable(false);
  }


  ngOnInit() {
    //let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    //  let password = this.signupform.get('password').value;
    //  let username = this.signupform.get('username').value;
    this.signupform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    });
  }

  // go to register page
  register() {
    this.nav.setRoot('RegisterPage');
  }

  // login and go to home page
  login() {
    if (this.userData.username == "admin" && this.userData.password == "admin123") {
      this.nav.setRoot('TabsPage', { tabIndex: 0 });
      this.userDataOne.login(this.userData.username);
    }
    else {
      const toast = this.toastCtrl.create({
        message: 'Username or Password incorrect.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot('LoginPage');
    }
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
