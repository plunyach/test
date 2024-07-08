import React from "react";
import "../styles/testimonila.css";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import TestimonialImg1 from "../images/testimonialImg1.png";
import StarSvg from "../svg/star.svg";

const widthOutput = window.screen.width;
const contentFontSize = (1.2 / 100) * widthOutput;

const FeedBackArray = [
  {
    name: "GC Thennavan",
    content:
      "To me Sizeupp's  clothing, is the final frontier, for my  preference in wear and personal attire and having locked on to their brand, after a great friend's intro, i am absolutely satisfied with their entire line up, with special reference to their plus size make overs.",
    img: TestimonialImg1,
    star: StarSvg,
  },
  {
    name: "Vipul Agarwal",
    content:
      "Sizeupp collection of clothing is not only stylish and trendy but also incredibly flattering for all body types. Finally, I can browse through a wide range of options that cater specifically to my size, without compromising on style or quality.",
    img: TestimonialImg1,
    star: StarSvg,
  },
  {
    name: "Deepak Gupta",
    content:
      "Sizeupp. has truly transformed my shopping experience! As someone who wears plus sizes, finding trendy and well-fitting clothes used to be a challenge. Sizeupp offers a fantastic selection of stylish clothing specifically tailored for plus-size individuals.",
    img: TestimonialImg1,
    star: StarSvg,
  },






];

// const options = {
//   margin: 10,
//   responsiveClass: true,
//   nav: false,
//   dots: true,
//   autoplay: false,
//   responsive: {
//     0: {
//       items: 1,
//     },
//     600: {
//       items: 2,
//     },
//     1000: {
//       items: 3,
//     }
//   },

//   loop: true,
//   margin: 10,
//   nav: true,
//   autoplay: true, 
//   autoplayTimeout: 3000, 
//   autoplayHoverPause: true, 
// };
const options = {
  margin: 10,
  responsiveClass: true,
  nav: true,
  dots: true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    }
  },
  loop: true,
};

export const Testimonial = () => {
  return (
    <>
      <div className="mainDiv_Testimonial">
        <div
          className="InnerUpperMainDiv_TestiMonila"
        >
          <h1 className="text-3xl text-bold">
            see what our customers says
          </h1>
          <h2
            style={{
              fontSize: `${contentFontSize}px`,
            }}
          ></h2>
        </div>
        <div className="container">
        <div className="InnerLowerMainDiv_Testimonial">
          <div>
            <OwlCarousel className='owl-carousel' {...options}>
              {FeedBackArray.map((item, id) => (
                <div className='item'>
                  <div className="aliceMainDiv_Testimonial">
                    <div className="aliceInnerMainDiv_Testimonial">
                      {/* <div className="aliceImage_Testimonial">
                        <img src={item.img} alt={item.name} />
                      </div> */}
                      <div className="aliceContent_Testimonial">
                        <div className="aliceContentUpperDiv_Testimonial">
                          <h1 className="text-base">
                            {item.content}
                          </h1>
                        </div>
                        <div className="aliceContentLowerDiv_Testimonial">
                          <h2 className="text-sm">
                            {item.name}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};