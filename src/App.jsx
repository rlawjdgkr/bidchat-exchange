
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auctions from "./pages/Auctions";
import WonAuctions from "./pages/WonAuctions";
import AuctionDetail from "./pages/AuctionDetail";
import ReservedAuctions from "./pages/ReservedAuctions";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RegisterProduct from "./pages/RegisterProduct";
import LiveAuction from "./pages/LiveAuction";
import MyProducts from "./pages/MyProducts";
import OtherProducts from "./pages/OtherProducts";
import MyPage from "./pages/MyPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/register-product" element={<RegisterProduct />} />
          <Route path="/won-auctions" element={<WonAuctions />} />
          <Route path="/auction/:id" element={<AuctionDetail />} />
          <Route path="/reserved-auctions" element={<ReservedAuctions />} />
          <Route path="/live-auction/:id" element={<LiveAuction />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/other-products" element={<OtherProducts />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
