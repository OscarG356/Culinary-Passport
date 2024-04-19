// Endpoints de la API
const api_name = "http://themealdb.com/api/json/v1/1/search.php?s=";
const api_ingredient = "http://themealdb.com/api/json/v1/1/filter.php?i=";
const api_category = "http://themealdb.com/api/json/v1/1/filter.php?c=";
const api_area = "http://themealdb.com/api/json/v1/1/filter.php?a=";

//Selección del método de busqueda

let selectElement = document.getElementById("menu");
let search = document.getElementById("search");

search.addEventListener("click", function () {
  let selectedValue = selectElement.value;
  let apiulr;

  switch (selectedValue) {
    case "method1":
      apiulr = api_name;
      break;
    case "method2":
      apiulr = api_ingredient;
      break;
    case "method3":
      apiulr = api_category;
      break;
    case "method4":
      apiulr = api_area;
      break;
  }

  let textbox = document.getElementById("textbox").value;
  let url = apiulr + textbox;
  console.log(textbox);
  console.log(url);

  consultarRecetas(url);
});

//Función para consultar la API
async function consultarRecetas(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
    const infoerror = document.getElementById("error");
    const results = document.getElementById("results");
    if (response.data.meals == null) {
      infoerror.style.display = "block";
      results.style.display = "none";
    } else {
      infoerror.style.display = "none";
      results.style.display = "block";
    }
    return response.data;
  } catch (error) {
    console.error(`Falló esta vuelta: ${error}`);
    alert("API query failed");
  }
}
