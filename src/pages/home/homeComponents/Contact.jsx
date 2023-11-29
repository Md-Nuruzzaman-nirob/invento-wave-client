import Container from "../../../components/shared/Container";
import Title from "../../../components/shared/Title";
import { AiTwotoneMail } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const toastId = toast.loading("Progress...");

    emailjs
      .sendForm(
        "service_v1q76ij",
        "template_ajxhy9f",
        form.current,
        "FJ7RCT2to6rvsU5sS"
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            toast.success("Your message sent successfully !", {
              id: toastId,
            });
            e.target.reset();
          }
        },
        (error) => {
          toast.error(error, { id: toastId });
        }
      );
  };

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
          <div
            className="flex-[3] space-y-10"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="flex items-center gap-6">
              <AiTwotoneMail className="w-8 h-8 text-pink-600" />
              <div className="">
                <h3 className="font-semibold opacity-90">Email</h3>
                <p className="text-sm opacity-60">nmd28573@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <BsPhone className="w-8 h-8 text-pink-600" />
              <div className="">
                <h3 className="font-semibold opacity-90">Phone</h3>
                <p className="text-sm  opacity-60">012-345-6789</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <FaLocationArrow className="w-8 h-8 text-pink-600" />
              <div className="">
                <h3 className="font-semibold opacity-90">Address</h3>
                <p className="text-sm opacity-60">Dhaka Bangladesh</p>
              </div>
            </div>
          </div>

          {/* form part */}
          <form ref={form} onSubmit={sendEmail} className="flex-[5]">
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="flex-1">
                <label className="font-medium opacity-80" htmlFor="">
                  Your Name
                </label>
                <input
                  className="w-full mt-2 px-4 py-2 border border-gray-800/10 outline-none focus:border-pink-600 opacity-80 rounded-md"
                  placeholder="Enter your name..."
                  type="text"
                  name="from_name"
                  id=""
                  required
                />
              </div>

              <div className="flex-1">
                <label className="font-medium opacity-80" htmlFor="">
                  Your Email
                </label>
                <input
                  className="w-full mt-2 px-4 py-2 border border-gray-800/10 outline-none focus:border-pink-600 opacity-80 rounded-md"
                  placeholder="Enter your email..."
                  type="text"
                  name="from_email"
                  id=""
                  required
                />
              </div>
            </div>
            <div className="flex flex-col w-full mt-5">
              <label className="font-medium opacity-80" htmlFor="textAria">
                Your Message
              </label>
              <textarea
                name="message"
                id="textAria"
                cols="30"
                rows="6"
                className="w-full mt-2 px-3 py-2 border border-gray-800/10 outline-none focus:border-pink-600 opacity-80 rounded-md"
                placeholder="Enter your message..."
                required
              ></textarea>
            </div>
            <div
              className="text-center mt-8"
              data-aos="flip-up"
              data-aos-duration="500"
            >
              <input
                className="btn btn-sm px-10 bg-pink-600 hover:bg-pink-700 text-lg text-white rounded-md font-normal"
                type="submit"
                value="Sent"
              />
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
