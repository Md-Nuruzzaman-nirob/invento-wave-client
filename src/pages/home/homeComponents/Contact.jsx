import Container from "../../../components/shared/Container";
import Title from "../../../components/shared/Title";

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
        <div className="flex flex-col lg:flex-row items-center gap-20 mt-10">
          <div className="">
            <h3>jksdfbgja</h3>
          </div>
          <form className="flex-1">
            <div className="flex items-center justify-between gap-5">
              <div className="flex flex-col w-full">
                <label className="mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name=""
                  id="name"
                  placeholder="Enter your name..."
                  className="px-3 py-2 border border-blue-600/30 outline-none focus:border-blue-600 rounded-md"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="mb-2" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  name=""
                  id="email"
                  placeholder="Enter your email..."
                  className="px-3 py-2 border border-blue-600/30 outline-none focus:border-blue-600 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col w-full my-4">
              <label className="mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                name=""
                id="subject"
                placeholder="Enter subject..."
                className="px-3 py-2 border border-blue-600/30 outline-none focus:border-blue-600 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2" htmlFor="textAria">
                Message
              </label>
              <textarea
                name=""
                id="textAria"
                cols="30"
                rows="4"
                className="px-3 py-2 border border-blue-600/30 outline-none focus:border-blue-600 rounded-md"
                placeholder="Enter your message..."
              ></textarea>
            </div>
            <div className="text-center mt-10">
              <input
                className="btn btn-accent rounded-md"
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
