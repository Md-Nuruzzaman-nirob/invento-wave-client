import banner from "../../../assets/hero-4-bg.jpg";
import Container from "../../../components/shared/Container";
import { IoIosPlay } from "react-icons/io";
import image from "../../../assets/home-img.7e9ac1088d98205bb2b2.png";
import Button from "../../../components/shared/Button";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner})`,
      }}
      className="min-h-screen"
    >
      <Container>
        <div className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center gap-5 lg:gap-10 text-white py-28">
          <div
            className="flex-[7]"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold">
              Your Partner in Streamlined Inventory Management
            </h1>
            <p className="text-sm sm:text-base opacity-80 text-justify sm:text-left my-5 lg:my-8 xl:my-10">
              Experience seamless inventory management tailored to your business
              needs. Elevate productivity, optimize resources, and embrace a new
              era of efficiency. Explore with us on the journey to streamlined
              operations and success.
            </p>
            <div className="flex items-center gap-3">
              <a href="#pricing">
                <Button className="h-10 px-5">Explore Now</Button>
              </a>
              <div className="divider divider-horizontal bg-white/70 w-1 rounded-full"></div>
              <a
                target="_blank"
                className="btn btn-sm btn-circle border-none flex justify-center items-center bg-red-600 hover:bg-red-500 text-white"
                href="https://youtu.be/K4TOrB7at0Y?si=FjGbSp6oKpwp6G-M"
                rel="noreferrer"
              >
                <IoIosPlay className="w-5 h-5" />
              </a>

              <p className="text-sm">Watch The Video</p>
            </div>
          </div>
          <div
            className="flex-[6] flex items-center justify-center mb-5 sm:mb-10 lg:mb-0"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <img className="w-fit md:w-3/4 lg:w-fit" src={image} alt="" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
