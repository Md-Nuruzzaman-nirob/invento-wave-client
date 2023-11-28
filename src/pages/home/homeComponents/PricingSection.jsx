import { TiTick } from "react-icons/ti";
import Title from "../../../components/shared/Title";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import Container from "../../../components/shared/Container";

const PricingSection = () => {
  const pricing = useLoaderData();
  const location = useLocation();

  return (
    <div id="pricing">
      <Container className={"py-20"}>
        <Title
          section={"PRICING"}
          title={"Pricing Plane For You"}
          subTitle="At Invento Wave, we understand the diverse needs of businesses when it comes
    to efficient inventory management. Choose from our thoughtfully crafted
    pricing plans to streamline your operations and elevate your inventory
    control. Whether you're a small business, a growing enterprise, or an
    established organization, our plans cater to all scales."
        />
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-10 lg:gap-0 my-10 sm:my-20">
          {pricing.map((data) => (
            <div
              key={data.id}
              className="w-[300px] sm:w-[500px] lg:w-[300px] xl:w-[400px] bg-base-100 shadow-xl p-5 sm:p-7 rounded-md relative overflow-hidden mx-auto lg:mx-0"
              data-aos="zoom-in"
              data-aos-duration="500"
            >
              {data.popular && (
                <p className="w-2/3 absolute top-9 -right-12 sm:-right-28 lg:-right-12 xl:-right-20 rotate-45 bg-red-600 text-white py-1 px-3 rounded-md text-center shadow-lg shadow-black/40 font-medium">
                  MOST POPULAR
                </p>
              )}
              <div className="py-5 md:py-10 lg:py-5 xl:py-10 flex flex-col justify-center items-center space-y-3 bg-[#dee2e6] rounded-md">
                <h3 className="text-lg">{data?.plan}</h3>
                <h2 className="text-4xl font-bold text-sky-500">
                  ${data.price}
                </h2>
              </div>
              <div className="space-y-5 mt-5 h-64 lg:h-72 xl:h-[260px]">
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
                    <span className="font-bold">{data.features.feature}</span>{" "}
                    To Premium Features
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
                data-aos="flip-up"
                data-aos-duration="500"
              >
                Choose Plan
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PricingSection;
