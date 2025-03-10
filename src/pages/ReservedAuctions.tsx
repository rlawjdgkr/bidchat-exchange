
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ReservedAuctions = () => {
  // Get reserved auctions from localStorage
  const reservedAuctions = JSON.parse(localStorage.getItem("reservedAuctions") || "[]");

  return (
    <Layout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">내 예약된 경매</h1>
        <p className="text-gray-600">입찰한 경매 목록입니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservedAuctions.map((auction: any) => (
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
                <span className="text-sm text-gray-500">
                  종료: {auction.endTime}
                </span>
              </div>
            </div>
          </Card>
        ))}
        {reservedAuctions.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">
            아직 입찰한 경매가 없습니다.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReservedAuctions;
