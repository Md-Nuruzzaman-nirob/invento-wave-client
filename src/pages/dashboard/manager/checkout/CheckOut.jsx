import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import useFetchSecure from "../../../../hooks/useFetchSecure";
import useAuth from "../../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";
import { useState } from "react";

const stripePubKey = import.meta.env.VITE_PAYMENT_PK_KEY;
const stripePromise = loadStripe(stripePubKey);
const CheckOut = () => {
  const [discount, setDiscount] = useState(false);

  const { user } = useAuth();
  const { id } = useParams();

  const {
    data: productData,
    isPending,
    isLoading,
  } = useFetchSecure(`/api/product/id/${id}`, ["checkoutData", id]);

  if (isLoading || isPending) {
    return (
      <p className="h-screen flex items-center justify-center">
        <HashLoader color="#0ea5e9" />
      </p>
    );
  }

  const sellPriceDiscount =
    (productData?.sellingPrice * productData?.discountPercent) / 100;
  const sellPrice = productData?.sellingPrice - sellPriceDiscount;

  return (
    <>
      <Helmet>
        <title>Check Out - Invento Wave</title>
      </Helmet>
      <div className="mb-10">
        <h3 className="font-semibold mb-5">
          Dashboard/Sales Collection/Check Out
        </h3>
        <div className="flex justify-center mt-10 sm:w-4/5  xl:w-2/4 mx-auto">
          <div className="card shadow-md bg-base-100 rounded-md p-6 sm:p-10 w-full">
            <figure>
              <img
                className="rounded-md max-h-[300px] w-full object-cover"
                src={productData?.productImage}
                alt="Shoes"
              />
            </figure>
            <div className="card-body p-0 pt-5">
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-medium">
                  {productData?.productName}
                </h2>
                <h3 className=" lg:text-lg font-medium">
                  ${productData?.sellingPrice}
                </h3>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm lg:text-base">
                <h2>
                  From :{" "}
                  <span className="text-black ">{productData?.shopName}</span>
                </h2>
                <h3>
                  Code :{" "}
                  <span className="text-sky-500 font-semibold">
                    {productData?.productCode}
                  </span>
                </h3>
              </div>

              <div className="flex justify-between items-center text-xs sm:text-sm lg:text-base">
                <h2>
                  Location :{" "}
                  <span className="text-black">
                    {productData?.productLocation}
                  </span>
                </h2>
                <h2>
                  Discount :{" "}
                  <span className="text-red-600">
                    {productData?.discountPercent}%
                  </span>
                </h2>
              </div>
              <div className="flex justify-end items-center text-xs sm:text-sm lg:text-base">
                <button
                  onClick={() => setDiscount(!discount)}
                  className={`btn btn-xs whitespace-nowrap font-normal border-none ${
                    !discount ? "bg-pink-600 hover:bg-pink-700 text-white" : ""
                  }`}
                >
                  {discount
                    ? `${productData?.discountPercent}% Discount Applied`
                    : "Apply Discount"}
                </button>
              </div>

              <div className="w-full">
                <div className="text-center my-5 relative">
                  <h3 className=" font-semibold mb-1">Payment Information</h3>
                  {discount ? (
                    <h3>
                      discount :{" "}
                      <span className="text-red-500">${sellPriceDiscount}</span>
                    </h3>
                  ) : (
                    <h3>
                      discount : <span className="text-red-500">$0</span>
                    </h3>
                  )}
                  <h3 className="text-xs sm:text-sm lg:text-base mt-1">
                    payable price :{" "}
                    <span className="text-green-600">
                      $
                      {discount
                        ? Math.round(sellPrice)
                        : productData?.sellingPrice}
                    </span>
                  </h3>
                </div>
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    user={user}
                    productData={productData}
                    sellPrice={
                      discount
                        ? Math.round(sellPrice)
                        : productData?.sellingPrice
                    }
                    isLoading={isLoading}
                    isPending={isPending}
                  />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
