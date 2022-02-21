import "./DonateButton.scss"

import { loadStripe } from "@stripe/stripe-js";

const DonationButton = ({ itemID, ammount }) => {
    const stripePromise = loadStripe(
        "pk_test_51KVNQfAqezYdKBDlWRsZKRSMoT5Ma3K9EPp4i1rKPgEYGKaBNgw9GGfvXANsYX2cL49HWwHmBACpyA5ZrYsjOKV500G6E7ay7X"
      );

    const handleClick = async (event) => {
      const stripe = await stripePromise;
      stripe
        .redirectToCheckout({
          lineItems: [{ price: itemID, quantity: 1 }],
          mode: "payment",
          successUrl: window.location.protocol + "//localhost:3000/Donation",
          cancelUrl: window.location.protocol + "//localhost:3000/",
          submitType: "donate",
        })
        .then(function (result) {
          if (result.error) {
            console.log(result);
          }
        });
    };
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        onClick={handleClick}
      >
        DonaciónComponet {ammount}$
      </button>
    );
  };

export default DonationButton;