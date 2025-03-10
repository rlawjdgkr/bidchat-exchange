
import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-primary text-white px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            BidChat
          </Link>
          <div className="space-x-4">
            <Link to="/auctions" className="hover:text-accent">
              경매
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
