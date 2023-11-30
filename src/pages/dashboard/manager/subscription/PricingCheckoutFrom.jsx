import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSecureAPI from "../../../../hooks/useSecureAPI";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../../../hooks/useAuth";

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

const PricingCheckoutFrom = ({ findData }) => {
  const [paymentError, setPaymentError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useSecureAPI();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const priceData = { price: findData?.price };
    axiosSecure.post("/create-payment-intent", priceData).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, findData?.price]);

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
        const cardData = {
          transactionId: paymentIntent.id,
          soldDate: date,
          soldTime: time,
          soldPrice: findData?.price,
          customerEmail: user?.email,
          customerName: user?.displayName,
          soldCard: findData,
        };

        axiosSecure.post("/api/payment/create", cardData).then((res) => {
          if (res.data.insertedId) {
            const updateShopInfo = {
              limit: findData?.features?.limit,
            };
            axiosSecure
              .patch(`/api/shop/update/${user?.email}`, updateShopInfo)
              .then((res) => {
                if (res.data.modifiedCount > 0) {
                  toast.success("Payment Successful", {
                    id: toastId,
                    duration: 4000,
                  });
                  navigate(
                    location?.state
                      ? location.state
                      : "/dashboard/sales-Collection"
                  );
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
        <div className="relative my-3">{paymentError}</div>
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

PricingCheckoutFrom.propTypes = {
  findData: PropTypes.object,
};
export default PricingCheckoutFrom;
