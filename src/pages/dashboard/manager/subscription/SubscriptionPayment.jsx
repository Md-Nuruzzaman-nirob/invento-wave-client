import { Link, useLoaderData, useLocation } from "react-router-dom";
import Title from "../../../../components/shared/Title";
import { TiTick } from "react-icons/ti";

const SubscriptionPayment = () => {
  const pricing = useLoaderData();
  const location = useLocation();
  return (
    <div>
      <Title
        title={"Pricing Plane For You"}
        subTitle="At Invento Wave, we understand the diverse needs of businesses when it comes
  to efficient inventory management. Choose from our thoughtfully crafted
  pricing plans to streamline your operations and elevate your inventory
  control. Whether you're a small business, a growing enterprise, or an
  established organization, our plans cater to all scales."
      />
      <div className="flex flex-col sm:flex-row flex-wrap justify-evenly gap-10 xl:gap-0 my-10 sm:my-20">
        {pricing.map((data) => (
          <div
            key={data.id}
            className="w-[300px] sm:w-[350px] lg:w-[300px] 2xl:w-[350px] bg-base-100 shadow-xl p-7 rounded-md relative overflow-hidden mx-auto"
          >
            {data.popular && (
              <p className="w-2/3 absolute top-10 -right-11 sm:-right-14 lg:top-10 lg:-right-11 2xl:-right-16 rotate-45 bg-red-600 text-white py-1 px-3 rounded-md text-center shadow-lg shadow-black/40 font-medium">
                MOST POPULAR
              </p>
            )}
            <div className="py-10 flex flex-col justify-center items-center space-y-3 bg-[#dee2e6] rounded-md">
              <h3 className="text-lg">{data?.plan}</h3>
              <h2 className="text-4xl font-bold text-sky-500">${data.price}</h2>
            </div>
            <div className="space-y-5 mt-5 h-72 2xl:h-[260px]">
              <div className="flex items-center gap-5">
                <TiTick />
                <h3>
                  <span className="font-bold">+{data.features.limit}</span>{" "}
                  Product limit
                </h3>
              </div>
              <div className="flex items-center gap-5">
                <TiTick />
                <h3>
                  <span className="font-bold">{data.features.contact}</span>{" "}
                  Contacts
                </h3>
              </div>
              <div className="flex items-center gap-5">
                <TiTick />
                <h3>
                  <span className="font-bold">{data.features.support}</span>{" "}
                  Unlimited Support
                </h3>
              </div>
              <div className="flex items-center gap-5">
                <TiTick />
                <h3>
                  <span className="font-bold">{data.features.feature}</span> To
                  Premium Features
                </h3>
              </div>
              {data.features.update && (
                <div className="flex items-center gap-5">
                  <TiTick />
                  <h3>
                    <span className="font-bold">{data.features.update}</span>{" "}
                    Update
                  </h3>
                </div>
              )}
              {data.features.ads && (
                <div className="flex items-center gap-5">
                  <TiTick />
                  <h3>
                    <span className="font-bold">{data.features.ads}</span> Ads
                  </h3>
                </div>
              )}
            </div>
            <Link
              to={`/dashboard/subscription/checkout/${data.id}`}
              state={location.pathname}
              className=" btn w-full bg-sky-500 hover:bg-sky-600 text-white border-none text-lg font-medium"
            >
              Choose Plan
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPayment;
