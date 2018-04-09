'use strict';
// Hours labels
var hoursLabels = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

// store objects:
var store = [
  {
    name: '1st and Pike',
    minCustomers: 23,
    maxCustomers: 65,
    avgCookiesPerCustomer: 6.3,
    hourlyCookiesSold: [],
    hourlyCustomers: function() { //range 0 to 100
      return Math.round(Math.random() * 100);
    },
    simulateDailySales: function() {
      for (var i = 0; i < hoursLabels.length; i++) {
        this.hourlyCookiesSold.push(Math.round(this.avgCookiesPerCustomer * this.hourlyCustomers()));
      }
    }
  },
  {
    name: 'SeaTac Airport',
    minCustomers: 3,
    maxCustomers: 24,
    avgCookiesPerCustomer: 1.2,
    hourlyCookiesSold: [],
    hourlyCustomers: function() { //range 0 to 100
      return Math.round(Math.random() * 100);
    },
    simulateDailySales: function() {
      for (var i = 0; i < hoursLabels.length; i++) {
        this.hourlyCookiesSold.push(Math.round(this.avgCookiesPerCustomer * this.hourlyCustomers()));
      }
    }
  },
  {
    name: 'Seattle Center',
    minCustomers: 11,
    maxCustomers: 38,
    avgCookiesPerCustomer: 3.7,
    hourlyCookiesSold: [],
    hourlyCustomers: function() { //range 0 to 100
      return Math.round(Math.random() * 100);
    },
    simulateDailySales: function() {
      for (var i = 0; i < hoursLabels.length; i++) {
        this.hourlyCookiesSold.push(Math.round(this.avgCookiesPerCustomer * this.hourlyCustomers()));
      }
    }
  },
  {
    name: 'Capital Hill',
    minCustomers: 20,
    maxCustomers: 38,
    avgCookiesPerCustomer: 2.3,
    hourlyCookiesSold: [],
    hourlyCustomers: function() { //range 0 to 100
      return Math.round(Math.random() * 100);
    },
    simulateDailySales: function() {
      for (var i = 0; i < hoursLabels.length; i++) {
        this.hourlyCookiesSold.push(Math.round(this.avgCookiesPerCustomer * this.hourlyCustomers()));
      }
    }
  },
  {
    name: 'Alki',
    minCustomers: 2,
    maxCustomers: 16,
    avgCookiesPerCustomer: 4.6,
    hourlyCookiesSold: [],
    hourlyCustomers: function() { //range 0 to 100
      return Math.round(Math.random() * 100);
    },
    simulateDailySales: function() {
      for (var i = 0; i < hoursLabels.length; i++) {
        this.hourlyCookiesSold.push(Math.round(this.avgCookiesPerCustomer * this.hourlyCustomers()));
      }
    }
  }
];

simulateStoreSales();
renderSalesResults();

//simulate sales for each store...
function simulateStoreSales() {
  for (var i = 0; i < store.length; i++) {
    store[i].simulateDailySales();
  }
  console.log(store);
}

// //output results for each store...
function renderSalesResults() {
  var allStoresTotalCookieSales = 0;
  for (var i = 0; i < store.length; i++) {
    //format id tag names
    var storeId = 'store'+i;
    var storeH2Id = 'h2'+storeId;
    console.log('id tags', storeH2Id, storeId);
    //initialize store heading
    var h2Element = document.getElementById(storeH2Id);
    h2Element.textContent = store[i].name;
    //initialize daily total
    var totalCookiesSold = 0;
    //get ul element with storeId
    var ulElement = document.getElementById(storeId);
    //for each hour of operation
    // var j = hoursLabels.length-1;
    console.log('hourslabels.length', hoursLabels.length);
    for (var j = 0; j < hoursLabels.length; j++) {
      var liElement = document.createElement('li');
      liElement.textContent = hoursLabels[j] + ': ' + store[i].hourlyCookiesSold[j] + ' cookies';
      console.log(liElement.textContent);
      totalCookiesSold += store[i].hourlyCookiesSold[j];
      ulElement.appendChild(liElement);
    }
    // capture total of all stores
    allStoresTotalCookieSales += totalCookiesSold;
    // output daily total
    liElement = document.createElement('li');
    liElement.textContent = 'Total: ' + totalCookiesSold + ' cookies';
    ulElement.appendChild(liElement);
  } // next store...

  //Plug date stamp into html
  var el = document.getElementById('todaysDate');
  var rightNow = new Date(Date.now()).toLocaleString();
  el.textContent = rightNow;

  //Add total store sales to bottom of report
  el = document.getElementById('allStoreSales');
  el.textContent = allStoresTotalCookieSales;
}