import { BASE_URL } from "../utils/constants";

const checkout = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/stripe/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        //   'x-api-key': API_KEY
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res)
      return res
  
    } catch (error) {
      console.error(error);
    }
  };

export{
    checkout
}