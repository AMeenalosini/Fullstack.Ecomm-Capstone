/*****************************************************************************************************************/
/****     This code is to render USER CART PAGE with cart items, subtotal, and order creation on checkout     ****/
/*****************************************************************************************************************/
/** Step 1: Import the required libraries/code                                                                 ***/
/** Step 2: Fetch cart data and related product info using RTK Query + Redux dispatch                          ***/
/** Step 3: Handle loading, error, and empty cart states                                                       ***/
/** Step 4: Display cart items with quantity update and calculate totals using the function "CartProduct"      ***/
/** Step 5: Handle checkout - create order and clear cart                                                      ***/
/**                                                                                                            ***/
/** Note: Update the below line to change the tax rate                                                         ***/
/** const tax = 0.07;                                                                                          ***/
/*****************************************************************************************************************/

/** Step 1: Import the required libraries/code  ***/
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails, initialState, resetUserDetails } from "../features/users/userDetailsSlice";
import { useSelector } from "react-redux";
import { ecommApi } from "../api/ecommApi";
import { useState, useEffect } from "react";
import { useUsercartQuery, 
         useAddtoorderMutation, 
         useUpdatecartMutation, 
         useDestroycartMutation } from "../api/ecommApi";
import { getUserid, getUserDetails } from "../features/users/userDetailsSlice";

/** Step 2: Create the UserCart component **/
function UserCart() {
  const UserID = useSelector(getUserid);                                        // Get logged-in user ID  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: cartData, isLoading, error } = useUsercartQuery(UserID, {
    skip: !UserID,                                                              // Skip fetch if no user
  });
  const [updateCart] = useUpdatecartMutation();                                 // Update quantity mutation
  const [createOrder] = useAddtoorderMutation();                                // Create order mutation
  const [destroyCart] = useDestroycartMutation();                               // Empty cart mutation
  const [detailedCart, setDetailedCart] = useState([]);                         // Cart with product info
  const [total, setTotal] = useState(0);                                        // Subtotal
  const [totalItems, setTotalItems] = useState(0);                              // Total quantity                          
  const [finaltotal, setFinalTotal] = useState(0);                              // Final amount incl. tax                    
  const [loadingProducts, setLoadingProducts] = useState(false);
  const tax = 0.07;                                                             // Flat tax rate

/** Step 3: Fetch product info for each cart item and calculate totals **/
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!cartData || cartData.length === 0) {
        setDetailedCart([]);
        setTotal(0);
        return;
      }
      setLoadingProducts(true);

      try {
        // Map over each cart item and fetch full product details using the product ID
        const productFetches = cartData.map(async (item) => {
          const result = await dispatch(
            ecommApi.endpoints.productbyid.initiate(item.product_id)
          ).unwrap();                                                             // Fetch product data using RTK Query & unwrap the response

          return {
            ...item,                                                              // Keep existing cart item data (like quantity, id)
            product: result,                                                      // Attach full product data (description, image, price, etc.)
            itemTotal: result.price * item.quantity,                              // Calculate item total cost (price * quantity)
          };
        });

        // Wait for all product fetches to complete
        const itemsWithDetails = await Promise.all(productFetches);
        // Save the enriched cart data (with product details and item totals) into local state
        setDetailedCart(itemsWithDetails);
        // Calculate the cart subtotal by summing up all item totals
        const cartTotal = itemsWithDetails.reduce((sum, item) => sum + item.itemTotal, 0);
        setTotal(cartTotal);
        // Calculate the total number of items in the cart
        const itemCount = itemsWithDetails.reduce((sum, item) => sum + item.quantity, 0);
        setTotalItems(itemCount);
        // Calculate final total amount after tax
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

  /** Step 4: Handle UI states **/
  if (!UserID) return <div><h2>Your cart is empty. Please log in to view your cart.</h2></div>;
  if (isLoading || loadingProducts) return <div><p>Loading your cart...</p></div>;
  if (error) return <div><h2>Something went wrong fetching your cart.</h2></div>;
  if (!detailedCart || detailedCart.length === 0) return <div><h2>Your cart is empty.</h2></div>;

  /** Step 5: Handle quantity updates **/
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
          await updateCart({ quantity: newQuantity, id: cartItemId }).unwrap();
    } catch (err) {
      console.error("Failed to update cart quantity", err);
    }
  };

  /** Step 6: Handle checkout - create order and clear cart **/
  const handleCheckout = async ( ) => {
    try {
      const response = await createOrder({ 
        user_id: UserID, 
        total_item: totalItems, 
        total_amount: total, 
        final_amount: finaltotal }).unwrap();
      
      const orderId = response?.order_id;

      await destroyCart({ user_id: UserID })                    // Empty the cart after order

      navigate("/order-summary", {
        state: { total, totalItems, finaltotal, tax, orderId }, // passing data to summary page
      });

    } catch (err) {
      console.error("Failed to add the order", err);
    }
  };

  /** Step 7: Render the Cart by calling the fucntion "CartProduct" **/ 
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


/*****************************************************************************************************************/
/****     This component renders each PRODUCT in the cart with quantity and navigation to product page        ****/
/*****************************************************************************************************************/

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


