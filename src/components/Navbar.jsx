import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

export default function Navbar({ setSearch, setHiddenCategory, hiddenCategory }) {
  const [open, setOpen] = useState(false);
  // const [search, setSearch] = useState('');

  return (
    <>
      <nav
        onClick={() => {
          setOpen(!open);
        }}
        className="flex flex-row bg-cust-blue px-16 py-4 sticky top-0"
      >
        <div className="flex-row w-full text-white justify-around z-20 flex font-medium ">
          <ul className="flex flex-row gap-16 w-full">
            <li className="hover:border-b border-white">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:border-b border-white ">
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li className="hover:border-b border-white ">
              <Link to="/mybook">MyBook</Link>
            </li>
          </ul>
          <div className="bg-white flex flex-row rounded-lg px-2 py-1 gap-2 border-white text-cust-blue">
            <FaSearch className="text-cust-blue mt-1" />
            <form>
              <input
                className="input:border-none"
                type="text"
                placeholder="Search Car.."
                onChange={(e) => setSearch(e.target.value)}
                onClick={()=> setHiddenCategory(true)}
              />
            </form>
          </div>
        </div>

        {/* For Mobile Responsive */}
        {/* <div
          className="flex lg:hidden text-2xl py-2 px-8 z-20"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? <IoMdClose /> : <GiHamburgerMenu />}
        </div>
        <div className="lg:hidden flex flex-col font-medium mt-10">
          <ul className="flex flex-col justify-evenly gap-8">
            <li>
              <Link
                onClick={() => {
                  setOpen(!open);
                }}
                href="/wishlist"
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setOpen(!open);
                }}
                href="/mybook"
              >
                MyBook
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setOpen(!open);
                }}
                href="/searchform"
              >
                Search Form
              </Link>
            </li>
          </ul>
        </div> */}
        {/* For Mobile Responsive */}
      </nav>
    </>
  );
}
