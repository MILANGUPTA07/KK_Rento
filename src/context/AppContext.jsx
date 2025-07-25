import { createContext, useContext, useReducer, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';

const AppContext = createContext();

const initialState = {
  products: [],
  orders: [],
  loading: false,
  isAdmin: false,
  cart: [],
  currentOrder: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => 
          p.id === action.payload.id ? action.payload : p
        )
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload)
      };
    case 'SET_ADMIN':
      return { ...state, isAdmin: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    case 'SET_CURRENT_ORDER':
      return { ...state, currentOrder: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load products from Firebase or localStorage
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Try Firebase first, fallback to localStorage
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      if (products.length === 0) {
        // Load default products if none exist
        const defaultProducts = getDefaultProducts();
        dispatch({ type: 'SET_PRODUCTS', payload: defaultProducts });
        // Save to localStorage as backup
        localStorage.setItem('rental_products', JSON.stringify(defaultProducts));
      } else {
        dispatch({ type: 'SET_PRODUCTS', payload: products });
      }
    } catch (error) {
      console.log('Firebase not available, using localStorage');
      const localProducts = JSON.parse(localStorage.getItem('rental_products') || '[]');
      if (localProducts.length === 0) {
        const defaultProducts = getDefaultProducts();
        dispatch({ type: 'SET_PRODUCTS', payload: defaultProducts });
        localStorage.setItem('rental_products', JSON.stringify(defaultProducts));
      } else {
        dispatch({ type: 'SET_PRODUCTS', payload: localProducts });
      }
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const getDefaultProducts = () => [
    {
      id: '1',
      name: 'Split AC 1.5 Ton',
      category: 'air-conditioners',
      price: 50,
      description: 'Energy efficient split AC with remote control and timer function.',
      image: 'https://livpure.com/cdn/shop/articles/family-spending-time-together-outside_23-2148659464_e0d1fe68-5a26-488e-a17e-c1486f0d3d89-131818.jpg?v=1726725415',
      available: true,
      features: ['Remote Control', 'Timer Function', '5 Star Rating', 'Copper Coil']
    },
    {
      id: '2',
      name: 'Window AC 1 Ton',
      category: 'air-conditioners',
      price: 35,
      description: 'Compact window AC perfect for small rooms.',
      image: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Large%20Appliances/Air%20Conditioner/Images/264095_rsz310.png?tr=w-640',
      available: true,
      features: ['Compact Design', 'Energy Efficient', 'Easy Installation']
    },
    {
      id: '3',
      name: 'Executive Office Chair',
      category: 'furniture',
      price: 25,
      description: 'Comfortable ergonomic office chair with lumbar support.',
      image: 'https://m.media-amazon.com/images/I/51hvdpY+A8L._SY300_SX300_QL70_FMwebp_.jpg',
      available: true,
      features: ['Ergonomic Design', 'Lumbar Support', 'Adjustable Height', 'Swivel Base']
    },
    {
      id: '4',
      name: 'King Size Bed',
      category: 'furniture',
      price: 45,
      description: 'Spacious king size bed with premium mattress.',
      image: 'https://www.squaro.in/cdn/shop/files/IMG_20240229_210402.png?v=1709222452&width=1100',
      available: true,
      features: ['King Size', 'Premium Mattress', 'Wooden Frame', 'Storage Drawers']
    },
    {
      id: '5',
      name: '3-Seater Sofa',
      category: 'furniture',
      price: 40,
      description: 'Comfortable 3-seater sofa perfect for living room.',
      image: 'https://www.royaloakindia.com/media/catalog/product/s/f/sf5026-3.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=800&canvas=800:500',
      available: true,
      features: ['3 Seater', 'Fabric Upholstery', 'Comfortable Cushions', 'Modern Design']
    },
    {
      id: '6',
      name: 'Dining Table Set',
      category: 'furniture',
      price: 30,
      description: '4-seater dining table with chairs.',
      image: 'https://cdn.decornation.in/wp-content/uploads/2020/03/solid-wood-dining-table-2.jpg',
      available: true,
      features: ['4 Seater', 'Wooden Finish', 'Includes Chairs', 'Sturdy Build']
    }
  ];

  const addProduct = async (product) => {
    try {
      const docRef = await addDoc(collection(db, 'products'), product);
      const newProduct = { id: docRef.id, ...product };
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
      
      // Update localStorage backup
      const updatedProducts = [...state.products, newProduct];
      localStorage.setItem('rental_products', JSON.stringify(updatedProducts));
      
      toast.success('Product added successfully!');
    } catch (error) {
      // Fallback to localStorage
      const newProduct = { id: Date.now().toString(), ...product };
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
      const updatedProducts = [...state.products, newProduct];
      localStorage.setItem('rental_products', JSON.stringify(updatedProducts));
      toast.success('Product added successfully!');
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      await updateDoc(doc(db, 'products', id), updates);
      const updatedProduct = { id, ...updates };
      dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
      
      // Update localStorage backup
      const updatedProducts = state.products.map(p => 
        p.id === id ? updatedProduct : p
      );
      localStorage.setItem('rental_products', JSON.stringify(updatedProducts));
      
      toast.success('Product updated successfully!');
    } catch (error) {
      // Fallback to localStorage
      const updatedProduct = { id, ...updates };
      dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
      const updatedProducts = state.products.map(p => 
        p.id === id ? updatedProduct : p
      );
      localStorage.setItem('rental_products', JSON.stringify(updatedProducts));
      toast.success('Product updated successfully!');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
      
      // Update localStorage backup
      const updatedProducts = state.products.filter(p => p.id !== id);
      localStorage.setItem('rental_products', JSON.stringify(updatedProducts));
      
      toast.success('Product deleted successfully!');
    } catch (error) {
      // Fallback to localStorage
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
      const updatedProducts = state.products.filter(p => p.id !== id);
      localStorage.setItem('rental_products', JSON.stringify(updatedProducts));
      toast.success('Product deleted successfully!');
    }
  };

  const adminLogin = (password) => {
    if (password === 'admin123') {
      dispatch({ type: 'SET_ADMIN', payload: true });
      localStorage.setItem('rental_admin', 'true');
      toast.success('Admin login successful!');
      return true;
    }
    toast.error('Invalid admin password!');
    return false;
  };

  const adminLogout = () => {
    dispatch({ type: 'SET_ADMIN', payload: false });
    localStorage.removeItem('rental_admin');
    toast.success('Admin logged out!');
  };

  // Check admin status on load
  useEffect(() => {
    const adminStatus = localStorage.getItem('rental_admin');
    if (adminStatus === 'true') {
      dispatch({ type: 'SET_ADMIN', payload: true });
    }
  }, []);

  const submitOrder = (orderData) => {
    const order = {
      id: Date.now().toString(),
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    dispatch({ type: 'ADD_ORDER', payload: order });
    dispatch({ type: 'SET_CURRENT_ORDER', payload: order });
    
    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem('rental_orders') || '[]');
    orders.push(order);
    localStorage.setItem('rental_orders', JSON.stringify(orders));
    
    return order;
  };

  const value = {
    ...state,
    addProduct,
    updateProduct,
    deleteProduct,
    adminLogin,
    adminLogout,
    submitOrder,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};