import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController, NavController, ToastController, IonicPage, LoadingController } from "ionic-angular";
import { UserData } from "../../providers/user-data";
import { AuthProvider } from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage implements OnInit {
  signinform: FormGroup;
  userData = { "username": "", "password": "" };

  constructor(public nav: NavController, public alertCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, public userDataOne: UserData, public authService: AuthProvider,
    private loadingCtrl: LoadingController) {
    this.menu.swipeEnable(false);
  }


  ngOnInit() {
    //let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    //  let password = this.signinform.get('password').value;
    //  let username = this.signinform.get('username').value;
    this.signinform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.minLength(4), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    });
  }

  // login and go to home page
  login() {
    let loader = this.loadingCtrl.create({
      content: 'Authenticating..'
    });
    loader.present();
    let loginParams = {
      email: this.userData.username,
      password: this.userData.password
    }

    this.authService.login(loginParams).then((res) => {
      loader.dismiss();
      this.nav.setRoot('TabsPage', { tabIndex: 0 });
    }).catch((err) => {
      loader.dismiss();
      this.presentAlert(err.message);
    });


  }

  showRegisterPage() {
    this.nav.push("RegisterPage");
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Auth Error',
      subTitle: message,
      buttons: ['Close']
    });
    alert.present();
  }

  forgotPass() {
    let forgot = this.alertCtrl.create({
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
            console.log('Send clicked', data);
            let loader = this.loadingCtrl.create({
              content: 'Authenticating..'
            });
            loader.present();

            this.authService.sendPasswordResetEmail(data.email).then((res) => {
              loader.dismiss();
              let toast = this.toastCtrl.create({
                message: 'Password reset email sent, check your inbox.',
                duration: 3000,
                position: 'top',
                cssClass: 'dark-trans',
                closeButtonText: 'OK',
                showCloseButton: true
              });
              toast.present();
            }).catch((err) => {
              loader.dismiss();
              // this.presentAlert(err.message);
              this.presentAlert('Email sent unsuccessfully, check your email address.')
            });
          }
        }
      ]
    });
    forgot.present();
  }

}
