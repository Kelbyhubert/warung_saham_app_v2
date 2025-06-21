import { clearAuth, setAuth } from "@/lib/redux/slices/AuthSlice";
import { RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const login = (user: any, token: string) => {
    dispatch(setAuth({ user, token }));
  };

  const logout = () => {
    dispatch(clearAuth());
  };

  return { authState, login, logout };
};
