import Topnav from "@/src/components/topnav";
import Hero from "@/src/components/hero";
import Products from "@/src/components/bikeProducts";
import ElectricMotos from "@/src/components/electricMotos";
import ElectricKits from "@/src/components/electricKits";
import Features from "@/src/components/features";
import Footer from "@/src/components/footer";
import NewsLetter from "@/src/components/newsLetter";
export default function Home() {
  return (
    <div>
      <Topnav />
      <Hero />
      <NewsLetter />
      <Products />
      <ElectricMotos />
      <ElectricKits />
      <Features />
      <Footer />
    </div>
  );
}
