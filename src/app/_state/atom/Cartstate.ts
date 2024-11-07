import { atom } from "recoil";

export const cartState = atom({
  key: "product", // unique ID (with respect to other atoms/selectors)
  default: [] as Cart[], // default value (aka initial value)
});