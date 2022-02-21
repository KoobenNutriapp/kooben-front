import { BASE_URL, PATH_RECIPE, PORT } from "../utils/constants";
let request = null;

const getRecipes = async (search) => {
    if(search.includes('search')){
      request = `${BASE_URL}${PATH_RECIPE}?${search}`
    }
    else{
      const buildTableRequest = search.join('&')
      request = `${BASE_URL}${PATH_RECIPE}?${buildTableRequest}`
    }
    console.log(request);
  
    try {
      const response = await fetch(request, {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
}

const createRecipe = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}${PATH_RECIPE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response)
    return await response.json();

  } catch (error) {
    console.error(error);
  }
};

const updateRecipe = async (id,data) => {
  try {
    const response = await fetch(`${BASE_URL}:${PORT}${PATH_RECIPE}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response)
    return await response.json();

  } catch (error) {
    console.error(error);
  }
};

const deleteRecipe = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}:${PORT}${PATH_RECIPE}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    return await response.json();

  } catch (error) {
    console.error(error);
  }
};


export { getRecipes,
        createRecipe,
        updateRecipe,
        deleteRecipe,
         
};