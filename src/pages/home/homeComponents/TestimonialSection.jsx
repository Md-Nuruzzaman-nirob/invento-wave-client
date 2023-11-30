import Container from "../../../components/shared/Container";
import useFetchSecure from "../../../hooks/useFetchSecure";
import { HashLoader } from "react-spinners";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import Title from "../../../components/shared/Title";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import {
  Autoplay,
  Keyboard,
  Scrollbar,
  Navigation,
  Pagination,
} from "swiper/modules";
import { FaUser } from "react-icons/fa";

const TestimonialSection = () => {
  const {
    data: testimonialData,
    isPending,
    isLoading,
  } = useFetchSecure(`/api/testimonials`, ["testimonialsData"]);

  if (isLoading || isPending) {
    return (
      <p className="h-screen flex items-center justify-center">
        <HashLoader color="#0ea5e9" />
      </p>
    );
  }

  console.log(testimonialData);

  return (
    <Container className={"mt-20 mb-28"}>
      {" "}
      {/* <AutoplaySlider play={true} cancelOnInteraction={false} interval={6000}>
        {testimonialData.map((testimonial) => (
          <div
            key={testimonial._id}
            className="w-full h-full bg-gradient-to-b from-[#352786] via-[#3a59af] to-[#352786] text-white flex items-center justify-center rounded-md"
          >
            <div className="text-center w-10/12 mx-auto mb-10 lg:mb-20">
              <div className="flex flex-col justify-center items-center">
                <Rating
                  style={{ maxWidth: 100 }}
                  value={testimonial.rating}
                  readOnly
                />
              </div>
              <p className="text-xs md:text-sm lg:text-base">
                {testimonial?.testimonial}
              </p>
              <h3 className="text-[#BB8506] text-xl font-medium mt-2">
                {testimonial.date}
              </h3>
              <h3 className="text-[#BB8506] text-xl font-medium mt-2">
                {testimonial.author}
              </h3>
            </div>
          </div>
        ))}
      </AutoplaySlider> */}
      <Title
        section={"TESTIMONIALS"}
        title={"What Our Clients Say About Invento Wave"}
        subTitle={
          "Dive into success with Invento Wave! Explore testimonials from satisfied clients, riding the wave of efficient inventory management. Join us as we optimize businesses with seamless inventory control, making Invento Wave the driving force for success."
        }
      />
      <Swiper
        slidesPerView={1}
        slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        scrollbar={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Keyboard, Scrollbar, Navigation, Pagination]}
        className="mySwiper"
      >
        {testimonialData?.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex items-center justify-center w-4/5 lg:w-3/5 mx-auto h-[300px] lg:h-[400px] my-20">
              <div className="bg-[#f8f9fa] flex flex-col items-center justify-center p-5 sm:p-10 rounded-md">
                <div className="w-16 h-16 sm:w-20 sm:h-20  overflow-hidden rounded-full mt-3">
                  <FaUser className="w-full h-full text-sky-500" />
                </div>

                <h3 className="text-sky-500 text-sm sm:text-base mt-3">
                  {review.author}
                </h3>
                <p className="text-xs mb-5"> {review.date}</p>

                <p className="text-xs md:text-sm lg:text-base text-center mb-5 md:mb-10">
                  {review.testimonial}
                </p>

                <div className="flex flex-col justify-center items-center">
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={review.rating}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default TestimonialSection;
