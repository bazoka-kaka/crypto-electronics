import React, { useEffect, useState } from "react";
import Card from "./Card";

const Cards = ({ tagName }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      img: "https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/non-braid/hyjal-g502-hero/g502-hero-gallery-1-nb.png",
      name: "Logitech G502 HERO High Performance Gaming Mouse",
      price: 200,
      tags: ["Gaming", "Mouse", "Logitech", "LED"],
    },
    {
      id: 2,
      img: "https://images.tokopedia.net/img/cache/500-square/product-1/2019/8/24/230251/230251_2d702e23-698f-494c-9284-06ace6ce20a2_700_700.jpg",
      name: "Mouse Razer Ambidextrous Gaming Mouse",
      price: 300,
      tags: ["Gaming", "Mouse", "Razer", "LED"],
    },
    {
      id: 3,
      img: "https://upload.jaknot.com/2020/07/images/products/708ed7/original/logitech-lightsync-rgb-gaming-mouse-g102.jpg",
      name: "Logitech Lightsync RGB Gaming Mouse - G102 - Black",
      price: 100,
      tags: ["Gaming", "Mouse", "Logitech", "LED"],
    },
    {
      id: 4,
      img: "https://assets2.razerzone.com/images/pnx.assets/1c0086b0a6e4f10fb5336b509de738ce/razer-deathadder-v2-x-hyperspeed_500x500.png",
      name: "Razer Gaming Mouse: Wireless Mouse",
      price: 50,
      tags: ["Gaming", "Mouse", "Razer"],
    },
    {
      id: 5,
      img: "https://dorangadget.com/wp-content/uploads/2021/11/keyboard-laptop-keyboard-komputer-keyboard-adalah-harga-keyboard-murah-1-2.jpg",
      name: "Wireless Keyboard Logitech K380",
      price: 25,
      tags: ["Office", "Keyboard", "Logitech"],
    },
    {
      id: 6,
      img: "https://resource.logitech.com/w_800,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/keyboards/k120/gallery/k120-gallery-01-new.png?v=1",
      name: "Logitech K120 USB Standard Computer Keyboard",
      price: 10,
      tags: ["Office", "Keyboard", "Logitech"],
    },
    {
      id: 7,
      img: "https://images.tokopedia.net/img/cache/500-square/product-1/2016/12/1/445349/445349_5a38ab82-85ee-45b5-bf22-eed291bdaa4f_1500_1000.png",
      name: "Keyboard Razer Ornata Chroma",
      price: 50,
      tags: ["Gaming", "Keyboard", "Razer", "LED"],
    },
    {
      id: 8,
      img: "https://i.rtings.com/assets/products/5mHSDD8N/razer-blackwidow/design-medium.jpg",
      name: "Keyboard Razer Black Widow",
      price: 20,
      tags: ["Gaming", "Keyboard", "Razer", "LED"],
    },
    {
      id: 9,
      img: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/13/71390d57-f23e-4bb5-b22b-b27757ca4352.jpg",
      name: "Asus Rog G512li-i565b6t",
      price: 700,
      tags: ["Gaming", "Laptop", "ROG", "LED"],
    },
    {
      id: 10,
      img: "https://images.tokopedia.net/img/cache/500-square/product-1/2019/4/14/3597940/3597940_20e9f8c6-dc2e-41fb-be2b-e93eea70ecf4_498_374.jpg",
      name: "ASUS ROG GL504GW ",
      price: 1000,
      tags: ["Gaming", "Laptop", "ROG", "LED"],
    },
    {
      id: 11,
      img: "https://macstore.id/wp-content/uploads/2022/07/mbp-spacegray-gallery2-202206-scaled.jpeg",
      name: "MacBook Pro 13 inch M2",
      price: 1200,
      tags: ["Programming", "Laptop", "Mac"],
    },
    {
      id: 12,
      img: "https://cdn0-production-images-kly.akamaized.net/QFQB4MU1LfHRUHXyWgcQC9u8edE=/0x0:0x0/640x360/filters:quality(75):strip_icc():format(jpeg):watermark(kly-media-production/assets/images/watermarks/liputan6/watermark-gray-landscape-new.png,540,20,0)/kly-media-production/medias/2967098/original/090651600_1573707637-macbook_16_inci.jpg",
      name: "Macbook Pro 16",
      price: 1300,
      tags: ["Programming", "Laptop", "Mac"],
    },
  ]);

  return (
    <div className="mt-6 flex gap-6 justify-center">
      {/* card */}
      {products.map(
        (product) =>
          product.tags.indexOf(tagName) !== -1 && (
            <Card product={product} key={product.id} />
          )
      )}
    </div>
  );
};

export default Cards;
