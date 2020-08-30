import { Component } from "@angular/core";
import { IonicPage, NavController, MenuController, LoadingController, AlertController, ToastController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserProvider } from "../../providers/user/user";


@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})

export class RegisterPage {
  signupform: FormGroup;
  pic: any;
  name: any;
  address: any;
  trade: any;
  email: any;
  mobile: any;
  password: any;
  constructor(
    public navCtrl: NavController,
    public AuthService: AuthProvider,
    public menu: MenuController,
    private loadingCtrl: LoadingController,
    private UserService: UserProvider, public alertCtrl: AlertController, public toastCtrl: ToastController
  ) {
    this.menu.swipeEnable(false);
  }

  ngOnInit() {
    //let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    //  let password = this.signupform.get('password').value;
    //  let username = this.signupform.get('username').value;
    this.signupform = new FormGroup({
      pic: new FormControl(),
      name: new FormControl(),
      address: new FormControl(),
      // trade: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.minLength(4), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      // mobile: new FormControl(),
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^([9]{1})([234789]{1})([0-9]{9})$/), Validators.minLength(11), Validators.maxLength(11)])
    });
  }

  ionViewDidLoad() { }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Auth Error',
      subTitle: message,
      buttons: ['Close']
    });
    alert.present();
  }

  register() {
    let val;
    this.UserService.getwtcRef().then(function (value) {
      val = value;
    });

    let alertOne = this.alertCtrl.create({
      title: 'Register WTC',
      message: 'Enter varification code for proceed with as a WTC',
      inputs: [
        {
          name: 'varification',
          placeholder: 'Varification Code'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (data.varification == val) {
              let loader = this.loadingCtrl.create({
                content: 'Registering..'
              });
              loader.present();

              var userObj = {
                name: this.name,
                address: this.address,
                // trade:this.trade,
                email: this.email,
                mobile: this.mobile,
                password: this.password,
                bisTypeId: 2,
                perentBisId: 'Psm5CnqpX8UQ70aeWhCZwwfNnW03'
              };
              loader.dismiss();
              // var picture = this.pic;
              // picURL.picture.upload(picture, "my-folder")
              //   .then(function (fileURL) {
              //     console.log("File successfully uploaded. Path to download: " + fileURL.fileURL);
              //     picURL = fileURL.fileURL;
              //   })
              // picURL.picture = picURL;


              this.AuthService.registerUser(userObj)
                .then((response: any) => {
                  if (response.success == true) {
                    // this.navCtrl.setRoot('TabsPage', { tabIndex: 0 });
                    this.showLoginPage();
                    loader.dismiss();
                  }
                })
                .catch(err => {
                  alert(JSON.stringify(err));
                });
            } else {
              this.presentAlert('Make Sure Varification Code is correct.')
              return false;
            }
          }
        }
      ]
    });
    alertOne.present();
  }

  showLoginPage() {
    this.navCtrl.setRoot("LoginPage");
  }
}
