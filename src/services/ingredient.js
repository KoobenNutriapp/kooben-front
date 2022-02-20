import { BASE_URL, PATH_INGREDIENT } from "../utils/constants";
let request = null;

const getIngredients = async () => {
    request = `${BASE_URL}${PATH_INGREDIENT}`
    try {
      const response = await fetch(request, {
        method: "GET",
      });
      return await response.json();
      
    } catch (error) {
      console.error(error);
    }
}

const getIngredientById = async (id) => {
  request = `${BASE_URL}${PATH_INGREDIENT}/${id}`
  try {
    const response = await fetch(request, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}


export { getIngredients,
         getIngredientById   
};