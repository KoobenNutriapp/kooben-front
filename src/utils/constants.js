// stage: prod | local
const STAGE = 'dev' 
const PORT = 8080;
const BASE_URL = (STAGE === 'prod' ? 'http://api.koo-ben.com' :`http://localhost:${PORT}`);
const PATH_RECIPE = "/recipe";
const PATH_INGREDIENT = "/ingredient";
const PATH_PAYMENT = "/payment";
const PATH_USER = "/user";

export { BASE_URL,
         PORT,
         PATH_RECIPE,
         PATH_INGREDIENT,
         PATH_PAYMENT,
         PATH_USER,
};