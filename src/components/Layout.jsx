import React from "react";
import { Link } from "react-router-dom";
import { Trophy, List, BookmarkCheck, Plus } from "lucide-react";

const Layout = ({ children }) => {
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
            <Link to="/login" className="hover:text-accent">
              로그인
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto py-8">{children}</main>
    </div>
  );
};

export default Layout;