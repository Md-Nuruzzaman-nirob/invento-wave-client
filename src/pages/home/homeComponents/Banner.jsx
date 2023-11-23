import banner from "../../../assets/hero-4-bg.jpg";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner})`,
      }}
      className="h-screen"
    ></div>
  );
};

export default Banner;
