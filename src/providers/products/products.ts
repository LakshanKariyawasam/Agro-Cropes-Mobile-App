import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import firebase from 'firebase/app'

@Injectable()
export class ProductsProvider {
  promoRef = firebase.database().ref("promotions");
  productRef = firebase.database().ref("products");
  productReff = firebase.database().ref("fruits");
  photoRef = firebase.storage().ref();

  promos: Array<any> = [];
  products: Array<any> = [];
  fruits: Array<any> = [];
  constructor(public events: Events) {

  }

  getPromoSlider() {
    this.promoRef.once('value', (snap) => {
      console.log("In Value");
      console.log(snap);
      this.promos = [];
      if (snap.val()) {
        var tempPromo = snap.val();
        for (var key in tempPromo) {
          let singlePromo = {
            id: key,
            name: tempPromo[key].thumb
          };

          this.photoRef.child('sliders/' + singlePromo.name)
            .getDownloadURL().then(function (url) {
              singlePromo.name = url;
              console.log("url :: ", singlePromo.name)
            });

          this.promos.push(singlePromo);
        }
      }
      this.events.publish('promoLoaded');
    });
  }


  getProductByCategory(categoryId) {
    this.productRef.orderByChild('category_id').equalTo(categoryId).once('value', (snap) => {
      this.products = [];
      if (snap.val()) {
        var tempProducts = snap.val();
        for (var key in tempProducts) {
          let singleProduct = {
            id: key,
            category_id: tempProducts[key].category_id,
            name: tempProducts[key].name,
            images: tempProducts[key].images,
            price: tempProducts[key].price,
            rating: tempProducts[key].rating,
            sale_price: tempProducts[key].sale_price,
            short_description: tempProducts[key].short_description,
            thumb: tempProducts[key].thumb
          };
          this.products.push(singleProduct);
        }
      }
      this.events.publish('productsLoaded');
    })
  }

  getProductByCategoryy(categoryId) {
    this.productReff.orderByChild('category_id').equalTo(categoryId).once('value', (snap) => {
      this.fruits = [];
      if (snap.val()) {
        var tempProducts = snap.val();
        for (var key in tempProducts) {
          let singleProduct = {
            id: key,
            category_id: tempProducts[key].category_id,
            name: tempProducts[key].name,
            images: tempProducts[key].images,
            price: tempProducts[key].price,
            rating: tempProducts[key].rating,
            sale_price: tempProducts[key].sale_price,
            short_description: tempProducts[key].short_description,
            thumb: tempProducts[key].thumb
          };
          this.fruits.push(singleProduct);
        }
      }
      this.events.publish('productsLoaded');
    })
  }

  getProducts() {
    this.productRef.orderByChild('status').equalTo(1).once('value', (snap) => {
      console.log("In Value");
      console.log(snap);
      this.products = [];
      if (snap.val()) {
        var tempProducts = snap.val();
        for (var key in tempProducts) {
          let singleProduct = {
            id: key,
            category_id: tempProducts[key].category_id,
            name: tempProducts[key].name,
            images: tempProducts[key].images,
            price: tempProducts[key].price,
            rating: tempProducts[key].rating,
            sale_price: tempProducts[key].sale_price,
            short_description: tempProducts[key].short_description,
            thumb: tempProducts[key].thumb
          };

          this.photoRef.child('products/' + singleProduct.thumb)
            .getDownloadURL().then(function (url) {
              singleProduct.thumb = url;
              console.log("url :: ", singleProduct.thumb)
            });

          console.log("singleProduct :: ", singleProduct)
          this.products.push(singleProduct);
        }
      }
      this.events.publish('productsLoaded');
    });
  }

  getProductss() {
    this.productReff.orderByChild('status').equalTo(1).once('value', (snap) => {
      this.fruits = [];
      if (snap.val()) {
        var tempProducts = snap.val();
        for (var key in tempProducts) {
          let singleProduct = {
            id: key,
            category_id: tempProducts[key].category_id,
            name: tempProducts[key].name,
            images: tempProducts[key].images,
            price: tempProducts[key].price,
            rating: tempProducts[key].rating,
            sale_price: tempProducts[key].sale_price,
            short_description: tempProducts[key].short_description,
            thumb: tempProducts[key].thumb
          };

          this.photoRef.child('fruits/' + singleProduct.thumb)
            .getDownloadURL().then(function (url) {
              singleProduct.thumb = url;
            });

            this.fruits.push(singleProduct);
        }
      }
      this.events.publish('productsLoaded');
    });
}
}