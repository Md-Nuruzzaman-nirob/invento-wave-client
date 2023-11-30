import { Helmet } from "react-helmet-async";
import Banner from "./homeComponents/Banner";
import Contact from "./homeComponents/Contact";
import FAQSection from "./homeComponents/FAQSection";
import PricingSection from "./homeComponents/PricingSection";
import SponsorsSection from "./homeComponents/SponsorsSection";
import AchievementSection from "./homeComponents/AchievementSection";
import TestimonialSection from "./homeComponents/TestimonialSection";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home - Invento Wave</title>
      </Helmet>
      <div>
        <Banner />
        <AchievementSection />
        <PricingSection />
        <FAQSection />
        <SponsorsSection />
        <TestimonialSection />
        <Contact />
      </div>
    </>
  );
};

export default HomePage;
