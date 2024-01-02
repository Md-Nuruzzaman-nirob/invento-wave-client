import Container from "../../../components/shared/Container";
import { FaUserPlus } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaSmile } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";

const AchievementSection = () => {
  return (
    <div className="bg-gradient-to-br from-[#3a59af] to-[#352786] text-white">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 h-[600px] lg:h-[500px]">
          <div
            className="flex flex-col justify-center items-center space-y-6"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <FaUserPlus className="w-20 h-20" />
            <h3 className="text-3xl font-bold">1200+</h3>
            <p className="font-medium">Fans</p>
          </div>
          <div
            className="flex flex-col justify-center items-center space-y-6"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <FaCartPlus className="w-20 h-20" />
            <h3 className="text-3xl font-bold">1500+</h3>
            <p className="font-medium">Total Sales</p>
          </div>
          <div
            className="flex flex-col justify-center items-center space-y-6"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <FaSmile className="w-20 h-20" />
            <h3 className="text-3xl font-bold">6931+</h3>
            <p className="font-medium">Happy Clients</p>
          </div>
          <div
            className="flex flex-col justify-center items-center space-y-6"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <GiAchievement className="w-20 h-20" />
            <h3 className="text-3xl font-bold">800</h3>
            <p className="font-medium">Won Prices</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AchievementSection;
