import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';

const CART_KEY = 'cartItems';

@Injectable()
export class CartProvider {

  constructor(public storage: Storage) {

  }


  surplusRef = firebase.database().ref('surplus');

  addToCart(product) {
    return this.getCartItems().then(result => {
      if (result) {
        if (!this.containsObject(product, result)) {
          result.push(product);
          return this.storage.set(CART_KEY, result);
        } else {
          let index = result.findIndex(x => x.product_id == product.product_id);
          let prevQuantity = parseInt(result[index].count);
          product.count = (prevQuantity + product.count);
          let currentPrice = (parseInt(product.totalPrice) * product.count);
          product.totalPrice = currentPrice;
          result.splice(index, 1);
          result.push(product);
          return this.storage.set(CART_KEY, result);
        }

      } else {
        return this.storage.set(CART_KEY, [product]);
      }
    })
  }

  addSurplus(surplusObj) {
    var promise = new Promise((resolve, reject) => {
      let surplusObject = {
        acceptStatus: 0,
        userId: surplusObj.userId,
        productName: surplusObj.name,
        qty: surplusObj.count,
        realQty: surplusObj.count,
        thumb: surplusObj.thumb,
        dateInserted: new Date().toLocaleDateString()
      };
      console.log('surplusObject :::', surplusObject);
      this.surplusRef.push(surplusObject).then(() => {
        resolve({ success: true });
      });
    });
    return promise;
  }

  removeFromCart(itm, cart) {
    return this.getCartItems().then(result => {
      if (result) {
        let index = cart.indexOf(itm);
        console.log('product :::', itm);
        console.log('result :::', cart);
        console.log('index :::', index);
        if (index > -1) {
          cart.splice(index, 1);
        }
        return this.storage.set(CART_KEY, cart);
      }
    })
  }

  removeAllCartItems() {
    return this.storage.remove(CART_KEY).then(res => {
      return res;
    });
  }


  containsObject(obj, list): boolean {
    if (!list.length) {
      return false;
    }

    if (obj == null) {
      return false;
    }
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].product_id == obj.product_id) {
        return true;
      }
    }
    return false;
  }



  getCartItems() {
    return this.storage.get(CART_KEY);
  }

}