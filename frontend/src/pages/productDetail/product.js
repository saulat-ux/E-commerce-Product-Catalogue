import React from "react";
import styles from "./ProductDetails.module.scss";
import { sendProductToCart } from "../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Product = ({
  name,
  imageURL,
  id,
  price,
  description,
  color,
  sku,
  sold,
}) => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const cartData = {
      imageURL,
      price,
      name,
    };

    await dispatch(sendProductToCart(cartData));
    window.location.reload();
  };
  return (
    <div>
      <div>
        <Link to="/shop">
          <button className={styles.theBTN}>back to Products</button>
        </Link>
      </div>
      <div className={styles.productDetails}>
        <div className={styles.imageW}>
          <img className={styles.theimg} src={imageURL} alt="" />
        </div>
        <div className="product-details">
          <h3>{name}</h3>
          <div className={styles.horizontal}></div>
          <div className={styles.arrange}>
            <p>
              <b>Price:</b>
            </p>
            <p>{price}</p>
          </div>
          <div className={styles.horizontal}></div>

          <div className={styles.arrange}>
            <p>
              <b>SKU:</b>
            </p>
            <p className={styles.margin}>{sku}</p>
          </div>
          <div className={styles.horizontal}></div>

          <div className={styles.arrange}>
            <p>
              <b>Brand:</b>
            </p>
            <p>samsung</p>
          </div>
          <div className={styles.horizontal}></div>

          <div className={styles.arrange}>
            <p>
              <b>Color:</b>
            </p>
            <p>{color}</p>
          </div>
          <div className={styles.horizontal}></div>

          <div className={styles.arrange}>
            <p>
              <b>Quantity in stock:</b>
            </p>
            <p>10</p>
          </div>
          <div className={styles.horizontal}></div>

          <div className={styles.arrange}>
            <p>
              <b>Sold:</b>
            </p>
            <p>{sold}</p>
          </div>
          <div className={styles.horizontal}></div>
          <div className={styles.btnST}>
            <button className={styles.theBTN} onClick={handleClick}>
              Add to Cart
            </button>

            <button className={styles.theBTN}>Add to wishlist</button>
          </div>

          <h4>Product Description</h4>
          <ul className={styles.ul}>
            <li>{description}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;
