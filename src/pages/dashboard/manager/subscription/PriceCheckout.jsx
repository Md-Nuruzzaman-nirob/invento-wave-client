import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PricingCheckoutFrom from "./PricingCheckoutFrom";
import { useLoaderData, useParams } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { Helmet } from "react-helmet-async";

const stripePubKey = import.meta.env.VITE_PAYMENT_PK_KEY;
const stripePromise = loadStripe(stripePubKey);

const PriceCheckout = () => {
  const { plan } = useParams();
  const pricingData = useLoaderData();

  const findData = pricingData.find((data) => data.id === plan);

  return (
    <>
      <Helmet>
        <title>Check Out - Invento Wave</title>
      </Helmet>
      <div className="mb-10">
        <h3 className="font-semibold mb-5">Dashboard/Subscription/Check Out</h3>
        <div className=" w-[300px] sm:w-[450px]  2xl:w-[500px] mx-auto card shadow-md bg-base-100 rounded-md p-5 sm:p-10 relative mt-10 overflow-hidden">
          {findData.popular && (
            <p className="w-2/3 absolute top-10 -right-11 sm:top-12 sm:-right-20 2xl:-right-24  bg-red-600 text-white py-1 sm:py-2 px-3 rounded-md text-center shadow-lg shadow-black/40 font-medium rotate-45 sm:text-lg">
              MOST POPULAR
            </p>
          )}
          <div className="py-10 flex flex-col justify-center items-center space-y-3 bg-[#dee2e6] rounded-md">
            <h3 className="text-lg">{findData?.plan}</h3>
            <h2 className="text-4xl font-bold text-sky-500">
              ${findData.price}
            </h2>
          </div>
          <div className="space-y-5 mt-5">
            <div className="flex items-center gap-5">
              <TiTick />
              <h3>
                <span className="font-bold">+{findData.features.limit}</span>{" "}
                Product limit
              </h3>
            </div>
            <div className="flex items-center gap-5">
              <TiTick />
              <h3>
                <span className="font-bold">{findData.features.contact}</span>{" "}
                Contacts
              </h3>
            </div>
            <div className="flex items-center gap-5">
              <TiTick />
              <h3>
                <span className="font-bold">{findData.features.support}</span>{" "}
                Unlimited Support
              </h3>
            </div>
            <div className="flex items-center gap-5">
              <TiTick />
              <h3>
                <span className="font-bold">{findData.features.feature}</span>{" "}
                To Premium Features
              </h3>
            </div>
            {findData.features.update && (
              <div className="flex items-center gap-5">
                <TiTick />
                <h3>
                  <span className="font-bold">{findData.features.update}</span>{" "}
                  Update
                </h3>
              </div>
            )}
            {findData.features.ads && (
              <div className="flex items-center gap-5">
                <TiTick />
                <h3>
                  <span className="font-bold">{findData.features.ads}</span> Ads
                </h3>
              </div>
            )}
          </div>
          <div className="w-full">
            <div className="text-center my-5">
              <h3 className=" font-semibold">Payment Information</h3>
              <h3 className="text-xs sm:text-sm lg:text-base">
                payable price :{" "}
                <span className="text-amber-500 font-semibold">
                  ${findData.price}
                </span>
              </h3>
            </div>
            <Elements stripe={stripePromise}>
              <PricingCheckoutFrom findData={findData} />
            </Elements>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceCheckout;
