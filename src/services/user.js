import { BASE_URL, PATH_USER, API_KEY } from "../utils/constants";
let request = null;

const getUsers = async () => {
    request = `${BASE_URL}${PATH_USER}`
    try {
      const response = await fetch(request, {
        method: "GET",
        headers: {
          'x-api-key': API_KEY
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
}
export { getUsers,
};