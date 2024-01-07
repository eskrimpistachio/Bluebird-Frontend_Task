import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { addToBook, decreaseBook, getTotals, removeFromBook } from '../store/bookSlice';
import { useEffect } from 'react';

const MyBook = () => {
  const book = useSelector((state) => state.book);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals())
  }, [book]);

  const handleAddBook = (item) => {
    dispatch(addToBook(item));
  };

  const handleDecreaseBook = (item) => {
    dispatch(decreaseBook(item));
  };

  const handleRemoveFromBook = (item) => {
    dispatch(removeFromBook(item));
  };

  return (
    <>
      <Navbar />
      <div className="text-cust-blue">
        <h1 className="text-center text-4xl font-bold my-8 border-b-2 border-cust-blue mx-16 pb-8">
          My Bookings
        </h1>
        {book.bookItems.length === 0 ? (
          <>
            <div className="text-center mb-8">
              <p>Your bookings is currently empty...</p>
            </div>
          </>
        ) : (
          <>
            {book.bookItems.map((ct) => (
              <>
                <div className="flex flex-row gap-16 border-b-2 border-cust-blue mx-16 pb-16 mb-8">
                  <div>
                    <img loading="lazy" src={ct.imageURL} alt="car image" />
                  </div>
                  <div className="flex flex-col justify-evenly text-2xl gap-4">
                    <h1 className="text-3xl font-bold">{ct.vehicle}</h1>
                    <h1>Price : {ct.price}</h1>
                    <div className="flex flex-row w-full gap-8">
                      <h1>Quantity : </h1>
                      <div className="flex flex-row gap-4 text-lg px-4 rounded-lg border-2 border-cust-blue">
                        <button
                          onClick={() => handleDecreaseBook(ct)}
                          className="text-2xl"
                        >
                          -
                        </button>
                        <h6>{ct.bookQuantity}</h6>
                        <button
                          onClick={() => handleAddBook(ct)}
                          className="text-2xl"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row gap-16">
                      <Link
                        to={`/product/${ct.vehicle
                          .toLowerCase()
                          .replace(/ /g, '')}`}
                        className="bg-cust-blue text-white w-[200px] text-center py-1 rounded-lg hover:scale-105 text-lg"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleRemoveFromBook(ct)}
                        className="bg-red-500 text-white w-[200px] text-center py-1 rounded-lg hover:scale-105 text-lg"
                      >
                        Remove
                      </button>
                    </div>
                    
                  </div>
                </div>
              </>
            ))}
            <div className='flex font-bold text-3xl justify-end mx-16'>
              Total : IDR {book.bookTotalAmount.toLocaleString()}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyBook;
