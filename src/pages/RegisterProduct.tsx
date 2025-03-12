
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductData {
  id: string;
  title: string;
  description: string;
  category: string;
  initialPrice: number;
  bidUnit: number;
  buyNowPrice: number;
  image: string;
  createdAt: string;
}

const RegisterProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    initialPrice: "",
    bidUnit: "",
    buyNowPrice: "",
    image: "https://placehold.co/400x300",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: ProductData = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      initialPrice: Number(formData.initialPrice),
      bidUnit: Number(formData.bidUnit),
      buyNowPrice: Number(formData.buyNowPrice),
      image: formData.image,
      createdAt: new Date().toISOString(),
    };

    // Get existing products or initialize empty array
    const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
    localStorage.setItem("products", JSON.stringify([...existingProducts, newProduct]));

    toast({
      title: "상품 등록 완료",
      description: "성공적으로 상품이 등록되었습니다.",
    });

    navigate("/auctions");
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">상품 등록</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">상품명</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">상품 설명</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">카테고리</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="initialPrice">경매 초기가격</Label>
            <Input
              id="initialPrice"
              type="number"
              value={formData.initialPrice}
              onChange={(e) => setFormData({ ...formData, initialPrice: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="bidUnit">경매 단위</Label>
            <Input
              id="bidUnit"
              type="number"
              value={formData.bidUnit}
              onChange={(e) => setFormData({ ...formData, bidUnit: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="buyNowPrice">즉시 구매 가격</Label>
            <Input
              id="buyNowPrice"
              type="number"
              value={formData.buyNowPrice}
              onChange={(e) => setFormData({ ...formData, buyNowPrice: e.target.value })}
              required
            />
          </div>
          <div>
            <Label className="block mb-2">상품 사진</Label>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                <ImagePlus className="w-8 h-8 text-gray-400" />
              </div>
              <span className="text-sm text-gray-500">아직 이미지 업로드 기능이 구현되지 않았습니다</span>
            </div>
          </div>
          <Button type="submit" className="w-full">상품 등록하기</Button>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterProduct;
