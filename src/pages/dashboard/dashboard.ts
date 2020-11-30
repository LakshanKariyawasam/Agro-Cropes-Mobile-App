import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';

declare var google;

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  statusChange: any;
  user: any;
  todayAcceptOrderCount: number;
  todayRejectOrderCount: number;
  allAcceptOrderCount: number;
  allRejectOrderCount: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderProvider) {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.showTodaySales();
    this.statusChange = 'daily';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  ionViewWillEnter() {
    this.showTodaySales();
  }

  loadData() {
    console.log("1212212121")
    this.drawChart();
  }

  showTodaySales() {
    // new Date().toLocaleDateString()
    var valOne = 0;
    var valTwo = 0;
    var valThree = 0;
    var valFour = 0;
    this.orderService.getOrderDetailsCount(this.user.userId)
      .then(snap => {
        if (snap.val()) {
          var tempSurplusDetails = snap.val();
          for (var key in tempSurplusDetails) {
            if (tempSurplusDetails[key].acceptStatus == 1 && tempSurplusDetails[key].dateInserted == new Date().toLocaleDateString()) {
              valOne++;
            }
            if (tempSurplusDetails[key].acceptStatus == 0 && tempSurplusDetails[key].dateInserted == new Date().toLocaleDateString()) {
              valTwo++;
            }
            if (tempSurplusDetails[key].acceptStatus == 1) {
              valThree++;
            }
            if (tempSurplusDetails[key].acceptStatus == 0) {
              valFour++;
            }
          }
        }
        this.todayAcceptOrderCount = valOne;
        this.todayRejectOrderCount = valTwo;
        this.allAcceptOrderCount = valThree;
        this.allRejectOrderCount = valFour;

        // this.drawChart();
        // let progressbar = document.querySelector("#progressbar");

        // runProgress(progressbar, this.todaySalesCount);

        // function runProgress(progressbar, percent) {
        //   let progressFill = progressbar.querySelector(".progressbar__fill"),
        //     progressTitle = progressbar.querySelector(".progressbar__title"),
        //     radius = progressFill.r.baseVal.value,
        //     circumference = 2 * Math.PI * radius,
        //     offset = (circumference * (100 - percent)) / 100;

        //   if (percent != 0) {
        //     runCounter(progressTitle, percent);
        //   } else {
        //     progressTitle.innerHTML = 0 + "%";
        //   }

        //   setProgressbarInitialState(progressFill, circumference);
        //   setProgressbarFill(progressFill, offset);

        // }

        // function runCounter(elem, percent) {
        //   let counter = 1,
        //     time = 1000 / percent;

        //   let countId = setInterval(function () {
        //     count();
        //   }, time);

        //   function count() {
        //     counter++;
        //     elem.innerHTML = counter + "%";

        //     if (counter === percent) {
        //       clearInterval(countId);
        //     }
        //   }
        // }

        // function setProgressbarInitialState(elem, value) {
        //   elem.style.strokeDasharray = value;
        //   elem.style.strokeDashoffset = value;
        // }

        // function setProgressbarFill(elem, value) {
        //   setTimeout(() => (elem.style.strokeDashoffset = value), 100);
        // }

      });
  }

  drawChart() {
    setTimeout(() => {
      google.charts.load('current', { 'packages': ['corechart'] });

      var dataToday = google.visualization.arrayToDataTable([
        ['Orders', 'Amount given'],
        ['Accepted', this.todayAcceptOrderCount],
        ['Rejected', this.todayRejectOrderCount],
      ]);

      var dataAll = google.visualization.arrayToDataTable([
        ['Orders', 'Amount given'],
        ['Accepted', this.allAcceptOrderCount],
        ['Rejected', this.allRejectOrderCount],
      ]);


      var options = {
        pieHole: 0.6,
        pieSliceTextStyle: {
          color: 'black',
        },
        legend: 'none',
        width: 200,
        height: 150,
        fontSize: '14',
        sliceVisibilityThreshold :0,
        chartArea: { 'width': '100%', 'height': '100%' },
      };

      if (this.statusChange == 'daily') {
        var chartToday = new google.visualization.PieChart(document.getElementById('donut_today'));
        chartToday.draw(dataToday, options);
      } else {
        var chartAll = new google.visualization.PieChart(document.getElementById('donut_all'));
        chartAll.draw(dataAll, options);
      }
    }, 1000);
  }

}
