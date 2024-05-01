// Endpoints de la API
const api_name = "https://themealdb.com/api/json/v1/1/search.php?s=";
const api_ingredient = "https://themealdb.com/api/json/v1/1/filter.php?i=";
const api_category = "https://themealdb.com/api/json/v1/1/filter.php?c=";
const api_area = "https://themealdb.com/api/json/v1/1/filter.php?a=";
const api_id = "https://themealdb.com/api/json/v1/1/lookup.php?i=";

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
  
  let descripcion_place = document.getElementById("descripcion-place");
  descripcion_place.setAttribute("style", "display:none");

  //Validación de datos en la petición
  let textbox = document.getElementById("textbox").value;
  let url = apiulr + textbox;
  if (textbox == "") {
    alert("Please enter a value");
    return;
  }

  const data = await consultarRecetas(url);

  const results = document.getElementById("results");
  const welcome = document.getElementById("welcome");
  if (data == null) {
  } else {
    results.style.display = "block";
    welcome.style.display = "none";
  }

  cards(data);

});


//Creación de tarjetas de recetas
function cards(data){
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
    const more = document.createElement("button");
    const p = document.createTextNode("p");

    img.setAttribute("src", dato.strMealThumb);
    title.innerHTML = dato.strMeal;
    more.setAttribute("id", dato.idMeal);
    more.addEventListener("click", function(){
      viewMore(dato.idMeal);
    });
    p.textContent = "View More";

    cards.appendChild(img);
    cards.appendChild(title);
    more.appendChild(p);
    cards.appendChild(more);

    container.appendChild(cards);

    results.appendChild(container);
  }
}

async function viewMore(id){
  const results = document.getElementById("results");
  const descripcion_place = document.getElementById("descripcion-place");
  const descripcion = document.getElementById("descripcion");

  descripcion.innerHTML = "";

  results.setAttribute("style", "display:none");
  descripcion_place.setAttribute("style", "display:block");
  descripcion.setAttribute("style", "display:grid");
  
  const returnButton = document.createElement("button");
  const i = document.createElement("i");
  const img = document.createElement("img");
  const title = document.createElement("h2");
  const p = document.createElement("p");
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  
  let url = api_id + id;
  let dato = await consultarRecetas(url);
  dato = dato[0];
  console.log(dato);

  i.setAttribute("class", "bi bi-x-square");
  img.setAttribute("src", dato.strMealThumb);
  title.innerHTML = dato.strMeal;
  p.innerHTML = dato.strInstructions;

  let cont = 1;
  while(dato[`strIngredient${cont}`] != null){
    let ingredient = dato[`strIngredient${cont}`];
    let measure = dato[`strMeasure${cont}`];
    let li = document.createElement("li");
    li.innerHTML = measure + " " + ingredient;
    ul.appendChild(li);
    cont++;
  }


  returnButton.appendChild(i);
  descripcion.appendChild(img);
  descripcion.appendChild(title);
  descripcion.appendChild(p);
  descripcion.appendChild(ul);

  descripcion_place.appendChild(descripcion);
}


//Función para consultar la API
async function consultarRecetas(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data.strMeal);
    return response.data.meals;
  } catch (error) {
    console.error(`Falló esta vuelta: ${error}`);
    alert("API query failed");
  }
}
