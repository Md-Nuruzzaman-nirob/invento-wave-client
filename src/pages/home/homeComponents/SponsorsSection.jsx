import Container from "../../../components/shared/Container";
import Title from "../../../components/shared/Title";
import logo from "../../../assets/download.png";
import logo2 from "../../../assets/download (1).png";
import logo3 from "../../../assets/download (2).png";
import logo4 from "../../../assets/download (3).png";

const SponsorsSection = () => {
  return (
    <Container className={"py-20"}>
      <Title
        section={"SPONSORS"}
        title={"Official Sponsors"}
        subTitle={
          "Proud to be the Exclusive Solutions Partner of Invento Wave, supporting innovation and efficiency in inventory management."
        }
      />
      <div className="flex justify-evenly lg:justify-between flex-wrap  gap-5 my-20">
        <img className="" src={logo} alt="" />
        <img src={logo2} alt="" />
        <img src={logo3} alt="" />
        <img src={logo4} alt="" />
      </div>
    </Container>
  );
};

export default SponsorsSection;
