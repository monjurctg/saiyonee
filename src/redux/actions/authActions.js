import store from "../store";
import { login, logout } from "../slices/authSlices";

export const loginAction = (user, token) => {
    store.dispatch(login({ user, token }));
};

export const logoutAction = () => {
    store.dispatch(logout());
}
