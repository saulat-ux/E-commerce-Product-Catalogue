import React, { useEffect, useState } from "react";
import styles from "./shop.module.scss";
import axios from "axios";
import { API_URL } from "../../redux/features/prod/productService";
import CarouselItem from "../../components/carusel/CarouselItem";
import ShopItems from "../../components/shop/ShopItems";
import SearchBar from "../../components/SearchBar";
import Loader from "../../components/loader/Loader";

const Shop = () => {
  const [isLoading, setIsloading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(API_URL);

      const data = res.data;

      console.log("it is still running ");
      setProductData(data);
      setIsloading(false);
      window.scrollTo(0, 0);
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.center}>
        <div>
          <div className={styles.container}>
            <SearchBar onSearch={setSearchTerm} />
          </div>
          <div className={styles.main}>
            {productData &&
              productData
                ?.filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )

                .map((item) => (
                  <ShopItems
                    name={item.name}
                    price={item.price}
                    imageURL={item.imageURL}
                    description={item.description}
                    id={item.id}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
