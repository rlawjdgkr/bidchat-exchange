
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";

const LiveAuction = () => {
  const { id } = useParams();
  const [currentBid, setCurrentBid] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setCurrentBid(foundProduct.initialPrice);
    }
  }, [id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      user: "User",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const handleBid = () => {
    if (!product) return;
    setCurrentBid(prev => prev + product.bidUnit);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-black rounded-lg overflow-hidden">
          <div className="aspect-video bg-gray-800 relative">
            <div className="absolute top-4 left-4 bg-red-600 px-2 py-1 rounded text-white text-sm">
              LIVE
            </div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 text-white">
            <h1 className="text-xl font-bold">{product.title}</h1>
            <p className="text-gray-400">{product.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-lg font-bold mb-2">현재 입찰가</div>
            <div className="text-2xl font-bold text-green-600 mb-4">
              ₩{currentBid.toLocaleString()}
            </div>
            <Button onClick={handleBid} className="w-full">
              +₩{product.bidUnit.toLocaleString()} 입찰하기
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow h-[400px] flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-bold">실시간 채팅</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((message) => (
                <div key={message.id} className="bg-gray-100 rounded p-2">
                  <div className="flex justify-between">
                    <span className="font-bold">{message.user}</span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p>{message.content}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                />
                <Button type="submit">전송</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LiveAuction;
