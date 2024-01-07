import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  bookItems: localStorage.getItem('bookItems')
    ? JSON.parse(localStorage.getItem('bookItems'))
    : [],
  bookTotalQuantity: 0,
  bookTotalAmount: 0,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addToBook(state, action) {
      const itemIndex = state.bookItems.findIndex(
        (item) => item.vehicle === action.payload.vehicle
      );

      if (itemIndex >= 0) {
        state.bookItems[itemIndex].bookQuantity += 1;
        toast.info(
          `added new quantity booking of ${action.payload.vehicle} car`,
          {
            position: 'bottom-center',
          }
        );
      } else {
        const temp = { ...action.payload, bookQuantity: 1 };
        state.bookItems.push(temp);
        toast.success(`${action.payload.vehicle} car added to your booking`, {
          position: 'bottom-center',
        });
      }
      localStorage.setItem('bookItems', JSON.stringify(state.bookItems));
    },

    removeFromBook(state, action) {
      const nextBookItems = state.bookItems.filter(
        (bookItems) => bookItems.vehicle !== action.payload.vehicle
      );

      state.bookItems = nextBookItems;
      localStorage.setItem('bookItems', JSON.stringify(state.bookItems));

      toast.error(`${action.payload.vehicle} removed from bookings`, {
        position: 'bottom-center',
      });
    },

    decreaseBook(state, action) {
      const itemIndex = state.bookItems.findIndex(
        (bookItems) => bookItems.vehicle === action.payload.vehicle
      );

      if (state.bookItems[itemIndex].bookQuantity > 1) {
        state.bookItems[itemIndex].bookQuantity -= 1;

        toast.info(`Decreased ${action.payload.vehicle} cars quantity`, {
          position: 'bottom-center',
        });
      } else if (state.bookItems[itemIndex].bookQuantity === 1) {
        const nextbookItems = state.bookItems.filter(
          (bookItems) => bookItems.vehicle !== action.payload.vehicle
        );

        state.bookItems = nextbookItems;

        toast.error(`removed ${action.payload.vehicle} cars from booking`, {
          position: 'bottom-center',
        });
      }

      localStorage.setItem('bookItems', JSON.stringify(state.bookItems));
    },

    getTotals(state, action) {
      let { total, quantity } = state.bookItems.reduce(
        (bookTotal, bookItem) => {
          const { price, bookQuantity } = bookItem;

          const priceString = price.replace(/\D/g, '');
          const intPrice = parseInt(priceString, 10);

          const itemTotal = intPrice * bookQuantity;

          bookTotal.total += itemTotal;
          bookTotal.quantity += bookQuantity;

          return bookTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.bookTotalQuantity = quantity;
      state.bookTotalAmount = total;
    },
  },
});

export const { addToBook, removeFromBook, decreaseBook, getTotals } =
  bookSlice.actions;

export default bookSlice.reducer;
