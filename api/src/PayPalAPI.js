import checkoutServerSdk from "@paypal/checkout-server-sdk";

export const client = () => {
  return new checkoutServerSdk.core.PayPalHttpClient(environment());
};

/**
 *
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 *
 */
const environment = () => {
  let clientId = process.env.PAYPAL_CLIENT_ID || "PAYPAL-SANDBOX-CLIENT-ID";
  let clientSecret =
    process.env.PAYPAL_CLIENT_SECRET || "PAYPAL-SANDBOX-CLIENT-SECRET";

  return new checkoutServerSdk.core.SandboxEnvironment(clientId, clientSecret);
};

export const prettyPrint = async (jsonData, pre = "") => {
  let pretty = "";
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  for (let key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      if (isNaN(key)) pretty += pre + capitalize(key) + ": ";
      else pretty += pre + (parseInt(key) + 1) + ": ";
      if (typeof jsonData[key] === "object") {
        pretty += "\n";
        pretty += await prettyPrint(jsonData[key], pre + "    ");
      } else {
        pretty += jsonData[key] + "\n";
      }
    }
  }
  return pretty;
};
