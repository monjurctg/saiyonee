const authToken = "saiyonee_auth_token";
const cart = "cart";
const userType = "userType";

export const getToken = () =>
  JSON.parse(window.localStorage.getItem(authToken));

export const setToken = (token) => {
  // console.log("token", token);
  token
    ? window.localStorage.setItem(authToken, JSON.stringify(token))
    : window.localStorage.removeItem(authToken);
};

export const setType = (type) => {
  // console.log("token", token);
  type
    ? window.localStorage.setItem(userType, type)
    : window.localStorage.removeItem(userType);
};
export const getType = () => window.localStorage.getItem(userType);
export const getCart = () => {
  let carts = localStorage.getItem("cart") || "";

  if (typeof carts !== "undefined" && carts !== null && carts !== "") {
    carts = JSON.parse(carts) || [];
  }
  return carts;
};

export const setCart = (data = []) => {
  console.log(data, "local");
  data
    ? window.localStorage.setItem(cart, JSON.stringify(data))
    : window.localStorage.removeItem(cart);
};

export const addInLocal = (data) => {
  return localStorage.setItem("shopCart", JSON.stringify(data));
};
export const getFromLocal = () => {
  return JSON.parse(localStorage.getItem("shopCart"));
};

const addToCart = (id) => {
  // setIsClicked(!isClicke);
  // console.log(carts);
};

export const setSearchedData = (data) =>
  window.localStorage.setItem("searched", JSON.stringify(data));

export const getSearchedData = () => localStorage.getItem("searched");

// export const log = (...args) => {
//   console.clear();

//   console.log(...args);
// };

export const stoteRegisterValues = (data) => {
  const pdata = JSON.parse(window.localStorage.getItem("register")) || null;
  // console.log("pdata", pdata);
  if (pdata) {
    let newData = {
      ...pdata,
      ...data,
    };
    window.localStorage.setItem("register", JSON.stringify(newData));
  } else window.localStorage.setItem("register", JSON.stringify(data));
};

export const getDate = (date) => {
  // console.log('date', date?.split(' ')[0]?.split('-')?.reverse()?.join('-'))
  let todaysDate = new Date();
  console.log("todaysDate", todaysDate);
  let d = new Date(date?.split(" ")[0]?.split("-")?.reverse()?.join("-"));
  // console.log('d', d.toDateString()?.split(' '))
  let newArr = [
    d.toDateString()?.split(" ")[0],
    [
      d.toDateString()?.split(" ")[1],
      d.toDateString()?.split(" ")[2],
      d.toDateString()?.split(" ")[3],
    ],
  ];
  let newDate = newArr[0] + "," + newArr[1].join(" ");
  console.log("newDate", newDate);
  return newDate;
};

export function validateAge(date) {
  let today = new Date();
  let birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  let monthDiff = today.getMonth() - birthDate.getMonth();

  // console.log(age);
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
    // return;
  }
  let isNineteenOrAbove = age > 19 || (age === 19 && monthDiff >= 0);
  console.log(isNineteenOrAbove);
  return isNineteenOrAbove;
}
