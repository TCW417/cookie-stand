'use strict';
// GLOBALS...
// Hours labels
var hoursLabels = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

// Store array of CookieStore objects
var store = [];

// Sum of sales for all stores.
var allStoresTotalCookieSales;

// CookieStore constructor and methods:
function CookieStore(name, minCustomers, maxCustomers, avgCookiesPerCustomer) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.hourlyCookiesSold = [];
  this.h2Element; //reference to store's heading for ul
  this.ulElement; //reference to store's unordered list
  this.simulateDailySales(); // fill hourlyCookiesSold with simulated data
}
CookieStore.prototype.hourlyCustomers = function() {
  // return randum # of customers between
  // store's min and max values
  return Math.round(Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers);
};
CookieStore.prototype.simulateDailySales = function() {
  // for each hour of operation multiply avg cookies
  // per customer by random # of customers
  for (var i = 0; i < hoursLabels.length; i++) {
    this.hourlyCookiesSold.push(Math.round(this.avgCookiesPerCustomer * this.hourlyCustomers()));
  }
};
CookieStore.prototype.renderStoreHourlySales = function() {
  var totalCookiesSold = 0;
  //initialize store table heading with store name
  this.h2Element.textContent = this.name;
  //for each hour of operation
  for (var j = 0; j < hoursLabels.length; j++) {
    //create a list item element
    var liElement = document.createElement('li');
    //give it content
    liElement.textContent = hoursLabels[j] + ': ' + this.hourlyCookiesSold[j] + ' cookies';
    console.log(liElement.textContent);
    //update daily total
    totalCookiesSold += this.hourlyCookiesSold[j];
    //add list item to html
    this.ulElement.appendChild(liElement);
  }
  return totalCookiesSold;
};
CookieStore.prototype.renderStoreSales = function(i) {
  //format id tag names
  var storeId = 'store'+i;
  var storeH2Id = 'h2'+storeId;
  console.log('id tags', storeH2Id, storeId);

  //initialize daily total for this store
  var totalCookiesSold = 0;

  // //initialize store table heading with store name
  this.h2Element = document.getElementById(storeH2Id);
  //get ul element with storeId
  this.ulElement = document.getElementById(storeId);
  //render list for store[i]
  totalCookiesSold += this.renderStoreHourlySales();

  //done with a store. add its sales to overall total
  allStoresTotalCookieSales += totalCookiesSold;

  // output daily total
  var liElement = document.createElement('li');
  liElement.innerHTML = '<b>Total: ' + totalCookiesSold + ' cookies</b>';
  this.ulElement.appendChild(liElement);
};

//output results for each store...
CookieStore.renderSalesResults = function() {
  //initialize sales grand total
  allStoresTotalCookieSales = 0;
  //loop through stores rendering their sales
  for (var i in store) {
    store[i].renderStoreSales(i);
  }

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
};

// instantiate each store with stats provided by business owner:
// Store name, minCustomers/hr, maxCustomers/hr, avg cookies purchased per customer
store.push(new CookieStore('1st and Pike', 23, 65, 6.3));
store.push(new CookieStore('SeaTac Airport', 3, 24, 1.2));
store.push(new CookieStore('Seattle Center', 11, 38, 3.7));
store.push(new CookieStore('Capital Hill', 20, 38, 2.3));
store.push(new CookieStore('Alki', 2, 16, 4.6));

console.log(store);

// render html
CookieStore.renderSalesResults();

