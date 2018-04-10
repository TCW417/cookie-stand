'use strict';
// GLOBALS...
// Hours labels
var hoursLabels = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

// Store array of CookieStore objects
var store = [];

// CookieStore constructor and methods:
function CookieStore(name, minCustomers, maxCustomers, avgCookiesPerCustomer) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.hourlyCookiesSold = [];
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
CookieStore.prototype.renderStoreSales = function() {
  var totalCookiesSold = 0;
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
//output results for each store...
CookieStore.renderSalesResults = function() {
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
    store[i].ulElement = document.getElementById(storeId);

    //render list for store[i]
    totalCookiesSold += store[i].renderStoreSales();

    //done with a store. add its sales to overall total
    allStoresTotalCookieSales += totalCookiesSold;

    // output daily total
    var liElement = document.createElement('li');
    liElement.innerHTML = '<b>Total: ' + totalCookiesSold + ' cookies</b>';
    store[i].ulElement.appendChild(liElement);
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

