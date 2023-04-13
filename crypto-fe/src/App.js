import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UnprotectedLayout from "./components/UnprotectedLayout";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products/Products";
import Product from "./pages/Products/Product";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      img: "https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/non-braid/hyjal-g502-hero/g502-hero-gallery-1-nb.png",
      name: "Logitech G502 HERO High Performance Gaming Mouse",
      price: 200,
      description:
        "Engineered for advanced gaming performance. G502 HERO features HERO 25K gaming sensor with sub-micron precision tracking, customizable LIGHTSYNC RGB, onboard profiles, repositionable weights and more.",
      tags: ["Gaming", "Mouse", "Logitech", "LED"],
    },
    {
      id: 2,
      img: "https://images.tokopedia.net/img/cache/500-square/product-1/2019/8/24/230251/230251_2d702e23-698f-494c-9284-06ace6ce20a2_700_700.jpg",
      name: "Mouse Razer Ambidextrous Gaming Mouse",
      price: 300,
      description:
        "Designed for esports, the Razer Viper was purposefully designed to achieve the highest grade of performance to tear up the competition. We’ve consistently raised the bar since the world’s best esports gaming (Razer Viper), collaborating with Esports athletes and enthusiasts to meet the rigorous demands of top-tier competitive gameplay. ",
      tags: ["Gaming", "Mouse", "Razer", "LED"],
    },
    {
      id: 3,
      img: "https://upload.jaknot.com/2020/07/images/products/708ed7/original/logitech-lightsync-rgb-gaming-mouse-g102.jpg",
      name: "Logitech Lightsync RGB Gaming Mouse - G102 - Black",
      price: 100,
      description:
        "Make the most of play time with G102—a gaming mouse in a variety of vibrant colors. With LIGHTSYNC technology, a gaming-grade sensor and a classic 6-button design, you’ll light up your game and your desk",
      tags: ["Gaming", "Mouse", "Logitech", "LED"],
    },
    {
      id: 4,
      img: "https://assets2.razerzone.com/images/pnx.assets/1c0086b0a6e4f10fb5336b509de738ce/razer-deathadder-v2-x-hyperspeed_500x500.png",
      name: "Razer Gaming Mouse: Wireless Mouse",
      price: 50,
      description:
        "Experience unrivalled responsiveness with a mouse capable of sending up to 8 times more data in a second, effectively reducing input delay from 1 to 1/8th of a millisecond—the edge every pro needs to stay ahead of the competition.",
      tags: ["Gaming", "Mouse", "Razer"],
    },
    {
      id: 5,
      img: "https://dorangadget.com/wp-content/uploads/2021/11/keyboard-laptop-keyboard-komputer-keyboard-adalah-harga-keyboard-murah-1-2.jpg",
      name: "Wireless Keyboard Logitech K380",
      price: 25,
      description:
        "Meet K380. A small, silent typing multi-device keyboard for computers, tablets and phones at home or on the move.",
      tags: ["Office", "Keyboard", "Logitech"],
    },
    {
      id: 6,
      img: "https://resource.logitech.com/w_800,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/keyboards/k120/gallery/k120-gallery-01-new.png?v=1",
      name: "Logitech K120 USB Standard Computer Keyboard",
      price: 10,
      description:
        "The Logitech Keyboard K120 is a full-size keyboard featuring a standard layout with F keys and a number pad so you can give full commands. Not only that, this keyboard is also designed to provide a comfortable typing experience for you thanks to the low-profile key design and white character symbols which are very easy to read so that your fingers can press these keys more freely.",
      tags: ["Office", "Keyboard", "Logitech"],
    },
    {
      id: 7,
      img: "https://images.tokopedia.net/img/cache/500-square/product-1/2016/12/1/445349/445349_5a38ab82-85ee-45b5-bf22-eed291bdaa4f_1500_1000.png",
      name: "Keyboard Razer Ornata Chroma",
      price: 50,
      description:
        " High-Performance Mecha-Membrane Switches Provides the tactile feedback of mechanical key press on a comfortable soft-cushioned membrane rubber dome switch suitable for gaming Ultimate Personalization & Gaming Immersion with Razer Chroma Fully syncs with popular games Razer hardware Philips Hue and gear from 30 plus partners supports 16 8 million colors on individually backlit keys.Keycaps:Regular ABS ",
      tags: ["Gaming", "Keyboard", "Razer", "LED"],
    },
    {
      id: 8,
      img: "https://i.rtings.com/assets/products/5mHSDD8N/razer-blackwidow/design-medium.jpg",
      name: "Keyboard Razer Black Widow",
      price: 20,
      description:
        " The NPD Group, U.S. Retail Tracking Service, Gaming Designed: Keyboards, Mice, PC Headsets, and PC Microphones, Based on dollar sales, Jan. 2017- June 2020 combined. All-Around Gaming Performance: Able to execute up to ten commands at the same time with built-in key rollover anti-ghosting ",
      tags: ["Gaming", "Keyboard", "Razer", "LED"],
    },
    {
      id: 9,
      img: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/13/71390d57-f23e-4bb5-b22b-b27757ca4352.jpg",
      name: "Asus Rog G512li-i565b6t",
      price: 700,
      description:
        "Intel Core i5-10300H (8M Cache; up to 4.50 GHz) 15.6″ Slim Bezel IPS FHD 144Hz 250nits 3ms, sRGB:67%, NTSC:45% DDR4 8GB 3200Mhz, M.2 512GB SSD PCIe NVIDIA GeForce GTX1650Ti GDDR6 4GB Windows 10 Home",
      tags: ["Gaming", "Laptop", "ROG", "LED"],
    },
    {
      id: 10,
      img: "https://images.tokopedia.net/img/cache/500-square/product-1/2019/4/14/3597940/3597940_20e9f8c6-dc2e-41fb-be2b-e93eea70ecf4_498_374.jpg",
      name: "ASUS ROG GL504GW ",
      price: 1000,
      description:
        "With up to the latest NVIDIA® GeForce RTX™ 2070 graphics and 8th Generation Intel® Core™ i7 processors, ROG Strix SCAR II brings even more power and style to FPS esports gaming. Available in 15- and 17-inch models, Strix SCAR II boasts the world’s first 144Hz super-narrow-bezel display with an ultrafast 3ms gray-to-gray (GTG) response time for unmatched smoothness and response.",
      tags: ["Gaming", "Laptop", "ROG", "LED"],
    },
    {
      id: 11,
      img: "https://macstore.id/wp-content/uploads/2022/07/mbp-spacegray-gallery2-202206-scaled.jpeg",
      name: "MacBook Pro 13 inch M2",
      price: 1200,
      description:
        "8-core CPU with 4 performance cores and 4 efficiency cores GPU 10-core Neural Engine 16-core Memory bandwidth 100 GB/s 13.3-inch (diagonal) LED-backlit display with IPS technology; 2560 x 1600 resolution at 227 pixels per inch with support for millions of colors 500 nit brightness",
      tags: ["Programming", "Laptop", "Mac"],
    },
    {
      id: 12,
      img: "https://cdn0-production-images-kly.akamaized.net/QFQB4MU1LfHRUHXyWgcQC9u8edE=/0x0:0x0/640x360/filters:quality(75):strip_icc():format(jpeg):watermark(kly-media-production/assets/images/watermarks/liputan6/watermark-gray-landscape-new.png,540,20,0)/kly-media-production/medias/2967098/original/090651600_1573707637-macbook_16_inci.jpg",
      name: "Macbook Pro 16",
      price: 1300,
      description:
        "Supercharged by the M2 Pro or M2 Max, MacBook Pro delivers even more impressive reliability and efficiency. This laptop delivers amazing performance whether it's plugged in or not, and now the battery lasts longer. Combined with a stunning Liquid Retina XDR display and all the ports you need — this is a pro laptop without equal.",
      tags: ["Programming", "Laptop", "Mac"],
    },
  ]);
  return (
    <Routes>
      {/* unprotected */}
      <Route path="/" element={<UnprotectedLayout />}>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/products" element={<Products products={products} />} />
        <Route path="/products/:id" element={<Product products={products} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/401" element={<Unauthorized />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Route>
    </Routes>
  );
}

export default App;
