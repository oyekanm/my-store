import { atom } from "recoil";

type info = { id: string; title: string };

export const productInfoObject = atom({
  key: "product", // unique ID (with respect to other atoms/selectors)
  default: {} as info, // default value (aka initial value)
});
export const productImageId = atom({
  key: "productImageId", // unique ID (with respect to other atoms/selectors)
  default: "" as string, // default value (aka initial value)
});
export const productImageColor = atom({
  key: "productImageColor", // unique ID (with respect to other atoms/selectors)
  default: "" as string, // default value (aka initial value)
});
export const collectionInfo = atom({
  key: "collectionInfo", // unique ID (with respect to other atoms/selectors)
  default: {} as { id: string; name: string }, // default value (aka initial value)
});
export const collectionTypeInfo = atom({
  key: "collectionTypeInfo", // unique ID (with respect to other atoms/selectors)
  default: {} as { id: string; name: string }, // default value (aka initial value)
});