import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  wishlistItems: localStorage.getItem('wishlistItems')
    ? JSON.parse(localStorage.getItem('wishlistItems'))
    : [],
  wishlistTotalQuantity: 0,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const itemIndex = state.wishlistItems.findIndex(
        (item) => item.vehicle === action.payload.vehicle
      );

      if (itemIndex >= 0) {
        state.wishlistItems[itemIndex].wishlistQuantity += 1;
        toast.info(`Wishlist of ${action.payload.vehicle} already exist`, {
          position: 'bottom-center',
        });
      } else {
        const temp = { ...action.payload, wishlistQuantity: 1 };
        state.wishlistItems.push(temp);
        toast.success(`${action.payload.vehicle} car added to wishlist`, {
          position: 'bottom-center',
        });
      }
      localStorage.setItem(
        'wishlistItems',
        JSON.stringify(state.wishlistItems)
      );
    },

    removeFromWishlist(state, action) {
      const nextWishlistItems = state.wishlistItems.filter(
        (wishlistItems) => wishlistItems.vehicle !== action.payload.vehicle
      );

      state.wishlistItems = nextWishlistItems;
      localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));

      toast.error(`${action.payload.vehicle} removed from wishlist`, {
        position: 'bottom-center',
      });
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
