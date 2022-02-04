import { BASE_URL, PORT, PATH_RECIPE, SEARCH } from "../utils/constants";
let request = null;

const getRecipes = async (search) => {
  
  const test = search.map(item=>console.log(item))


  if(search){
    request = `${BASE_URL}:${PORT}${PATH_RECIPE}?${SEARCH}${search}`
  }else{
    request = `${BASE_URL}:${PORT}${PATH_RECIPE}`
  }

  try {
    const response = await fetch(request, {
      method: "GET",
    });
    //console.log(response);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}








export { getRecipes,
         
};