
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ShoppingCart, UserCog } from "lucide-react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [myProducts, setMyProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      toast({
        title: "로그인이 필요합니다",
        description: "마이페이지를 확인하려면 로그인해주세요.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Get all products and filter for current user's products (sales)
    const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const userProducts = allProducts.filter(
      (product) => product.sellerId === currentUser
    );
    setMyProducts(userProducts);

    // Get won auctions for purchases
    const wonAuctions = JSON.parse(localStorage.getItem("wonAuctions") || "[]");
    const userWonAuctions = wonAuctions.filter(
      (auction) => auction.winnerId === currentUser
    );
    setPurchasedProducts(userWonAuctions);

    // Get user data
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userData = users.find((u) => u.username === currentUser);
    if (userData) {
      setUser(userData);
      setFormData({
        username: userData.username,
        email: userData.email || "",
        password: "",
      });
    }
  }, [navigate, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    
    if (!formData.username.trim()) {
      toast({
        title: "사용자 이름을 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    // Update user data in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) => {
      if (u.username === user.username) {
        return {
          ...u,
          email: formData.email,
          ...(formData.password ? { password: formData.password } : {}),
        };
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    toast({
      title: "프로필이 업데이트되었습니다",
      description: "회원 정보가 성공적으로 변경되었습니다.",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">마이페이지</h1>

        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              판매내역
            </TabsTrigger>
            <TabsTrigger value="purchases" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              구매내역
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserCog className="w-4 h-4" />
              정보수정
            </TabsTrigger>
          </TabsList>

          {/* 판매내역 탭 */}
          <TabsContent value="sales" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">내 판매 상품</h2>
            {myProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myProducts.map((product) => (
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
                          상세 보기
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                등록한 판매 상품이 없습니다.
              </div>
            )}
          </TabsContent>

          {/* 구매내역 탭 */}
          <TabsContent value="purchases" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">내 구매 상품</h2>
            {purchasedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedProducts.map((auction) => (
                  <Card key={auction.productId} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{auction.productTitle}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        낙찰 가격: ₩{auction.finalPrice.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        낙찰 일자: {new Date(auction.timestamp).toLocaleDateString()}
                      </p>
                      <div className="flex justify-end">
                        <Button 
                          variant="outline"
                          onClick={() => navigate(`/auction/${auction.productId}`)}
                        >
                          상세 보기
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                구매한 상품이 없습니다.
              </div>
            )}
          </TabsContent>

          {/* 정보수정 탭 */}
          <TabsContent value="profile" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">회원정보 수정</h2>
            {user && (
              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="username">
                    사용자 이름
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">사용자 이름은 변경할 수 없습니다.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">
                    이메일
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="password">
                    새 비밀번호
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="변경할 비밀번호 입력"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <p className="text-xs text-gray-500 mt-1">비밀번호를 변경하려면 새 비밀번호를 입력하세요.</p>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full">
                    정보 수정하기
                  </Button>
                </div>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyPage;
