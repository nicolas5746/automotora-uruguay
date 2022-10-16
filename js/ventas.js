let salesApp = new Vue({
  el: "#sales",
  data: {
    cars: [],
    currency: "USD",
    exchangeRateUYU: 0,
    brands: [],
    brandSelected: "",
    models: [],
    modelSelected: "",
    years: [],
    yearSelected: "",
    statusSelected: "",
    filtering: false,
  },
  filters: {
    thousands: (value) => {
      return parseInt(value).toLocaleString("es-UY");
    },
  },
});

for (let i = 2022; i >= 1900; i--) {
  salesApp.years.push(i);
}

$.ajax({
  url: "https://ha.edu.uy/api/rates",
  success: (data) => {
    salesApp.exchangeRateUYU = data.uyu;
  },
});

$.ajax({
  url: "https://ha.edu.uy/api/brands",
  success: (data) => {
    salesApp.brands = data;
  },
});

$("#select-brand").on("change", () => {
  let url = "https://ha.edu.uy/api/models?brand=" + salesApp.brandSelected;

  $.ajax({
    url: url,
    success: (data) => {
      salesApp.models = data;
      salesApp.modelSelected = "";
    },
  });
});

$("#btn-filter").on("click", () => {
  loadCars();
});

$("#btn-currency").on("click", () => {
  if (salesApp.currency === "USD") {
    salesApp.currency = "UYU";
  } else {
    salesApp.currency = "USD";
  }
});

const loadCars = () => {
  salesApp.filtering = true;

  let year = salesApp.yearSelected;
  let brand = salesApp.brandSelected;
  let model = salesApp.modelSelected;
  let status = salesApp.statusSelected;

  $.ajax({
    url:
      "https://ha.edu.uy/api/cars?year=" +
      year +
      "&brand=" +
      brand +
      "&model=" +
      model +
      "&status=" +
      status,
    success: (data) => {
      salesApp.filtering = false;
      salesApp.cars = data;
      $(".alert-warning").removeClass("hidden");
    },
  });
}

loadCars();