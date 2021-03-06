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

// var tableHasBeenUpdated = false;

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
  this.hourlyCookiesSold = []; //Clear object's two arrays
  this.hourlyStaffingEstimate = [];
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

  // Make sure sales and and staffing tables are empty before we build
  // them in order to handle updating a store's info
  CookieStore.clearSalesResultsTable();

  // Render headings of the table
  CookieStore.renderSalesTableHeader();

  // Render rows for each store
  for (var i of store) {
    i.renderStoreSalesTableRow();
  }

  // Render table footer (hourly totals)
  CookieStore.renderSalesTableFooter();

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

};

// Render sales table header
CookieStore.renderSalesTableHeader = function() {
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
CookieStore.renderSalesTableFooter = function() {
  // Get table footer
  var tableBodyEl = document.getElementById('tableBody');
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
  tableBodyEl.appendChild(trEl);

};

//Delete sales table footer (last row in tbody element)
CookieStore.deleteSalesTableFooter = function() {
  //Delete sales table footer (last row in tbody element)
  var tableEl = document.getElementById('tableBody');
  var bodyRows = document.getElementById('tableBody').getElementsByTagName('tr');
  tableEl.deleteRow(bodyRows.length-1);
};

// Clear content from salesDataTable
CookieStore.clearSalesResultsTable = function() {
  // replace existing tbody and thead in table with new, blank elements
  var oldTbody = document.getElementById('tableBody');
  var newTbody = document.createElement('tbody');
  newTbody.setAttribute('id', 'tableBody'); // give new element required id
  var oldThead = document.getElementById('tableHeader');
  var newThead = document.createElement('thead');
  newThead.setAttribute('id', 'tableHeader');
  // Replace old nodes with new ones.
  oldTbody.parentNode.replaceChild(newTbody, oldTbody);
  oldThead.parentNode.replaceChild(newThead, oldThead);
};

// Render company-wide staffing estimate...
CookieStore.renderStaffingEstimate = function() {
  // Clear existing table
  CookieStore.clearStaffingTable();

  // Render headings of the table
  console.log('rendering staffing table');
  CookieStore.renderStaffingTableHeader();

  //loop through stores rendering their sales
  for (var i of store) {
    i.renderStoreStaffingTableRow();
  }
};

// Clear content from staffing table
CookieStore.clearStaffingTable = function() {
  // replace existing tbody and thead in table with new, blank elements
  var oldTbody = document.getElementById('staffingTableBody');
  var newTbody = document.createElement('tbody');
  newTbody.setAttribute('id', 'staffingTableBody'); // give new element required id
  var oldThead = document.getElementById('staffingTableHeader');
  var newThead = document.createElement('thead');
  newThead.setAttribute('id', 'staffingTableHeader');
  // Replace old nodes with new ones.
  oldTbody.parentNode.replaceChild(newTbody, oldTbody);
  oldThead.parentNode.replaceChild(newThead, oldThead);
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

// Check if new store name is unique
CookieStore.storeNameIsUnique = function(newName) {
  var unique = [true, 0];
  for (var i = 0; i < store.length; i++) {
    if (store[i].name.toLowerCase() === newName.toLowerCase()) {
      unique[0] = false;
      break;
    }
  }
  unique[1] = i; //If [0] is true, name is unique and we'll never use [1]
  return unique;
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
  console.group('onNewCookieStoreFormSubmittd');
  console.log('the form was submitted!');

  var formEl = e.target;
  // Values validated as numbers in browser but they're
  // passed to us as strings. Covert to actual numbers so
  // validation tests work correctly.
  var maxCustomers = parseInt(formEl.maxCustomers.value);
  var minCustomers = parseInt(formEl.minCustomers.value);
  var avgCookiesPerCustomer = parseFloat(formEl.avgCookiesPerCustomer.value);
  var uniqueStoreName = CookieStore.storeNameIsUnique(formEl.name.value);
  console.log('name',formEl.name.value,'max',maxCustomers,'min',minCustomers,'avg/hr',avgCookiesPerCustomer);

  // Validate store name
  // Check for unique name, length and legal characters
  if (formEl.name.value.match(/^[A-Za-z0-9 ]{4,16}$/) === null || formEl.name.value.length < 4 || formEl.name.value.length > 16) {
    alert('Store name must be composed of letters and numbers only and be between 4 and 16 characters in length.');
    formEl.name.value = '';
    document.getElementById('nameField').focus();
  // Validate that max and min are in range
  } else if (minCustomers < 1 || minCustomers > 300) {
    alert('Minimum Custmers/Hr must be between 1 and 300.');
    formEl.name.value = '';
    document.getElementById('minField').focus();
  // Validate min and max values
  } else if (maxCustomers < 1 || maxCustomers > 600) {
    alert('Maximum Customers/Hr must be between 1 and 600.');
    formEl.maxCustomers.value = '';
    document.getElementById('maxField').focus();
  // Validate that max is greater than min
  } else if (maxCustomers < minCustomers) {
    alert('Maximum Customers/Hr must be greater than or equal to Minimum Customers/Hr.');
    formEl.minCustomers.value = '';
    formEl.maxCustomers.value = '';
    document.getElementById('minField').focus();
  // Validate that average is in range
  } else if (avgCookiesPerCustomer < 1 || avgCookiesPerCustomer > 50) {
    alert('Average cookies/customer/hr must be between 1 and 50.');
    formEl.avgCookiesPerCustomer.value = '';
    document.getElementById('avgField').focus();
  } else {
  // Data looks good.
  // If store name is unique, add a new row.
    if (uniqueStoreName[0] === true) {
      var newStore = new CookieStore(formEl.name.value, minCustomers, maxCustomers, formEl.avgCookiesPerCustomer.value);
      console.log(newStore);
      // tableHasBeenUpdated = true;
      console.log('table updated flag set to true');
      // Add rows to sales and staffing tables
      CookieStore.deleteSalesTableFooter();
      newStore.renderStoreSalesTableRow(); // Add row to sales table
      CookieStore.renderSalesTableFooter(); // update footer of sales data table
      newStore.renderStoreStaffingTableRow(); // Add row to staffing table
    // Else if store name is already in table, update that store's info
    } else {
      console.log('Store name already in table.');
      // Update store's min max and average info
      var i = uniqueStoreName[1];
      store[i].minCustomers = minCustomers;
      store[i].maxCustomers = maxCustomers;
      store[i].avgCookiesPerCustomer = avgCookiesPerCustomer;
      store[i].simulateDailySales(); // update store's simulated sales data
      CookieStore.renderSalesResults();
    }
    clearAndResetForm();
  }
  console.log('Exiting listener function');
  console.groupEnd();
}

// Clear form and return focus to first text input box
function clearAndResetForm() {
  // Clear form fields
  document.forms['addStoreForm'].reset();
  // Return focus to first field
  document.getElementById('nameField').focus();
}

// Switch sales table CSS betwen .default and .linePrinter classes
function onChangeCssButtonPress(e) {
// get value of changeCss button. We'll toggle it between ".default" and ".linePrinter"
  var changeCssButtonEl = document.getElementById('changeCss');
  var currentButtonState = e.target.value;
  var salesTableEl = document.getElementById('salesDataTable');
  console.group('onChangeCssBUttonPress');
  console.log('current button state', currentButtonState);
  // if it's .default
  //   change class of #salesData table to linePrinter
  //   change value of e.target.value to linePrinter
  //   change button text to "Change to Default Style"
  if (currentButtonState === 'default') {
    salesTableEl.className = 'linePrinter';
    e.target.value = 'linePrinter';
    console.log('changed to linePrinter');
    changeCssButtonEl.textContent = 'Change to Default Style';
  // else
  //   change class to .default
  //   change target value to .default
  //   change button text to "Change to Default Style"
  } else {
    salesTableEl.className = 'default';
    e.target.value = 'default';
    console.log('changed to default');
    changeCssButtonEl.textContent = 'Change to Line Printer Style';
  }
  console.groupEnd();
}

// Listener function to delete row on right-click
function onSalesTableRightClick(e) {

  e.preventDefault();

  var targetNodeType = e.target.nodeName; // should be 'TH'
  var targetNodeText = e.target.innerText; // name of store in th cell
  // if storeNameIsUnique returns false then user right click on a store name
  // second element of array returned is store row.
  var storeNameIsUnique = CookieStore.storeNameIsUnique(targetNodeText);
  var storeNumber = storeNameIsUnique[1];

  if (targetNodeType === 'TH' && !storeNameIsUnique[0]) { //Store is in table
    if (confirm('Delete ' + targetNodeText + ' store data from table?') && confirm('Are you sure? There\'s no undelete!')) {
      // User wants to delete store row
      store.splice(storeNumber,1);
      CookieStore.renderSalesResults();
      CookieStore.renderStaffingEstimate();
    }
  }
}

// Attach listener function to add store form submit button
var addStoreFormEl = document.getElementById('addStoreForm');
addStoreFormEl.addEventListener('submit', onNewCookieStoreFormSubmitted);

// Attach listener to Change CSS button
var switchCss = document.getElementById('changeCss');
switchCss.addEventListener('click', onChangeCssButtonPress);

// Attach lister function to data tables to capture right-click
var salesTableEl = document.getElementById('salesDataTable');
salesTableEl.addEventListener('contextmenu', onSalesTableRightClick);
var staffingTableEl = document.getElementById('staffingTable');
staffingTableEl.addEventListener('contextmenu', onSalesTableRightClick);

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
