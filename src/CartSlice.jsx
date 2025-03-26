import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
      
        console.log("Current cart items:", JSON.parse(JSON.stringify(state.items)));
        console.log("Adding item:", action.payload);
      
        // Ensure the 'name' is clean and trimmed
        const trimmedName = name.trim(); 
      
        // Debugging: Log names of all existing items before finding
        console.log("Existing item names:", state.items.map(item => item.name));
      
        // Find existing item
        const existingItem = state.items.find(item => item.name.trim() === trimmedName);
        
        console.log("Existing item found:", existingItem);
      
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.items.push({ name, image, cost, quantity: 1 });
        }
        state.totalQuantity += 1;
        
      },
    removeItem: (state, action) => {

      const item = state.items.find((item) =>item.name.trim() === action.payload.name);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter((item) => item.name.trim() !== action.payload.name);
      }


      

    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name.trim() === name);
        if (itemToUpdate) {
          state.totalQuantity = state.totalQuantity - itemToUpdate.quantity + quantity;
          itemToUpdate.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
