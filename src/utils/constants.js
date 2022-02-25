// stage: prod | local
const STAGE = 'prod' 
const PORT = 8080;
const BASE_URL = (STAGE === 'prod' ? 'https://api.koo-ben.com' :`http://localhost:${PORT}`);
const PATH_RECIPE = "/recipe";
const PATH_INGREDIENT = "/ingredient";
const PATH_PAYMENT = "/payment";
const PATH_USER = "/user";
const API_KEY = "5e891d20de82a036841180ea72e27ad4"

export { BASE_URL,
         PORT,
         PATH_RECIPE,
         PATH_INGREDIENT,
         PATH_PAYMENT,
         PATH_USER,
         API_KEY,
};