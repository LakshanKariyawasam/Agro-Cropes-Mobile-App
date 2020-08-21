import { Component } from "@angular/core";
import { IonicPage, NavController, MenuController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { FormGroup, FormControl, Validators } from "@angular/forms";


@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  signupform: FormGroup;
  name: any;
  address: any;
  email: any;
  mobile: any;
  password: any;
  constructor(
    public navCtrl: NavController,
    public AuthService: AuthProvider,
    public menu: MenuController
  ) {
    this.menu.swipeEnable(false);
  }

  ngOnInit() {
    //let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    //  let password = this.signupform.get('password').value;
    //  let username = this.signupform.get('username').value;
    this.signupform = new FormGroup({
      name: new FormControl(),
      address: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.minLength(4), Validators.maxLength(15)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^([9]{1})([234789]{1})([0-9]{8})$/), Validators.minLength(11), Validators.maxLength(11)])
    });
  }

  ionViewDidLoad() { }

  register() {
    var userObj = {
      name: this.name,
      address: this.address,
      email: this.email,
      mobile: this.mobile,
      password: this.password
    };

    this.AuthService.registerUser(userObj)
      .then((response: any) => {
        if (response.success == true) {
          this.navCtrl.setRoot('TabsPage', { tabIndex: 0 });
        }
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  }

  showLoginPage() {
    this.navCtrl.push("LoginPage");
  }
}
