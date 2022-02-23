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
          successUrl: window.location.protocol + "//koo-ben.com/",
          cancelUrl: window.location.protocol + "//koo-ben.com/",
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
        className="button-donar btn btn-info"
        onClick={handleClick}
      >
        Apoya {ammount}$
      </button>
    );
  };

export default DonationButton;