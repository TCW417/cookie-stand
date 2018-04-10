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
    hourlyCustomers: function() {
      // return randum # of customers between
      // store's min and max values
      return Math.round(Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers);
    },
    simulateDailySales: function() {
      // for each hour of operation multiply avg cookies
      // per customer by random # of customers
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
    hourlyCustomers: function() {
      return Math.round(Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers);
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
    hourlyCustomers: function() {
      return Math.round(Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers);
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
    hourlyCustomers: function() {
      return Math.round(Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers);
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
    hourlyCustomers: function() {
      return Math.round(Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers);
    },
    simulateDailySales: function() {
      for (var i = 0; i < hoursLabels.length; i++) {
        this.hourlyCookiesSold.push(Math.round(this.avgCookiesPerCustomer * this.hourlyCustomers()));
      }
    }
  }
];

// Do the magic...
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

    //initialize store table heading with store name
    var h2Element = document.getElementById(storeH2Id);
    h2Element.textContent = store[i].name;

    //initialize daily total for this store
    var totalCookiesSold = 0;

    //get ul element with storeId
    var ulElement = document.getElementById(storeId);

    //for each hour of operation
    for (var j = 0; j < hoursLabels.length; j++) {
      //create a list item element
      var liElement = document.createElement('li');

      //give it content
      liElement.textContent = hoursLabels[j] + ': ' + store[i].hourlyCookiesSold[j] + ' cookies';
      console.log(liElement.textContent);

      //update daily total
      totalCookiesSold += store[i].hourlyCookiesSold[j];

      //add list item to html
      ulElement.appendChild(liElement);
    }

    //done with a store. add its sales to overall total
    allStoresTotalCookieSales += totalCookiesSold;

    // output daily total
    liElement = document.createElement('li');
    liElement.innerHTML = '<b>Total: ' + totalCookiesSold + ' cookies</b>';
    ulElement.appendChild(liElement);
  } // next store...

  //done with stores. some added info added to the page
  //Plug date stamp into html
  var el = document.getElementById('todaysDate');

  //get yestday's date (now - # milliseconds in a day)
  var yesterday = new Date(Date.now() - 24*60*60*1000);

  //convert it to a readable string
  var reportDate = yesterday.toLocaleString();

  //strip off time portion of date string
  reportDate = reportDate.slice(0, reportDate.indexOf(','));

  el.textContent = reportDate;

  //Add total store sales to bottom of report
  el = document.getElementById('allStoreSales');
  el.textContent = allStoresTotalCookieSales;
}