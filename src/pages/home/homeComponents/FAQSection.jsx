import image from "../../../assets/faq.png";
import Container from "../../../components/shared/Container";
import Title from "../../../components/shared/Title";

const FAQSection = () => {
  return (
    <div className="py-20 bg-[#f8f9fa]">
      <Container>
        <Title
          section={"FAQS"}
          title="Frequently Asked Questions"
          subTitle="Quick answers to your common queries. Browse through our FAQ for helpful information. Need more assistance? Contact us anytime."
        />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-20 mt-10 sm:mt-20">
          <img
            data-aos="fade-right"
            data-aos-duration="500"
            src={image}
            alt=""
          />
          <div
            className="space-y-5"
            data-aos="fade-left"
            data-aos-duration="500"
          >
            <div className="collapse collapse-arrow bg-white shadow-sm rounded-md">
              <input type="checkbox" name="my-accordion-1" />
              <div className="collapse-title font-medium">
                What is Invento Wave?
              </div>
              <div className="collapse-content">
                <p>
                  Invento Wave is a comprehensive inventory management solution
                  designed to streamline and optimize your business&apos;s
                  inventory processes. It helps you keep track of your stock,
                  manage orders efficiently, and gain insights into your
                  inventory performance.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-white shadow-sm rounded-md">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title font-medium">
                How can Invento Wave benefit my business?
              </div>
              <div className="collapse-content">
                <p>
                  Invento Wave offers a range of benefits, including real-time
                  inventory tracking, order management, and insightful
                  reporting. By using our platform, you can minimize stockouts,
                  reduce excess inventory, and make data-driven decisions to
                  enhance overall efficiency.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-white shadow-sm rounded-md">
              <input type="checkbox" name="my-accordion-3" />
              <div className="collapse-title font-medium">
                Is Invento Wave suitable for small businesses?
              </div>
              <div className="collapse-content">
                <p>
                  Absolutely! Invento Wave is designed to cater to businesses of
                  all sizes. Whether you&apos;re a small startup or a larger
                  enterprise, our flexible inventory management system can adapt
                  to your specific needs.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-white shadow-sm rounded-md">
              <input type="checkbox" name="my-accordion-3" />
              <div className="collapse-title font-medium">
                How easy is it to integrate Invento Wave with my existing
                systems?
              </div>
              <div className="collapse-content">
                <p>
                  Integrating Invento Wave with your existing systems is
                  straightforward. Our platform supports seamless integration
                  with various software and can be customized to fit your
                  specific requirements. Our support team is also available to
                  assist you throughout the process.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-white shadow-sm rounded-md">
              <input type="checkbox" name="my-accordion-3" />
              <div className="collapse-title font-medium">
                Can I access Invento Wave from multiple devices?{" "}
              </div>
              <div className="collapse-content">
                <p>
                  Yes, Invento Wave is a cloud-based solution, which means you
                  can access it from any device with an internet connection.
                  Whether you&apos;re in the office, at home, or on the go, you
                  can manage your inventory effortlessly.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-white shadow-sm rounded-md">
              <input type="checkbox" name="my-accordion-3" />
              <div className="collapse-title font-medium">
                What kind of support is available if I encounter issues?{" "}
              </div>
              <div className="collapse-content">
                <p>
                  Our dedicated support team is ready to assist you. You can
                  reach out to us through our contact form on the website, and
                  we&apos;ll respond promptly to address any questions or
                  concerns you may have.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-white shadow-sm rounded-md">
              <input type="checkbox" name="my-accordion-3" />
              <div className="collapse-title font-medium">
                Does Invento Wave offer a free trial?{" "}
              </div>
              <div className="collapse-content">
                <p>
                  {" "}
                  Yes, we offer a free trial period for you to explore Invento
                  Wave and experience its features. Sign up on our website to
                  get started with the trial and see how our platform can
                  benefit your business.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-white shadow-sm rounded-md">
              <input type="checkbox" name="my-accordion-3" />
              <div className="collapse-title font-medium">
                How secure is my data on Invento Wave?{" "}
              </div>
              <div className="collapse-content">
                <p>
                  {" "}
                  Security is a top priority for us. Invento Wave employs robust
                  security measures to protect your data, including encryption
                  and regular backups. You can trust that your information is in
                  safe hands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQSection;
