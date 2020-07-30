import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";


@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  name: any;
  address: any;
  email: any;
  mobile: any;
  password: any;
  constructor(
    public navCtrl: NavController,
    public AuthService: AuthProvider
  ) {}

  ionViewDidLoad() {}

  register() {
    var userObj = {
      name: this.name,
      address: this.address,
      email: this.email,
      mobile: this.mobile,
      password: this.password,
      parentBisId: 520
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
