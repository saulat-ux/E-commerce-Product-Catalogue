import React, { useEffect } from "react";
import "./caruosel.scss";
import { Link, useNavigate } from "react-router-dom";
import { shortenText } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { productData } from "./data";
import {
  RESET_PROD,
  sendProduct,
} from "../../redux/features/prod/productSlice";
import {
  RESET_CART,
  sendProductToCart,
} from "../../redux/features/cart/cartSlice";

// this is the frontend

const CarouselItem = ({ imageURL, name, price, description, id }) => {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleClick = async () => {
    const cartData = {
      imageURL,
      name,
      price,
    };
    await dispatch(sendProductToCart(cartData));
    window.location.reload();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    dispatch(RESET_CART());
  }, [isSuccess, dispatch, navigate]);
  return (
    <div className="carouselItem">
      <Link to={`/product-details/${id}`}>
        <img className="product--image" src={imageURL} alt="product" />
        <p className="price">{`${price}`}</p>
        <h4>{shortenText(name, 18)}</h4>
        <p className="--mb">{shortenText(description, 26)}</p>
      </Link>
      <button className="--btn --btn-block --btn-primary" onClick={handleClick}>
        Add To Cart
      </button>
    </div>
  );
};

export default CarouselItem;
