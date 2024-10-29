import React, { useEffect, useState } from "react";
import "./shop.scss";
import { Link, useNavigate } from "react-router-dom";
import { shortenText } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_PROD,
  sendProduct,
} from "../../redux/features/prod/productSlice";
import {
  RESET_CART,
  sendProductToCart,
} from "../../redux/features/cart/cartSlice";
import { API_URL } from "../../redux/features/cart/cartService";
import axios from "axios";

// this is the frontend

const ShopItems = ({ id, imageURL, price, name }) => {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleClick = async () => {
    const cartData = {
      imageURL,
      price,
      name,
    };

    await dispatch(sendProductToCart(cartData));

    window.location.reload();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/shop");
      console.log("it is still running ");
    }
    dispatch(RESET_CART());
  }, [isSuccess, dispatch, navigate]);
  return (
    <div className="carouselItem">
      <Link to={`/product-details/${id}`}>
        <img className="product--image" src={imageURL} alt="product" />
        <p className="price">${price}</p>
        <h4>{shortenText(name, 18)}</h4>
      </Link>

      <button className="--btn --btn-block --btn-primary" onClick={handleClick}>
        Add To Cart
      </button>
    </div>
  );
};

export default ShopItems;
