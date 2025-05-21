/*****************************************************************************************************************/
/****     This code is to render PRODUCT DETAIL PAGE and manage Add/Remove from cart functionality            ****/
/*****************************************************************************************************************/
/** Step 1: Import the required libraries/code                                                                 ***/
/** Step 2: Create a functional component ProductDetail                                                        ***/
/** Step 3: Fetch user cart items to check if product is already added                                         ***/
/** Step 4: Fetch and Extract product details from API                                                         ***/
/** Step 5: Check if product already exists in user cart                                                       ***/
/** Step 6: Handle ADD/REMOVE cart actions                                                                     ***/
/** Step 7: Render product detail page                                                                         ***/
/*****************************************************************************************************************/

/** Step 1: Import the required libraries/code ***/
import { useParams } from "react-router-dom";
import {
    useProductbyidQuery,
    useUsercartQuery,
    useAddtocartMutation,
    useDeletefromcartMutation,
} from "../api/ecommApi";
import { useSelector } from "react-redux";
import { getUserid } from "../features/users/userDetailsSlice";

/** Step 2: Create a functional component ProductDetail **/
function ProductDetail() {
  
  const UserID = useSelector(getUserid);                                // Get logged-in user ID
  const [addcart] = useAddtocartMutation();                             // Mutation to add to cart
  const [deletecart] = useDeletefromcartMutation();                     // Mutation to remove from cart
  const { productId } = useParams();
  /** Step 3: Fetch user's current cart items **/
  const { data: cartproduct = [] } = useUsercartQuery(UserID, {         // Get product ID from URL
    skip: !UserID,                                                      // Skip if user not logged in
  });

  /** Step 4: Fetch and Extract product details from API **/
  const { data , isLoading, error } = useProductbyidQuery(productId);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div>
        <h2>Something went wrong or no product found.</h2>
      </div>
    );
  }
  const { id, description, image_url, price } = data;

  /** Step 5: Check if product already exists in user cart **/
  const cartItem = cartproduct.find((product) => product.product_id === id); //returns an Object if match found
  const productadded = !!cartItem;                                      // converts cartItem to boolean (if Object is present, productadded = TRUE)
  const cartItemId = cartItem?.id;                                      // Cart item ID if exists

  /** Step 6: Handle ADD/REMOVE cart actions **/
  const handleAddToCart = async () => {
    if (productadded === true) {                                        // Remove from cart
      await deletecart({id : cartItemId}); 
    } else {
      const { data, error } = await addcart({                           // Add to cart
        user_id: UserID,
        product_id: id,
        quantity: 1, 
      });                                                               // Default to '1'
      
    }
  };

  /** Step 7: Render product detail page **/
  return (
  <section className="product-detail-wrapper">
    <div className="product-detail-layout">
      
      <div
        className="product-detail-image"
        style={{ backgroundImage: `url(${image_url})` }}
      />

     
      <div className="product-detail-info">
        <p className="product-detail-description">{description}</p>

        <div className="product-detail-price">
          <p>Price:</p>
          <p>${price}</p>
        </div>

        {UserID && (
          <div className="product-detail-action">
            <button
              className="product-detail-button"
              onClick={handleAddToCart}
            >
              {productadded ? 'Remove from cart' : 'Add to cart'}
            </button>
          </div>
        )}
      </div>
    </div>
  </section>
);

}

export default ProductDetail;


