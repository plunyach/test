import React from "react";
import { HomePage } from "../container/homePage";
import { HomePageMen, TopProducts } from "../container/topProducts";
import {
  LeatestWomenCollection,
  TopSallerMale,
} from "../container/leatestWomenCollection";
import { TopSallerWomen } from "../container/topSallerWomen";
import { Testimonial } from "../container/testimonila";
import { LeatestMenCollection } from "../container/leatestMenCollection";
import { ShowNowPayLater } from "../container/shopNow";
import { Footer } from "../container/footer";

const DashBoard = () => {
  return (
    <>
      {/* <Layout> */}
      <HomePage />
      <TopProducts />
      {/* <LeatestWomenCollection /> */}
      {/* <LeatestMenCollection /> */}
      <ShowNowPayLater />
      <Testimonial />
      <Footer />
      {/* </Layout> */}
    </>
  );
};
export default DashBoard;
