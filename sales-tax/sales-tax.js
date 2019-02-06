var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

// console.log(companySalesData[0].sales);

function calculateSalesTax(salesData, taxRates) {

  var salesDataByCompany = {};

  for (var i in salesData) {

    var compName = salesData[i].name;
    var compSales = salesData[i].sales;

    if (!salesDataByCompany[compName]) {
      salesDataByCompany[compName] = {totalSales: 0, totalTaxes: 0};
    }

    var salesInProv = 0;

    var taxInProv = taxRates[salesData[i].province];

    for (var j in compSales) {

      salesInProv += compSales[j];
    }

    salesDataByCompany[compName].totalSales += salesInProv;

    salesDataByCompany[compName].totalTaxes += salesInProv * taxInProv;
  }

  return salesDataByCompany;
}

var results = calculateSalesTax(companySalesData, salesTaxRates);

console.log(results);