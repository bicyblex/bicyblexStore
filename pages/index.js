import Topnav from "@/src/components/index/topnav";
import Hero from "@/src/components/index/hero";
import Products from "@/src/components/index/bikeProducts";
import ElectricMotos from "@/src/components/index/electricMotos";
import ElectricKits from "@/src/components/index/electricKits";
import Features from "@/src/components/index/features";
import Footer from "@/src/components/index/footer";
import NewsLetter from "@/src/components/index/newsLetter";
import Head from "next/head";
import { GlobalProvider } from "@/src/context/GlobalContext";
export default function Home() {
  return (
    <GlobalProvider>
      <Head>
        <title>
          Bicyblex Perú | Bicicletas y todo lo que necesitas para ir a velocidad
        </title>
        <meta
          name="description"
          content="Discover our range of electric bike kits to convert your bike into an electric one. Easy installation, powerful performance, and eco-friendly transportation. Shop now!"
        />
      </Head>

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
    </GlobalProvider>
  );
}
