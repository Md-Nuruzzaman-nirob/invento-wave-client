import banner from "../../../assets/hero-4-bg.jpg";
import Container from "../../../components/shared/Container";
import { IoIosPlay } from "react-icons/io";
import image from "../../../assets/home-img.7e9ac1088d98205bb2b2.png";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner})`,
      }}
      className="h-screen"
    >
      <Container className={"h-full"}>
        <div className="h-full flex flex-col lg:flex-row items-center gap-10 text-white">
          <div className="flex-1">
            <p className="opacity-70">Welcome to Invento Wave</p>
            <h3 className="text-4xl font-bold my-6">
              Your Partner in Streamlined Inventory Management
            </h3>
            <p className="mb-8 opacity-70">
              Experience seamless inventory management tailored to your business
              needs. Elevate productivity, optimize resources, and embrace a new
              era of efficiency. Join us on the journey to streamlined
              operations and success.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#pricing"
                className="btn btn-sm  bg-pink-600 hover:bg-pink-700 border-none text-white rounded-md"
              >
                Explore Now
              </a>
              <div className="divider divider-horizontal text-white bg-white w-1 rounded-md"></div>
              <a
                target="_blank"
                className="btn btn-sm btn-circle border-none flex justify-center items-center"
                href="https://youtu.be/K4TOrB7at0Y?si=FjGbSp6oKpwp6G-M"
                rel="noreferrer"
              >
                <IoIosPlay className="w-5 h-5" />
              </a>{" "}
              <p className="text-sm">Watch The Video</p>
            </div>
          </div>
          <div className="flex-1">
            <img className="" src={image} alt="" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
