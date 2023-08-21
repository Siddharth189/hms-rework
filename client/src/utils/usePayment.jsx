import axios from "axios";
const usePayment = () => {
  return new Promise(async (resolve) => {
    function loadScript(src) {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    }

    async function displayRazorpay() {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        resolve(false); // Payment failed, resolve with false
        return;
      }

      const result = await axios.post("http://localhost:8080/payment/orders");

      if (!result) {
        alert("Server error. Are you online?");
        resolve(false); // Payment failed, resolve with false
        return;
      }

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: "rzp_test_2J7xaJx5LrR7zj", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Siddharth Corp.",
        description: "Test Transaction",
        // image: { logo },
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post(
            "http://localhost:8080/payment/success",
            data
          );

          if (result.data.success) {
            alert("Payment successful!");
            resolve(true); // Payment success, resolve with true
          } else {
            alert("Payment failed!");
            resolve(false); // Payment failed, resolve with false
          }
        },
        prefill: {
          name: "Siddharth Singh",
          email: "siddharthiiitg@gmail.com",
          contact: "7897998421",
        },
        notes: {
          address: "Siddharth Singh Corp Limited",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }

    await displayRazorpay(); // Wait for the payment process to complete
  });
};

export default usePayment;
