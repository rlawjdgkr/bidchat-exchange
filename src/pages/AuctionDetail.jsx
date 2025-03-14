
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const product = products.find(p => p.id === id);
  const currentUser = localStorage.getItem("currentUser");

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold">상품을 찾을 수 없습니다</h1>
          <Button onClick={() => navigate("/auctions")} className="mt-4">
            경매 리스트로 돌아가기
          </Button>
        </div>
      </Layout>
    );
  }

  const handleBid = () => {
    const existingReserved = JSON.parse(localStorage.getItem("reservedAuctions") || "[]");
    
    if (!existingReserved.find((auction) => auction.id === id)) {
      existingReserved.push(product);
      localStorage.setItem("reservedAuctions", JSON.stringify(existingReserved));
    }

    toast({
      title: "예약 완료",
      description: "성공적으로 예약되었습니다.",
    });

    navigate("/reserved-auctions");
  };

  const handleStartAuction = () => {
    navigate(`/live-auction/${id}`);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">현재 입찰가</p>
              <div className="text-2xl font-bold text-accent">₩{product.initialPrice.toLocaleString()}</div>
              <p className="text-sm text-gray-500 mt-2">즉시 구매가: ₩{product.buyNowPrice.toLocaleString()}</p>
            </div>
            {product.sellerId === currentUser ? (
              <Button onClick={handleStartAuction} className="px-8">
                경매 시작
              </Button>
            ) : (
              <Button onClick={handleBid} className="px-8">
                경매예약
              </Button>
            )}
          </div>
          <div className="text-sm text-gray-500">
            카테고리: {product.category}
          </div>
          <div className="text-sm text-gray-500">
            경매 단위: ₩{product.bidUnit.toLocaleString()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuctionDetail;
