import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import { FaHeartCircleMinus } from 'react-icons/fa6';
import { removeFromWishlist } from '../store/wishlistSlice';
import { addToBook } from '../store/bookSlice';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleAddToBook = (book) => {
    dispatch(addToBook(book));
    history.push('/mybook');
  };

  const handleRemoveFromWishlist = (item) => {
    dispatch(removeFromWishlist(item));
  };

  return (
    <>
      <Navbar />
      <div className="text-cust-blue">
        <h1 className="text-center text-4xl font-bold my-8 border-b-2 border-cust-blue mx-16 pb-8">
          Wishlist
        </h1>
        {wishlist.wishlistItems.length === 0 ? (
          <>
            <div className="text-center mb-8">
              <p>Your wishlist is currently empty...</p>
            </div>
          </>
        ) : (
          <>
            {wishlist.wishlistItems.map((ct) => (
              <>
                <div className="flex flex-row gap-16 border-b-2 border-cust-blue mx-16 pb-16 mb-8">
                  <div>
                    <img loading="lazy" src={ct.imageURL} alt="car image" />
                  </div>
                  <div className="flex flex-col justify-evenly text-2xl gap-4">
                    <h1 className="text-3xl font-bold">{ct.vehicle}</h1>
                    <h1>{ct.price}</h1>
                    <ul className="flex flex-col text-xl list-disc list-inside">
                      {ct.description.map((d) => (
                        <li>{d}</li>
                      ))}
                    </ul>
                    <div className="flex flex-row gap-8">
                      <button onClick={() => handleRemoveFromWishlist(ct)}>
                        <FaHeartCircleMinus className="text-3xl hover:scale-105" />
                      </button>
                      <button
                        className="bg-cust-blue text-white w-[150px] text-center py-1 rounded-lg hover:scale-105 text-base"
                        onClick={() => handleAddToBook(ct)}
                      >
                        Book
                      </button>
                      <Link
                        to={`/product/${ct.vehicle
                          .toLowerCase()
                          .replace(/ /g, '')}`}
                        className="bg-cust-blue text-white w-[200px] text-center py-1 rounded-lg hover:scale-105 text-lg"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
