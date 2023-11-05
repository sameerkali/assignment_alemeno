import { useState, useEffect } from "react";
import { getAllTestimonials } from "@/prisma/testimonials";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import clsx from "clsx";
import TestimonialSlide from "@/components/TestimonialSlide";
import MobileTabTestimonialSlide from "@/components/MobileTabTestimonialSlide";

const TestimonialSlider = ({ testimonials }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // AUTO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [testimonials?.length]);

  // HENDLE PREVIOUS BUTTON
  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1
    );
  };

  // HENDLE NEXT BUTTON
  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <section className='testimonial-slider py-10 md:py-20  min-h-screen 2xl:h-[calc(100vh-6rem)]'>
      <div className='testimonial-wrapper wrapper lg:gap-10 gap-5 grid grid-cols-5 lg:h-screen h-auto items-center overflow-hidden'>
        {/* LEFT SIDE FOR SECTION CONTENT */}
        <div className='slider-left flex flex-col gap-5 justify-start items-start col-span-5 lg:col-span-2 lg:p-5 overflow-hidden'>
          <div data-aos='fade-right' data-aos-duration='1000'>
            <span className='font-semibold text-gray-500 tracking-wider'>
              Testimonial
            </span>
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:leading-[3.5rem] xl:text-[2.5rem] 2xl:text-5xl text-gray-900 font-bold'>
              Inspiring Testimonials from Our Satisfied Students
            </h2>
            <p className='text-gray-700 text-[1.2rem] sm:text-[1.5rem] md:text-[1.5rem] tracking-wide'>
              Unlock Your Potential: Hear Inspiring Testimonials from Our
              Students and Experience the Life-Changing Power of Our Courses.
            </p>
            <div className='mt-5 flex gap-5'>
              <button
                onClick={handlePrevSlide}
                className='w-12 h-12 flex justify-center items-center rounded-full bg-gray-900 hover:bg-gray-700 text-white duration-300'
              >
                <FiChevronLeft
                  size={35}
                  color={"white"}
                  className='text-white'
                />
              </button>
              <button
                onClick={handleNextSlide}
                className='w-12 h-12 flex justify-center items-center rounded-full bg-gray-900 hover:bg-gray-700 text-white duration-300'
              >
                <FiChevronRight size={35} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FOR SLIDER CONTENT */}
        <div
          data-aos='fade-left'
          data-aos-duration='1000'
          className='slider-right col-span-5 lg:col-span-3 relative w-full lg:h-[30rem] h-auto overflow-hidden'
        >
          {/* MAIN SLIDER */}
          <div
            className='main-slider-wrapper hidden lg:flex justify-center items-center duration-[1.5s] w-[500vw] lg:h-[25rem] overflow-hidden'
            style={{
              transform: `translateX(-${100 * currentSlide}vw)`,
            }}
          >
            {testimonials?.map((testimonial, index) => (
              <TestimonialSlide
                key={testimonial.id}
                index={index}
                testimonial={testimonial}
                currentSlide={currentSlide}
              />
            ))}
          </div>

          {/* MOBILE VERSION SLIDER */}
          <div className='mobile-slider-wrapper lg:hidden flex justify-center items-center w-full overflow-hidden'>
            <MobileTabTestimonialSlide
              testimonial={testimonials[currentSlide]}
            />
          </div>

          {/* SLIDER LOWER CONTROLLER */}
          <div className='flex justify-center lg:mt-10 relative -z-10'>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={clsx(
                  `w-3 h-3 mx-2 rounded-full hover:bg-gray-400 duration-300 ${
                    index === currentSlide ? "bg-gray-700" : "bg-gray-300"
                  }`
                )}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;

export const getServerSideProps = async () => {
  const testimonials = await getAllTestimonials();

  const updatedTestimonials = testimonials.map((testimonial) => ({
    ...testimonial,
    updatedAt: testimonial.updatedAt.toString(),
    createdAt: testimonial.createdAt.toString(),
  }));

  return {
    props: {
      testimonials: updatedTestimonials,
    },
  };
};
