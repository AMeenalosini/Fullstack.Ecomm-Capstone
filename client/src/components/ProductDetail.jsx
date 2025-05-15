/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useParams } from "react-router-dom";
import {
    useProductsQuery,
    useRegisterMutation,
    useLoginMutation,
    useProductbyidQuery,
    useUsercartQuery,
    useAddtocartMutation,
    useDeletefromcartMutation,
    useUpdatecartMutation
} from "../api/ecommApi";
import { useSelector } from "react-redux";
import { getUserid, getUserDetails } from "../features/users/userDetailsSlice";

function ProductDetail() {
  
  const UserID = useSelector(getUserid);
  const [addcart] = useAddtocartMutation();
  const [deletecart] = useDeletefromcartMutation();

  const { productId } = useParams();

  const { data: cartproduct = [] } = useUsercartQuery(UserID, {
    skip: !UserID,
  });

  console.log("usercart:", cartproduct)

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

  const cartItem = cartproduct.find((product) => product.product_id === id);
  const productadded = !!cartItem;
  const cartItemId = cartItem?.id;

  const handleAddToCart = async () => {
    if (productadded === true) {
      console.log("Productfalse")
      console.log("cartproduct.id" ,cartItemId)
      await deletecart({id : cartItemId});
     
    } else {
      const { data, error } = await addcart({
        user_id: UserID,
        product_id: id,
        quantity: 1, // or however you manage quantity
      });
      
    }
  };


  return (
    <section className="detail">

        <div className="detail_intro">
          <h2>{description}</h2>
        </div>   
      
       <div className="detail_body">
        <div
          className="img_body"
          style={{ backgroundImage: `url(${image_url})` }}
        />
          <div className="flex">
            <p>Price:</p>
            <p>{price}</p>
          </div>
          
       </div>

       <div className="detail_intro">
       {UserID && (
        productadded === true ? (
            <button
              className="addtocart_button"
              onClick={() => handleAddToCart()}
            >
              Remove from cart
            </button>
        ) : (
          <button
              className="addtocart_button"
              onClick={() => handleAddToCart()}
            >
              Add to cart
            </button>
        )
          )}

        </div> 

    </section>
  );
}

export default ProductDetail;


