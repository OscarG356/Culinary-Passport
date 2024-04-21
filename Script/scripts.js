// Endpoints de la API
const api_name = "http://themealdb.com/api/json/v1/1/search.php?s=";
const api_ingredient = "http://themealdb.com/api/json/v1/1/filter.php?i=";
const api_category = "http://themealdb.com/api/json/v1/1/filter.php?c=";
const api_area = "http://themealdb.com/api/json/v1/1/filter.php?a=";


let selectElement = document.getElementById("menu");
let search = document.getElementById("search");

search.addEventListener("click", async function () {
  let selectedValue = selectElement.value;
  let apiulr;
  //Selección del método de busqueda
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

  //Validación de datos en la petición
  let textbox = document.getElementById("textbox").value;
  let url = apiulr + textbox;
  if (textbox == "") {
    alert("Please enter a value");
    return;
  }
  console.log(textbox);
  console.log(url);

  const data = await consultarRecetas(url);
  console.log(data);
  
  //Creación de tarjetas de recetas
  const results = document.getElementById("results");
  results.setAttribute("class", "cards");

  for(let meal of data.meals){
    console.log(meal.strMeal);
  }

  /*
  for(mels of data){
    console.log(dato);
    console.log(data);
    const cards = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h3");

    img.setAttribute("src", dato.strMealThumb);
    title.innerHTML = dato.strMeal;

    cards.appendChild(img);
    cards.appendChild(title);

    results.appendChild(contenedor);
  }
  */
  
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
    return response.data.meals;
  } catch (error) {
    console.error(`Falló esta vuelta: ${error}`);
    alert("API query failed");
  }
}
