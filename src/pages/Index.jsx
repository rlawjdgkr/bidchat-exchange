
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const featuredAuctions = [
    {
      id: 1,
      title: "빈티지 시계 컬렉션",
      currentPrice: "1,200,000",
      image: "https://placehold.co/400x300",
      endTime: "2024-03-20 15:00",
    },
    {
      id: 2,
      title: "한정판 스니커즈",
      currentPrice: "890,000",
      image: "https://placehold.co/400x300",
      endTime: "2024-03-21 18:00",
    },
  ];

  return (
    <Layout>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          실시간 스트리밍 경매
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          판매자와 실시간으로 소통하며 원하는 상품을 경매로 구매하세요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredAuctions.map((auction) => (
          <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={auction.image}
              alt={auction.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{auction.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-accent font-bold">₩{auction.currentPrice}</span>
                <Button 
                  variant="outline"
                  onClick={() => navigate(`/auction/${auction.id}`)}
                >
                  입찰하기
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                종료: {auction.endTime}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Index;
