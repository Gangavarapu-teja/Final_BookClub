import { Fragment,useEffect } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/Navbar/Navbar";
const Home = () => {

 


  useWindowScrollToTop();
  return (
    <Fragment>
      <NavBar></NavBar>
      <SliderHome />
      <Wrapper />
      {/* <Section
        title="Big Discount"
        bgColor="#f6f9fc"
        productItems={discoutProducts}
      />
      <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      /> */}
      {/* <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} /> */}
      <Footer></Footer>
    </Fragment>
  );
};

export default Home;
