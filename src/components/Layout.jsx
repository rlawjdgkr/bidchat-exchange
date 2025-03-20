
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trophy, List, BookmarkCheck, Plus, LogOut, Package, ShoppingBag, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setIsLoggedIn(true);
      setUsername(currentUser);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    toast({
      title: "로그아웃 성공",
      description: "성공적으로 로그아웃되었습니다.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-primary text-white px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            BidChat
          </Link>
          <div className="space-x-6">
            <Link to="/auctions" className="hover:text-accent inline-flex items-center gap-2">
              <List className="w-4 h-4" />
              경매 리스트
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/my-page" className="hover:text-accent inline-flex items-center gap-2">
                  <User className="w-4 h-4" />
                  마이페이지
                </Link>
                <Link to="/my-products" className="hover:text-accent inline-flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  내 상품
                </Link>
                <Link to="/other-products" className="hover:text-accent inline-flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  다른 상품
                </Link>
                <Link to="/register-product" className="hover:text-accent inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  상품 등록
                </Link>
                <Link to="/reserved-auctions" className="hover:text-accent inline-flex items-center gap-2">
                  <BookmarkCheck className="w-4 h-4" />
                  예약된 경매
                </Link>
                <Link to="/won-auctions" className="hover:text-accent inline-flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  낙찰된 경매
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="hover:text-accent inline-flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-accent">
                로그인
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto py-8">{children}</main>
    </div>
  );
};

export default Layout;
