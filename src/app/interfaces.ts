export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
}

export interface PartHeader {
  partNo: string;
  description: string;
}

export interface Bom {
  part: string;
  sku: string;
  description: string;
  category: string;
  nonCalculatedPrice: number;
  listPrice: number;
  discountPercentage: number;
}

export interface ProductHeader {
  productNo: string;
  description: string;
}

export interface Product {
  productNo: string;
  productDescription: string;
  htmlLink: string;
  category: string;
  subtotal: number;
  notes: string;
  productListPrice: number;
  parts: Bom[];
}
