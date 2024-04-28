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
