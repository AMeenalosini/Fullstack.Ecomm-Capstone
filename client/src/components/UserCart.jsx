import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails, initialState, resetUserDetails } from "../features/users/userDetailsSlice";
import { useSelector } from "react-redux";
import { ecommApi } from "../api/ecommApi";
import { useState, useEffect } from "react";
import { useUsercartQuery, useAddtoorderMutation, useUpdatecartMutation, useDestroycartMutation } from "../api/ecommApi";
import { getUserid, getUserDetails } from "../features/users/userDetailsSlice";

function UserCart() {
  const UserID = useSelector(getUserid);
  const { data: cartData, isLoading, error } = useUsercartQuery(UserID, {
    skip: !UserID,
  });
  const [updateCart] = useUpdatecartMutation();
  const [createOrder] = useAddtoorderMutation();
  const [destroyCart] = useDestroycartMutation();
  const [detailedCart, setDetailedCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [finaltotal, setFinalTotal] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tax = 0.07;

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!cartData || cartData.length === 0) {
        setDetailedCart([]);
        setTotal(0);
        return;
      }

      setLoadingProducts(true);

      try {
        const productFetches = cartData.map(async (item) => {
          const result = await dispatch(
            ecommApi.endpoints.productbyid.initiate(item.product_id)
          ).unwrap();

          return {
            ...item,
            product: result,
            itemTotal: result.price * item.quantity,
          };
        });

        const itemsWithDetails = await Promise.all(productFetches);
        setDetailedCart(itemsWithDetails);

        const cartTotal = itemsWithDetails.reduce((sum, item) => sum + item.itemTotal, 0);
        setTotal(cartTotal);
        const itemCount = itemsWithDetails.reduce((sum, item) => sum + item.quantity, 0);
        setTotalItems(itemCount);
        const finalamount = cartTotal + (tax * cartTotal);
        setFinalTotal(finalamount);

      } catch (err) {
        console.error("Failed to fetch product details", err);
        setDetailedCart([]);
        setTotal(0);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProductDetails();
  }, [cartData]);

  // UI states
  if (!UserID) return <div><h2>Your cart is empty. Please log in to view your cart.</h2></div>;
  if (isLoading || loadingProducts) return <div><p>Loading your cart...</p></div>;
  if (error) return <div><h2>Something went wrong fetching your cart.</h2></div>;
  if (!detailedCart || detailedCart.length === 0) return <div><h2>Your cart is empty.</h2></div>;

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      console.log("cartItemId", cartItemId)
      console.log("newQuantity", newQuantity)
      await updateCart({ quantity: newQuantity, id: cartItemId }).unwrap();
      // Re-fetch cartData to update UI
      // You may trigger refetch here manually if needed
    } catch (err) {
      console.error("Failed to update cart quantity", err);
    }
  };

  const handleCheckout = async ( ) => {
    try {
      const response = await createOrder({ 
        user_id: UserID, 
        total_item: totalItems, 
        total_amount: total, 
        final_amount: finaltotal }).unwrap();
      
      const orderId = response?.order_id;

      await destroyCart({ user_id: UserID })

      navigate("/order-summary", {
        state: { total, totalItems, finaltotal, tax, orderId }, // passing data to summary page
      });

    } catch (err) {
      console.error("Failed to add the order", err);
    }
  };

  return (
    <section className="cart">
      <div className="cart_box">
        <div className="cart_intro">
          <h2>Your Cart</h2>
        </div>

        <div className="cart_body">
        {detailedCart.map((item) => (
          <CartProduct
            key={item.id}
            cartItemId={item.id}
            product={item.product}
            quantity={item.quantity}
            itemTotal={item.itemTotal}
            onQuantityChange={handleQuantityChange}
          />
        ))}
        <hr />
          <h2>Total: ${total}</h2>
          <button 
            onClick={handleCheckout} 
            style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', fontSize: '1rem' }}
          >
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
}


/************************************************/
// Component to fetch and display product details
/************************************************/

function CartProduct({ product, quantity, itemTotal, cartItemId, onQuantityChange }) {

  const handleViewProduct = () => {
    navigate(`/products/${product.id}`);
  };

  const navigate = useNavigate();

  return (
    <div className="product_card">
      <img src={product.image_url} alt={product.name} style={{ width: "100px" }} />
      <div>
        <h3>{product.description}</h3>
        <p>Price: ${product.price}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={() => onQuantityChange(cartItemId, quantity - 1)} disabled={quantity <= 1}> - </button>
          <span>Quantity: {quantity}</span>
          <button onClick={() => onQuantityChange(cartItemId, quantity + 1)}> + </button>
        </div>
        <p><strong>Item Total: ${itemTotal}</strong></p>
        <button onClick={handleViewProduct}>
          View Product
        </button>
      </div>
    </div>
  );
}


export default UserCart;


