
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const OtherProducts = () => {
  const [otherProducts, setOtherProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      toast({
        title: "로그인이 필요합니다",
        description: "다른 상품을 확인하려면 로그인해주세요.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsLoggedIn(true);
    
    // Get all products and filter out current user's products
    const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const productsFromOthers = allProducts.filter(
      (product) => product.seller !== currentUser
    );
    setOtherProducts(productsFromOthers);
  }, [navigate, toast]);

  return (
    <Layout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">다른 사용자 상품</h1>
        <p className="text-gray-600">다른 사용자가 등록한 상품 목록입니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-accent font-bold">₩{product.initialPrice.toLocaleString()}</span>
                <Button 
                  variant="outline"
                  onClick={() => navigate(`/auction/${product.id}`)}
                >
                  경매예약
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {otherProducts.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">
            다른 사용자가 등록한 상품이 없습니다.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OtherProducts;
