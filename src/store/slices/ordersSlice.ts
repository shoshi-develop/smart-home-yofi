
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  orderDate: string;
  targetDate: string;
  address: string;
  status: 'pending' | 'confirmed' | 'delivered';
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Omit<Order, 'id' | 'orderDate'>>) => {
      const newOrder: Order = {
        ...action.payload,
        id: Date.now().toString(),
        orderDate: new Date().toISOString(),
      };
      state.orders.push(newOrder);
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
});

export const { addOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
