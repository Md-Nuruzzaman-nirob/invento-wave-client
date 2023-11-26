import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useSecureAPI from "../../../../hooks/useSecureAPI";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

//   date related variable
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const hour = currentDate.getHours();
const minute = currentDate.getMinutes();
const second = currentDate.getSeconds();
const date = { day: day, month: month, year: year };
const time = { second: second, minute: minute, hour: hour };

const CheckoutForm = ({ user, productData, isLoading, isPending }) => {
  const [paymentError, setPaymentError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useSecureAPI();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || isPending) {
      return;
    }
    const priceData = { price: productData?.sellingPrice };
    axiosSecure.post("/create-payment-intent", priceData).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, isLoading, isPending, productData?.sellingPrice]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    const toastId = toast.loading("Progress...");

    if (!stripe || !elements) {
      toast.error("internal error!!!", { id: toastId, duration: 3000 });
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      toast.error("internal error!!!", { id: toastId, duration: 3000 });
      return;
    }

    const {
      error,
      // paymentMethod
    } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentError(error.message);
      toast.error(error.message, { id: toastId, duration: 3000 });
    } else {
      setPaymentError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setPaymentError(confirmError.message);
    } else {
      setPaymentError("");
      if (paymentIntent.status === "succeeded") {
        const salesData = {
          transactionId: paymentIntent.id,
          soldDate: date,
          soldTime: time,
          soldProduct: {
            productId: productData?._id,
            productName: productData?.productName,
            productImage: productData?.productImage,
            productLocation: productData?.productLocation,
            shopEmail: productData?.shopEmail,
            shopId: productData?.shopId,
            shopName: productData?.shopName,
            shopLogo: productData?.shopLogo,
          },
          soldPrice: productData?.sellingPrice,
          email: user?.email,
          name: user?.displayName,
        };

        axiosSecure.post("/api/sale/create", salesData).then((res) => {
          if (res.data.insertedId) {
            const updateProductInfo = {
              sellCount: productData.sellCount + 1,
              productQuantity: productData.productQuantity - 1,
            };
            axiosSecure
              .patch(
                `/api/product/update/checkout/${productData._id}`,
                updateProductInfo
              )
              .then((res) => {
                if (res.data.modifiedCount > 0) {
                  toast.success("Payment Successful", {
                    id: toastId,
                    duration: 4000,
                  });
                  navigate("/dashboard/sales-Collection");
                }
              });
          }
        });
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mt-5">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "black",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="relative mt-6">{paymentError}</div>
        <button
          className="mt-3 w-full btn btn-sm bg-sky-500 hover:bg-sky-600 text-white border-none"
          type="submit"
          disabled={!stripe || !elements || !clientSecret}
        >
          Pay
        </button>
      </form>
    </>
  );
};

CheckoutForm.propTypes = {
  user: PropTypes.object,
  productData: PropTypes.object,
  isLoading: PropTypes.bool,
  isPending: PropTypes.bool,
};

export default CheckoutForm;
