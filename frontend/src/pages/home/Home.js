import React, { useEffect, useState } from "react";
import Slider from "../../components/slider/Slider";
import HomeInfoBox from "./HomeInfoBox";
import "./home.scss";
// import { productData } from '../../components/carusel/data'
import CarouselItem from "../../components/carusel/CarouselItem";
import ProductCarousels from "../../components/carusel/Carousel";
import ProductCategory from "./ProductCategory";
import axios from "axios";
import { API_URL } from "../../redux/features/prod/productService";

const PageHeading = ({ heading, btnText }) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button className="--btn">{btnText}</button>
      </div>
      <div className="--hr"></div>
    </>
  );
};

const Home = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(API_URL);
      const data = res.data;
      // console.log(data)
      setProductData(data);
    };
    fetchData();
  }, []);
  // part under construction

  const productss =
    productData &&
    productData?.map((item) => (
      <div key={item.id}>
        <CarouselItem
          name={item.name}
          imageURL={item.imageURL}
          price={item.price}
          description={item.description}
          id={item.id}
        />
      </div>
    ));

  return (
    <>
      <Slider />
      <section>
        <div className="container">
          <HomeInfoBox />
          <PageHeading heading={"Latest Products"} btnText={"Shop Now>>>"} />
          <ProductCarousels products={productss} />
        </div>
      </section>

      <section className="--bg-grey">
        <div className="container">
          <h3>Categories</h3>
          <ProductCategory />
        </div>
      </section>

      <section>
        <div className="container">
          <PageHeading heading={"Mobile Phones"} btnText={"Shop Now>>>"} />
          <ProductCarousels products={productss} />
        </div>
      </section>
    </>
  );
};

export default Home;
