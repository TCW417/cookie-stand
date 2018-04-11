'use strict';
// ************** GLOBALS ***************
// Store array of CookieStore objects
var store = [];

// Sum of sales for all stores.
var allStoresTotalCookieSales;

// Open hours for all stores.
var openHours = 15;

// Hourly sales totals for all locations
var hourlyTotal = [];

// ********** CookieStore constructor and prototype methods ***************
function CookieStore(name, minCustomers, maxCustomers, avgCookiesPerCustomer) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.hourlyCookiesSold = [];
  this.hourlyStaffingEstimate = [];
  this.simulateDailySales(); // fill hourlyCookiesSold and
  // hourlyStaffingEstimate with simulated data
  store.push(this); // push this store into (onto?) the global store array
}

// Return randum # of customers per hour between stores min amd max values
CookieStore.prototype.hourlyCustomers = function() {
  return Math.round(Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers);
};

// For each hour of operation, create simulated sales and staffing data
CookieStore.prototype.simulateDailySales = function() {
  // For each hour of operation multiply avg cookies
  // per customer by random # of customers
  for (var i = 0; i < openHours; i++) {
    this.hourlyCookiesSold.push(Math.round(this.avgCookiesPerCustomer * this.hourlyCustomers()));
    // Staffing is estimated based on min of 2 and max of 20 cookies/employee/hr
    var cookies = this.hourlyCookiesSold[i];
    var staff = Math.floor(Math.max(2, cookies/20));
    this.hourlyStaffingEstimate.push(staff);
  }
};

// Add this store's hourly sales data to a table row
CookieStore.prototype.renderStoreHourlySales = function(tableRow) {
  var totalCookiesSold = 0;
  // For each hour of store operation
  for (var j in this.hourlyCookiesSold) {
    // Create a table data element and add content
    var tdElement = createTextElement('td', this.hourlyCookiesSold[j]);
    // Update daily total
    totalCookiesSold += this.hourlyCookiesSold[j];
    // Add table cell to row
    tableRow.appendChild(tdElement);
    // Capture hourly sales in hourlyTotal (sum of all stores by hour)
    hourlyTotal[j] += this.hourlyCookiesSold[j];
  }
  // Return store's total cookies sold
  return totalCookiesSold;
};

// Render all of this store's sales data. Append to table body.
CookieStore.prototype.renderStoreSales = function(tbodyEl) {
  // Parameter tbodyEl references table body onto which rows will be appended.

  // Initialize daily total for this store
  var totalCookiesSold = 0;

  // Create a row for this store
  var trEl = document.createElement('tr');

  // Append a header cell with store name to the row
  var thEl = createTextElement('th', this.name);
  trEl.appendChild(thEl);

  // Render hourly results for the store
  totalCookiesSold += this.renderStoreHourlySales(trEl);

  // Output daily total to end of row
  var tdEl = createTextElement('td', totalCookiesSold);
  trEl.appendChild(tdEl);

  // Append row to table
  tbodyEl.appendChild(trEl);

  // Done with this store. Add its sales to overall total
  allStoresTotalCookieSales += totalCookiesSold;

};

// Render row for one store. Use this method to add new store objects to table
CookieStore.prototype.renderStoreSalesTableRow = function(){
  // Get table body element
  var tbodyEl = document.getElementById('tableBody');
  this.renderStoreSales(tbodyEl);
};

// Render this store's hourly staffing estimate
CookieStore.prototype.renderStoreHourlyStaffingEstimate = function(tableRow) {
  // For each hour of operation
  for (var j in this.hourlyStaffingEstimate) {
    // Create a table data element and append to table row
    tableRow.appendChild(createTextElement('td', this.hourlyStaffingEstimate[j]));
  }
  return;
};

// Render this store's total staffing estimate
CookieStore.prototype.renderStoreStaffingEstimate = function(tbodyEl) {
  // Create a row for this store
  var trEl = document.createElement('tr');

  // Append a header cell with store name to the row
  var thEl = createTextElement('th', this.name);
  trEl.appendChild(thEl);

  // Render hourly staffing needed for the store
  this.renderStoreHourlyStaffingEstimate(trEl);

  // Rppend row to table
  tbodyEl.appendChild(trEl);
};

// Render Staffing data row for one store.
// Use this method to add new store objects to Staffing table
CookieStore.prototype.renderStoreStaffingTableRow = function(){
  // Get table body element
  var tbodyEl = document.getElementById('staffingTableBody');
  this.renderStoreStaffingEstimate(tbodyEl);
};

// *********** CookieStore Constructor Methods **************
// Render sales results for each all stores
CookieStore.renderSalesResults = function() {
  // Initialize sales grand total
  allStoresTotalCookieSales = 0;
  // Zero hourlyTotal array
  for (var z = 0; z < openHours; z++){
    hourlyTotal[z] = 0;
  }

  // Render headings of the table
  CookieStore.renderTableHeader();

  // Render rows for each store
  for (var i of store) {
    i.renderStoreSalesTableRow();
  }

  // Render table footer (hourly totals)
  CookieStore.renderTableFooter();

  // Done with individual store data. Add additional information to page.
  // Plug date stamp into html
  var el = document.getElementById('todaysDate');
  // Get yesterday's date (now - # milliseconds in a day)
  var yesterday = new Date(Date.now() - 24*60*60*1000);
  // Convert it to a readable string
  var reportDate = yesterday.toLocaleString();
  // Strip off time portion of date string
  reportDate = reportDate.slice(0, reportDate.indexOf(','));
  // Add it to the page.
  el.textContent = reportDate;

  //Add total store sales to bottom of report
  el = document.getElementById('allStoreSales');
  el.textContent = allStoresTotalCookieSales;
};

// Render sales table header
CookieStore.renderTableHeader = function() {
  // Create headings for table columns
  var headings = ['Location'];
  var hoursLabels = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
  for (var i of hoursLabels) {
    headings.push(i);
  }

  headings.push('Daily Location Total');

  // Get reference to table header
  var theadEl = document.getElementById('tableHeader');
  // Create row
  var trEl = document.createElement('tr');

  // For each heading...
  for (var thItem of headings) {
    // Create th elements
    var thEl = createTextElement('th', thItem);
    // Append to row
    trEl.appendChild(thEl);
  }

  // Append row to header
  theadEl.appendChild(trEl);
};

// Render sales table footer
CookieStore.renderTableFooter = function() {
  // Get table footer
  var tfootEl = document.getElementById('tableFooter');
  // Start row
  var trEl = document.createElement('tr');
  // Add header cell
  var thEl = createTextElement('th', 'Totals');
  trEl.appendChild(thEl);

  // Add hourly total table cells to footer
  for (var i in hourlyTotal){
    var tdEl = createTextElement('td', hourlyTotal[i]);
    trEl.appendChild(tdEl);
  }
  // Add grand total
  tdEl = createTextElement('td', allStoresTotalCookieSales);
  trEl.appendChild(tdEl);

  // Append row to footer
  tfootEl.appendChild(trEl);
};

// Render company-wide staffing estimate...
CookieStore.renderStaffingEstimate = function() {
  // Render headings of the table
  CookieStore.renderStaffingTableHeader();

  //loop through stores rendering their sales
  for (var i of store) {
    i.renderStoreStaffingTableRow();
  }
};

// Render header labels for staffing table
CookieStore.renderStaffingTableHeader = function() {

  // Create table headings
  var headings = ['Location'];
  var hoursLabels = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
  for (var i of hoursLabels) {
    headings.push(i);
  }

  //get reference to table header
  var theadEl = document.getElementById('staffingTableHeader');

  //create row
  var trEl = document.createElement('tr');

  //for each heading...
  for (var thItem of headings) {
    //create th elements row
    trEl.appendChild(createTextElement('th',thItem));
  }

  //append row to header
  theadEl.appendChild(trEl);
};

// ************* Helper Functions **************
// create an element that takes a textContent property
function createTextElement(tag, textString) {
  var el = document.createElement(tag);
  el.textContent = textString;
  return el;
}

// ************** Event Listener Functions **************
// Action taken on submit event on addNewStore form
function onNewCookieStoreFormSubmitted(e) {
  // Prevent default browser behavior
  e.preventDefault();
  console.log('the form was submitted!');
  var formEl = e.target;

  var newStore = new CookieStore(formEl.name.value, formEl.minCustomers.value, formEl.maxCustomers.value, formEl.avgCookiesPerCustomer.value);
  console.log(newStore);

  // Add rows to sales and staffing tables
  newStore.renderStoreSalesTableRow(); // Add row to sales table
  newStore.renderStoreStaffingTableRow(); // Add row to staffing table

  // Clear form fields
  document.forms['addStoreForm'].reset();
  // Return focus to first field
  document.getElementById('firstField').focus();
}

// Attach listener function to add store form submit button
var addStoreFormEl = document.getElementById('addStoreForm');
addStoreFormEl.addEventListener('submit', onNewCookieStoreFormSubmitted);

// **************** Add Initial Stores and Render Tables ******************
// Instantiate each store with stats provided by business owner:
// store name, minCustomers/hr, maxCustomers/hr, avg cookies purchased per customer
new CookieStore('1st and Pike', 23, 65, 6.3);
new CookieStore('SeaTac Airport', 3, 24, 1.2);
new CookieStore('Seattle Center', 11, 38, 3.7);
new CookieStore('Capital Hill', 20, 38, 2.3);
new CookieStore('Alki', 2, 16, 4.6);

// Render html
CookieStore.renderSalesResults();
CookieStore.renderStaffingEstimate();
