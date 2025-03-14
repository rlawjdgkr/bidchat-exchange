
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Auctions = () => {
  const navigate = useNavigate();
  const products = JSON.parse(localStorage.getItem("products") || "[]");

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">경매 리스트</h1>
          <Button onClick={() => navigate("/register-product")} className="gap-2">
            <Plus className="w-4 h-4" />
            상품 등록
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
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
        </div>
      </div>
    </Layout>
  );
};

export default Auctions;
