// Endpoints de la API
const api_name = "https://themealdb.com/api/json/v1/1/search.php?s=";
const api_ingredient = "https://themealdb.com/api/json/v1/1/filter.php?i=";
const api_category = "https://themealdb.com/api/json/v1/1/filter.php?c=";
const api_area = "https://themealdb.com/api/json/v1/1/filter.php?a=";


let selectElement = document.getElementById("menu");
let search = document.getElementById("search");
let currentPage = 1;

function paginate(data, itemsPerPage) {
  const numberOfPages = Math.ceil(data.length / itemsPerPage);
  const pages = Array.from({ length: numberOfPages }, (_, i) => 
    data.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage)
  );
  return pages;
}

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
  results.innerHTML = "";
  const container = document.createElement("div");
  container.innerHTML = "";
  container.setAttribute("id", "cards");

  for(i=0; i<data.length; i++){
    const dato = data[i];

    const cards = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h3");

    img.setAttribute("src", dato.strMealThumb);
    title.innerHTML = dato.strMeal;

    cards.appendChild(img);
    cards.appendChild(title);

    container.appendChild(cards);

    results.appendChild(container);
  }
});



//Función para consultar la API
async function consultarRecetas(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data.strMeal);
    const results = document.getElementById("results");
    const welcome = document.getElementById("welcome");
    if (response.data.meals == null) {
    } else {
      results.style.display = "block";
      welcome.style.display = "none";
    }
    return response.data.meals;
  } catch (error) {
    console.error(`Falló esta vuelta: ${error}`);
    alert("API query failed");
  }
}
