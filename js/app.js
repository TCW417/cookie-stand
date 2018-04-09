'use strict';
// Hours labels
var hoursLabels = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];

// store objects:
var store = [
  {
    name: '1st and Pike',
    minCustomers: 23,
    maxCustomers: 65,
    avgCookiesPerCustomer: 6.3,
    hourlyCookiesSold: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    hourlyCustomers: function() { //range 0 to 100
      return Math.round(Math.random() * 100);
    },
    simulateDailySales: function() {
      for (var i = 0; i < this.hourlyCookiesSold.length; i++) {
        this.hourlyCookiesSold[i] = Math.round(this.avgCookiesPerCustomer * this.hourlyCustomers());
      }
    }
  }
];

//for each store...
store[0].simulateDailySales();
console.log(store[0].name,store[0].hourlyCookiesSold);

var i = 0; //this is where the store loop will go
//format id tag names
var storeId = 'store'+i;
var storeH2Id = 'h2'+storeId;
//initialize store heading
var h2Element = document.getElementById(storeH2Id);
h2Element.textContent = store[0].name;
//initialize daily total
var totalCookiesSold = 0;
//get ul element with storeId
var ulElement = document.getElementById(storeId);
//for each hour of operation
for (i = 0; i < store[0].hourlyCookiesSold.length; i++) {
  var liElement = document.createElement('li');
  liElement.textContent = hoursLabels[i] + ': ' + store[0].hourlyCookiesSold[i] + ' cookies';
  totalCookiesSold += store[0].hourlyCookiesSold[i];
  ulElement.appendChild(liElement);
}
// output daily total
liElement = document.createElement('li');
liElement.textContent = 'Total: ' + totalCookiesSold + ' cookies';
ulElement.appendChild(liElement);
// next store...

