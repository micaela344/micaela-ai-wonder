import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ImagenesIA from "./pages/ImagenesIA.tsx";
import VideosIA from "./pages/VideosIA.tsx";
import Campanas from "./pages/Campanas.tsx";
import Branding from "./pages/Branding.tsx";
import Blog from "./pages/Blog.tsx";
import BlogArticle from "./pages/BlogArticle.tsx";
import ProduccionEjemplos from "./pages/ProduccionEjemplos.tsx";
import PoliticaDeCookies from "./pages/PoliticaDeCookies.tsx";
import ChatWidget from "./components/ChatWidget.tsx";
import CookieBanner from "./components/CookieBanner.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicios/imagenes-ia" element={<ImagenesIA />} />
          <Route path="/servicios/videos-ia" element={<VideosIA />} />
          <Route path="/servicios/campanas" element={<Campanas />} />
          <Route path="/servicios/branding" element={<Branding />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/produccion-visual/ejemplos" element={<ProduccionEjemplos />} />
          <Route path="/politica-de-cookies" element={<PoliticaDeCookies />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatWidget />
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
