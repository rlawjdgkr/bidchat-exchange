
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBid = () => {
    // Get existing reserved auctions or initialize empty array
    const existingReserved = JSON.parse(localStorage.getItem("reservedAuctions") || "[]");
    
    // Add current auction to reserved list
    const currentAuction = {
      id,
      title: "빈티지 시계 컬렉션",
      currentPrice: "1,200,000",
      image: "https://placehold.co/400x300",
      endTime: "2024-03-20 15:00",
    };
    
    // Only add if not already in list
    if (!existingReserved.find((auction: any) => auction.id === id)) {
      existingReserved.push(currentAuction);
      localStorage.setItem("reservedAuctions", JSON.stringify(existingReserved));
    }

    toast({
      title: "입찰 완료",
      description: "성공적으로 입찰되었습니다.",
    });

    // Navigate to reserved auctions page
    navigate("/reserved-auctions");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-8">
          <img
            src="https://placehold.co/400x300"
            alt="Auction Item"
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">빈티지 시계 컬렉션</h1>
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-accent">₩1,200,000</div>
            <Button onClick={handleBid} className="px-8">
              입찰하기
            </Button>
          </div>
          <p className="text-gray-600">
            종료 시간: 2024-03-20 15:00
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AuctionDetail;
