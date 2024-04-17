const api_name = "http://www.themealdb.com/api/json/v1/1/search.php?s=";
const api_ingredient = "http://www.themealdb.com/api/json/v1/1/filter.php?i=";
const api_category = "http://www.themealdb.com/api/json/v1/1/filter.php?c=";
const api_area = "http://www.themealdb.com/api/json/v1/1/filter.php?a=";

//Selección del método de busqueda
/*let selectElement = document.getElementById("menu");

selectElement.addEventListener("change", function () {
  let selectedValue = selectElement.value;
  console.log(selectedValue);
});
*/

//Consulta
const apiulr = "www.themealdb.com/api/json/v1/1/search.php?s=Stamppot";

//const axios = require('axios');

async function consultar(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Falló esta vuelta: ${error}`);
  }
}

(async () => {
  const datos = await consultar(apiulr);
  console.log(datos);
})();
