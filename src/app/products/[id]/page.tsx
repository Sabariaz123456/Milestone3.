"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import Image from "next/image";
import { BiSolidCartAdd } from "react-icons/bi";
import { useParams } from "next/navigation";
import { useCart } from "../../../../components/CartContext";

export default function DetailsPage() {
  interface IProduct {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
  }

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { incrementCart, decrementCart, getCartCount } = useCart();

  const Params = useParams();
  const productId = Array.isArray(Params?.id) ? Params.id[0] : Params?.id;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      setLoading(true);
      setError("");
      setProduct(null);

      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!product) return <div className="text-center text-red-500">No product found.</div>;

  const cartCount = productId ? getCartCount(productId) : 0;

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row p-4 md:p-6 gap-6 items-center justify-around">
      <div className="pro-image w-full md:w-[40%] h-[500px] rounded-lg">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-lg h-[500px] w-full"
        />
      </div>
      <div className="pro-details w-full md:w-[50%] h-auto rounded-lg shadow-lg p-6">
        <Card className="w-full h-auto rounded-lg">
          <CardHeader>
            <CardTitle>{product.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-semibold text-green-600">${product.price}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>

            <div className="buttons flex items-center justify-between mt-4">
              {cartCount > 0 ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrementCart(productId!)}
                    className="px-4 py-2 bg-gray-100 rounded-md hover:shadow"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold">{cartCount}</span>
                  <button
                    onClick={() => incrementCart(productId!)}
                    className="px-4 py-2 bg-gray-100 rounded-md hover:shadow"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => incrementCart(productId!)}
                  className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
                >
                  <BiSolidCartAdd className="mr-2 text-lg" />
                  Add to Cart
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
