export interface Product {
  id: number;
  title: string;
  image: string;
  category: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  description: string;
}
