type Image = {
  color: string;
  createdAt: string;
  file: { url: string; key: string; imageId: string; id: string }[];
  id: string;
  productId: string;
  updatedAt: string;
};

interface Product {
  CollectionType: { name: string };
  collectionTypeId: string;
  createdAt: string;
  description: string;
  id: string;
  image: image[];
  price: number;
  title: string;
  updatedAt: string;
  uploadStatus: string;
  rating: number,
}

type Collection = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string | null;
};
type CollectionType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  collectionId: string;
};

type ImageUrl = {
  url: string;
  id: string;
  key: string;
  imageId?: string;
};

type CartItem = {
  id?: string;
  userId: string;
  quantity: number;
  size: string;
  productId: string;
  color: string;
};

type Cart = {
  color: string;
  createdAt: string;
  id: string;
  product: Product;
  productId: string;
  quantity: number;
  size: string;
  updatedAt: string;
  userId: string;
}

type Order = {
  id?: string;
  userId: string;
  status?: OrderStatus;
  total_price: number;
  order_time?: string;
  payment_method: string;
  address: string;
};

enum OrderStatus {
  "PENDING",
  "CANCELLED",
  "PROCESSING",
  "DELIVERED",
}

type OrderedItem = {
  id?: string;
  orderId: string;
  productId: string;
  quantity: number;
  size: string;
  color: string;
};

type Review = {
  id?: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt?: string;
  userId: string;
};
interface column {
  key: string;
  label: string;
  render?: (value: any) => JSX.Element;
  accessor?: string;
  class?: string
}
type Size = {
  id?:number;
  name:string;
  description?:string;
  order:number;
  type?:string
}