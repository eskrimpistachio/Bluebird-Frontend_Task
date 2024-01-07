import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeartCirclePlus } from 'react-icons/fa6';

import { useDispatch } from 'react-redux';

import { addToWishlist } from '../store/wishlistSlice';

const ListCar = ({ type, search }) => {
  const dispatch = useDispatch();
  const history = useDispatch();

  const handleAddToWishlist = (ct) => {
    dispatch(addToWishlist(ct));
    history.push('/wishlist');
  };

  return (
    <>
      {type.map((f) => (
        <div key={f.id}>
          {f.car_type
            .filter((item) =>
              item.vehicle.toLowerCase().includes(search.toLowerCase())
            )
            .map((ct) => (
              <div
                key={ct.id}
                className="border-b-2 border-cust-blue mx-16 mb-16 "
              >
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-row gap-32 px-16 pb-8 "
                >
                  <div>
                    <img loading="lazy" src={ct.imageURL} alt="car image" />
                  </div>
                  <div className="flex flex-col justify-evenly text-2xl gap-4">
                    <h1 className="text-4xl font-bold">{ct.vehicle}</h1>
                    <h1>{ct.price}</h1>
                    <ul className="flex flex-col text-xl list-disc list-inside">
                      {ct.description.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    <div className="flex flex-row w-full gap-8">
                      <button onClick={() => handleAddToWishlist(ct)}>
                        <FaHeartCirclePlus className="text-2xl hover:scale-105" />
                      </button>
                      <Link
                        to={`/product/${ct.vehicle
                          .toLowerCase()
                          .replace(/ /g, '')}`}
                        className="bg-cust-blue text-white w-[200px] text-center py-1 rounded-lg hover:scale-105 text-base"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
        </div>
      ))}
    </>
  );
};

export default ListCar;
