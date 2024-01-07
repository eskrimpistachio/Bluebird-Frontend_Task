import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { motion } from 'framer-motion';

import Navbar from '../components/Navbar';
import ListCar from '../components/ListCar';
import FilterButton from '../components/FilterButton';

import { FaHeartCirclePlus } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

import { addToWishlist } from '../store/wishlistSlice';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);

  const [filter, setFilter] = useState([]);
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const [hiddenCategory, setHiddenCategory] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://private-f2fbfb-ridecar2.apiary-mock.com/vehicles'
      );
      setCategory(response.data.category);
      setType(response.data.type);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();
  const history = useDispatch();

  const handleAddToWishlist = (ct) => {
    dispatch(addToWishlist(ct));
    history.push('/wishlist');
  };

  return (
    <>
      <Navbar
        hiddenCategory={hiddenCategory}
        setHiddenCategory={setHiddenCategory}
        setSearch={setSearch}
      />
      {loading ? (
        <h1 className="text-center text-3xl font-bold my-8 text-cust-blue">
          Loading...
        </h1>
      ) : (
        <>
          <div className="h-full flex flex-col gap-10 py-4">
            <h1 className="text-center text-4xl font-bold pt-4 text-cust-blue">
              Homepage
            </h1>
            <div className="bg-cust-blue mx-16 rounded-lg py-2 overflow-hidden cursor-grab">
              <div className="flex flex-row justify-around">
                {category.map((c) => (
                  <div key={c.id}>
                    <FilterButton
                      category={c}
                      setFilter={setFilter}
                      active={active}
                      setActive={setActive}
                      type={type}
                      hiddenCategory={hiddenCategory}
                      setHiddenCategory={setHiddenCategory}
                    />
                  </div>
                ))}
              </div>
            </div>

            <section className="text-cust-blue font-semibold">
              {hiddenCategory ? (
                <ListCar search={search} type={type} />
              ) : (
                <>
                  {filter.map((f) => (
                    <motion.div
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-row justify-evenly"
                      key={f.id}
                    >
                      {f.car_type.map((ct) => (
                        <div className="flex flex-col gap-2" key={ct.id}>
                          <img
                            loading="lazy"
                            src={ct.imageURL}
                            alt="car image"
                          />
                          <h1 className="text-center font-bold text-2xl">
                            {ct.vehicle}
                          </h1>
                          <div className="flex flex-row w-full justify-around">
                            <button onClick={() => handleAddToWishlist(ct)}>
                              <FaHeartCirclePlus className="text-3xl hover:scale-105" />
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
                      ))}
                    </motion.div>
                  ))}
                </>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
