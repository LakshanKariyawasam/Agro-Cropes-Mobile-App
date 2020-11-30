import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController, NavController, ToastController, IonicPage, LoadingController, Events, Platform } from "ionic-angular";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { UserData } from "../../providers/user-data";
import { AuthProvider } from "../../providers/auth/auth";
import { GMailService } from "../../services/email-service";
import { config } from '../../config/app.config';

declare var cordova;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [GMailService, FileOpener, FileTransfer, FileTransferObject, File]
})

export class LoginPage implements OnInit {
  signinform: FormGroup;
  userData = { "username": "", "password": "" };

  splash = true;
  public version = config.APP_VERSION2;
  public fileTransfer: FileTransferObject;
  public loginDeny = false;
  public updateButtonEnable: boolean = false;
  public alertStorageStatus: boolean = false;
  public storageStatus: boolean;

  constructor(public nav: NavController, public alertCtrl: AlertController, public menu: MenuController, private transfer: FileTransfer,
    public toastCtrl: ToastController, public userDataOne: UserData, public authService: AuthProvider, public platform: Platform,
    private loadingCtrl: LoadingController, public events: Events, public gmailService: GMailService, public file: File) {
    this.menu.swipeEnable(false);

    document.addEventListener("deviceready", function () {
      let me2 = this;

      cordova.plugins.diagnostic.registerLocationStateChangeHandler(function (state) {
        if (state != "location_off") {
          me2.alertStorageStatus = false;
        }

      });

      let me = this;

      setInterval(function () {
        cordova.plugins.diagnostic.requestExternalStorageAuthorization(function (enabled) {
          me.storageStatus = enabled;
          if (!enabled && !me.alertStorageStatus) {
            me.showAlert();
          } else {

          }
        }, function (error) {
          console.error("The following error occurred: " + error);
        });
      }, 2000);
    }, false);
  }


  ngOnInit() {
    this.signinform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.minLength(4), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    });
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Message!',
      subTitle: 'Please turn on your Storage Services',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'Turn on Storage Services',
        handler: data => {
          console.log('Saved clicked');
          this.callToSettings();
        }
      }]
    });
    alert.present();

    this.alertStorageStatus = true;
  }

  callToSettings() {
    let alt = this;
    cordova.plugins.diagnostic.switchToLocationSettings();

    setTimeout(function () { if (!alt.storageStatus) { alt.alertStorageStatus = false } }, 10000);
  }

  ionViewDidLoad() {
    localStorage.clear();
    console.log('ionViewDidLoad LoginPage');

    let me = this;
    this.splash = false;

    me.platform.ready().then(() => {

      this.fileTransfer = this.transfer.create();

      me.checkUpdates();

    });
  }

  // login and go to home page

  login() {
    window.localStorage.clear();
    let loader = this.loadingCtrl.create({
      content: 'Authenticating..'
    });
    loader.present();
    let loginParams = {
      email: this.userData.username,
      password: this.userData.password
    }


    this.authService.login(loginParams).then((res) => {
      if (res == false) {
        this.presentAlert("Your account is not activate, An activation link has been sent to your registered email");
        loader.dismiss();
      } else {
        loader.dismiss();
        this.authService.getuserdetails().then((res) => {
          window.localStorage.setItem('user', JSON.stringify(res));
          this.events.publish('user:login');
          // this.gmailService.sendMail('lakshandms@gmail.com', 'test', 'Hi lakshan kohomada');
          this.nav.setRoot('TabsPage', { tabIndex: 0 });
        })
      }
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
                duration: 1000,
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

  checkUpdates() {
    let me = this;
    let status;
    let No;
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please Wait...'
    });

    loading.present();

    this.authService.getupdatedetails(this.version).then((res) => {
      if (res != undefined && res[1].versionNo != this.version) {

        loading.dismiss();
        No = res[1].versionNo;
        status = res[1].status;
        localStorage.setItem('downloadLink', res[1].downloadLink);
        if (No != 0) {
          let alert = this.alertCtrl.create({
            title: 'Updates found!',
            message: 'Do you want to update application?',
            enableBackdropDismiss: false,
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {

                  if (status = "1") {
                    me.loginDeny = true;
                  }
                  this.updateButtonEnable = true;
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Update',
                handler: () => {
                  this.updateButtonEnable = false;
                  this.loginDeny = true;
                  let loadingUp = this.loadingCtrl.create({
                    spinner: 'bubbles',
                    content: 'Please Wait...'
                  });
                  console.log('Update clicked');



                  let url: string = res[1].downloadLink;

                  console.log("stri... ", url);

                  let fileName = url.split("/")[(url.split("/").length - 1)];

                  let path = me.file.externalRootDirectory + fileName;

                  console.log("path mobile ", path)
                  loadingUp.present();

                  console.log("file path... ", path);



                  me.fileTransfer.download(url, path, true).then((entry) => {
                    console.log('download complete: ' + entry.toURL());
                    loadingUp.dismiss();

                    let path2 = me.file.externalRootDirectory + fileName;

                    // cordova.plugins.FileOpener.openFile(cordova.file.externalRootDirectory + "" + fileName, "", "");

                    cordova.plugins.fileOpener2.open(
                      path2,
                      'application/vnd.android.package-archive'
                    );

                  }, (error) => {
                    // handle error

                    loadingUp.dismiss();

                    console.log("file download error..... ", error);

                  });

                }
              }
            ]
          });
          alert.present();
        }
      } else {
        loading.dismiss();
      }

    }).catch((err) => {
      loading.dismiss();
      this.presentAlert(err.message);
      // this.presentAlert('Email sent unsuccessfully, check your email address.')
    });
  }


  updateApp() {
    let urll = localStorage.getItem("downloadLink");
    console.log("Download link >>>", urll);

    let loadingUp = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please Wait...'
    });
    console.log('Update clicked');



    let url: string = urll;
    console.log("stri... ", url);

    let fileName = url.split("/")[(url.split("/").length - 1)];

    let path = this.file.externalRootDirectory + fileName;

    console.log("path mobile ", path)
    loadingUp.present();

    console.log("file path... ", path);



    this.fileTransfer.download(url, path, true).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      loadingUp.dismiss();

      let path2 = this.file.externalRootDirectory + fileName;

      // cordova.plugins.FileOpener.openFile(cordova.file.externalRootDirectory + "" + fileName, "", "");

      cordova.plugins.fileOpener2.open(
        path2,
        'application/vnd.android.package-archive'
      );

    }, (error) => {
      // handle error

      loadingUp.dismiss();

      console.log("file download error..... ", error);

    });

  }

}
