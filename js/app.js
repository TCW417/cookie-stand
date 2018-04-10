'use strict';
// GLOBALS...
// Hours labels
// var hoursLabels = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

// Store array of CookieStore objects
var store = [];

// Sum of sales for all stores.
var allStoresTotalCookieSales;

// Hourly sales totals across all stores
var hourlySalesTotal = [];

// CookieStore constructor and methods:
function CookieStore(name, minCustomers, maxCustomers, avgCookiesPerCustomer) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.openHours = 15;
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
  for (var i = 0; i < this.openHours; i++) {
    this.hourlyCookiesSold.push(Math.round(this.avgCookiesPerCustomer * this.hourlyCustomers()));
  }
};
CookieStore.prototype.renderStoreHourlySales = function(tableRow) {
  var totalCookiesSold = 0;
  //for each hour of operation
  for (var j in this.hourlyCookiesSold) {
    //create a table data element
    var tdElement = document.createElement('td');
    //give it content
    tdElement.textContent = this.hourlyCookiesSold[j];
    //update daily total
    totalCookiesSold += this.hourlyCookiesSold[j];
    //add table cell to row
    tableRow.appendChild(tdElement);
  }
  return totalCookiesSold;
};
CookieStore.prototype.renderStoreSales = function(tbodyEl) {
  //format id tag names
  // var storeId = 'store'+i;
  // var storeH2Id = 'h2'+storeId;
  // console.log('id tags', storeH2Id, storeId);

  //initialize daily total for this store
  var totalCookiesSold = 0;

  //create a row for this store
  var trEl = document.createElement('tr');

  //append a header cell with store name to the row
  var thEl = document.createElement('th');
  thEl.textContent = this.name;
  trEl.appendChild(thEl);

  //render hourly rsults for the store
  totalCookiesSold += this.renderStoreHourlySales(trEl);

  //done with a store. add its sales to overall total
  allStoresTotalCookieSales += totalCookiesSold;

  // output daily total
  thEl = document.createElement('th');
  thEl.textContent = totalCookiesSold;
  trEl.appendChild(thEl);
  //append row to table
  tbodyEl.appendChild(trEl);
};

//output results for each store...
CookieStore.renderSalesResults = function() {
  //initialize sales grand total
  allStoresTotalCookieSales = 0;
  //render headings of the table
  CookieStore.renderTableHeader();
  //get table body element
  var tbodyEl = document.getElementById('tableBody');
  //loop through stores rendering their sales
  for (var i of store) {
    i.renderStoreSales(tbodyEl);
  }

  //render table footer (hourly totals)
  CookieStore.renderTableFooter();
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
CookieStore.renderTableHeader = function() {
  var headings = ['Location'];
  var hoursLabels = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
  for (var i of hoursLabels) {
    headings.push(i);
  }
  headings.push('Daily Location Total');
  console.log(headings);
  //get reference to table header
  var theadEl = document.getElementById('tableHeader');
  //create row
  var trEl = document.createElement('tr');
  //for each heading...
  for (var thItem of headings) {
    //create th elements
    var thEl = document.createElement('th');
    //add content
    thEl.textContent = thItem;
    //append to row
    trEl.appendChild(thEl);
  }
  //append row to header
  theadEl.appendChild(trEl);
};
CookieStore.renderTableFooter = function() {
  //get table footer
  var tfootEl = document.getElementById('tableFooter');
  //start row
  var trEl = document.createElement('tr');
  //Add header cell
  var thEl = document.createElement('th');
  thEl.textContent = 'Totals';
  trEl.appendChild(thEl);
  //add hourly totals

  //append row to footer
  tfootEl.appendChild(trEl);
};

// instantiate each store with stats provided by business owner:
// Store name, minCustomers/hr, maxCustomers/hr, avg cookies purchased per customer
store.push(new CookieStore('1st and Pike', 23, 65, 6.3));
store.push(new CookieStore('SeaTac Airport', 3, 24, 1.2));
store.push(new CookieStore('Seattle Center', 11, 38, 3.7));
store.push(new CookieStore('Capital Hill', 20, 38, 2.3));
store.push(new CookieStore('Alki', 2, 16, 4.6));

// console.log(store);

// render html
CookieStore.renderSalesResults();