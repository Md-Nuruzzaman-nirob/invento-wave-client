import Container from "../../../components/shared/Container";
import Title from "../../../components/shared/Title";
import { AiTwotoneMail } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="py-20 bg-[#f8f9fa]">
      <Container>
        <Title
          section="CONTACT"
          title="Have questions or need assistance?"
          subTitle="Reach out to our dedicated team. We're here to help you make
            the most of your Inventory management experience. Your efficient
            inventory management journey starts with a simple message or call."
        />
        <div className="flex flex-col lg:flex-row gap-10 md:gap-20 lg:gap-40 mt-10 md:mt-20">
          <div className="space-y-10">
            <div className="flex items-center gap-6">
              <AiTwotoneMail className="w-8 h-8 text-sky-400" />
              <div className="">
                <h3 className="font-bold opacity-90">Email</h3>
                <p className="font-semibold opacity-60">example@abc.com</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <BsPhone className="w-8 h-8 text-sky-400" />
              <div className="">
                <h3 className="font-bold opacity-90">Phone</h3>
                <p className="font-semibold opacity-60">012-345-6789</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <FaLocationArrow className="w-10 h-10 text-sky-400" />
              <div className="">
                <h3 className="font-bold opacity-90">Address</h3>
                <p className="font-semibold opacity-60">
                  20 Rollins Road Cotesfield, NE 68829
                </p>
              </div>
            </div>
          </div>

          {/* form part */}
          <form className="w-full">
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="flex-1">
                <label className="font-bold opacity-80" htmlFor="">
                  Name
                </label>
                <input
                  className="w-full mt-2 px-4 py-2 border border-gray-800/30 outline-none focus:border-sky-500 font-semibold opacity-80 rounded-md"
                  placeholder="Enter your name..."
                  type="text"
                  name=""
                  id=""
                />
              </div>

              <div className="flex-1">
                <label className="font-bold opacity-80" htmlFor="">
                  Email address
                </label>
                <input
                  className="w-full mt-2 px-4 py-2 border border-gray-800/30 outline-none focus:border-sky-500 font-semibold opacity-80 rounded-md"
                  placeholder="Enter your email..."
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>
            <div className="flex flex-col my-5">
              <label className="font-bold opacity-80" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                name=""
                id="subject"
                placeholder="Enter subject..."
                className="w-full mt-2 px-3 py-2 border border-gray-800/30 outline-none focus:border-sky-500 font-semibold opacity-80 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="font-bold opacity-80" htmlFor="textAria">
                Message
              </label>
              <textarea
                name=""
                id="textAria"
                cols="30"
                rows="4"
                className="w-full mt-2 px-3 py-2 border border-gray-800/30 outline-none focus:border-sky-500 font-semibold opacity-80 rounded-md"
                placeholder="Enter your message..."
              ></textarea>
            </div>
            <div className="text-center mt-12">
              <input
                className="btn bg-sky-400 hover:bg-sky-500 text-lg text-white rounded-md"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
