import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';

import axios from 'axios';

import { FaHeartCirclePlus } from 'react-icons/fa6';

import { useDispatch } from 'react-redux';
import { addToWishlist } from '../store/wishlistSlice';
import { addToBook } from '../store/bookSlice';

const ProductDetails = () => {
  const vehicleId = useParams();

  const [type, setType] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://private-f2fbfb-ridecar2.apiary-mock.com/vehicles'
      );
      setType(response.data.type);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dispatch = useDispatch();
  const history = useDispatch();

  const handleAddToWishlist = (ct) => {
    dispatch(addToWishlist(ct));
    history.push('/wishlist');
  };

  const handleAddToBook = (book) => {
    dispatch(addToBook(book));
    history.push('/mybook');
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <h1 className="text-center text-3xl font-bold my-8 text-cust-blue">
          Loading...
        </h1>
      ) : (
        <>
          {type.map((t) => (
            <div className="text-cust-blue mb-16" key={t.id}>
              {t.car_type
                .filter((item) =>
                  item.vehicle
                    .toLowerCase()
                    .replace(/ /g, '')
                    .includes(vehicleId.id)
                )
                .map((ct) => (
                  <div
                    key={ct.id}
                    className="border-b-2 border-cust-blue mx-16 mb-16 "
                  >
                    <h1 className="text-center text-4xl font-bold my-8 border-b-2 border-cust-blue pb-8">
                      Details Car
                    </h1>
                    <div className="flex flex-row gap-32 px-16 pb-8 ">
                      <div>
                        <img loading="lazy" src={ct.imageURL} alt="car image" />
                      </div>
                      <div className="flex flex-col justify-evenly text-2xl gap-4">
                        <h1 className="text-3xl font-bold">{ct.vehicle}</h1>
                        <h1>{ct.price}</h1>
                        <ul className="flex flex-col text-xl list-disc list-inside">
                          {ct.description.map((d) => (
                            <li key={Math.random()}>{d}</li>
                          ))}
                        </ul>
                        <div className="w-full flex flex-row gap-16">
                          <button onClick={() => handleAddToWishlist(ct)}>
                            <FaHeartCirclePlus className="text-2xl hover:scale-105" />
                          </button>
                          <button
                            className="bg-cust-blue text-white w-[150px] text-center py-1 rounded-lg hover:scale-105 text-base"
                            onClick={() => handleAddToBook(ct)}
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default ProductDetails;
