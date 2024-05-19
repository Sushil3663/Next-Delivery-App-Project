export interface MyApiResponse {
  payload: {
    email?: string;
    password?: string;
    rname?: string;
    city?: string;
    foodname?: string;
    price?: number;
    path?: string;
    desc?: string;
    address?: string;
    phone?: string;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
    __v: number;
  };
  success: boolean;
  message: string;
}

export interface FoodItem {
  _id: string;
  foodname: string;
  price: number;
  path: string;
  desc: string;
  resto_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponse {
  data: FoodItem[];
  success: boolean;
  message: string;
}

export interface EditResponse {
  data: FoodItem;
  success: boolean;
  message: string;
}

export interface LocationResponse {
  payload: [];
  success: boolean;
  message: string;
}

export interface ListResponsePayload {
  _id: string;
  email: string;
  password: string;
  rname: string;
  city: string;
  address: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
  __v: number;
}
export interface ListResponse {
  payload: [ListResponsePayload];
  success: boolean;
  message: string;
}

export interface DetailResponse {
  payload: ListResponsePayload;
  foodItems: FoodItem[];
  success: boolean;
  message: string;
}

export interface CartItem {
  _id: string;
  foodname: string;
  price: number;
  path: string;
  desc: string;
  resto_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  qtn: number;
  total: number;
}

export interface orderResponse {
  payload: {
    _id: string;
    user_id: string;
    foodItemsIds: Array<string>;
    resto_id: string;
    deliveryBoy_id: string;
    status: string;
    amount: number;
    __v: number;
    createdAt: string;
    updatedAt: string;
  };
  success: boolean;
  message: string;
}

export interface orderPayload {
  status: string;
  amount: string;
}

export interface orderList {
  payload: orderPayload[];
  food: FoodItem[];
  success: boolean;
  message: string;
}

export interface deliveryResponse {
  payload: {
    name: string;
    phone: string;
    password?: string;
    city: string;
    address: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  success: boolean;
  message: string;
}
