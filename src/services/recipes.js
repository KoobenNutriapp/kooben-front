import { BASE_URL, PORT, PATH_RECIPE } from "../utils/constants";
let request = null;

const getRecipes = async (search) => {
  if(search.includes('search')){
    request = `${BASE_URL}:${PORT}${PATH_RECIPE}?${search}`
  }
  else{
    const buildTableRequest = search.join('&')
    request = `${BASE_URL}:${PORT}${PATH_RECIPE}?${buildTableRequest}`
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








export { getRecipes,
         
};