import {create} from 'zustand';
interface AuthState {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}
const useAuthStore = create<AuthState>((set) => ({
  isAuth: false, 
  login: () => set({ isAuth: true }), 
  logout: () => set({ isAuth: false }) 
}));
export default useAuthStore;