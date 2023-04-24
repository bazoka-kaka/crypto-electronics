import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Update = ({ createNotifications, NOTIF_LIST }) => {
  const nameRef = useRef();
  const errRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/products";
  const { id } = useParams();

  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [tags, setTags] = useState([]);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [name, imgUrl, price, stock, tags, description]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProduct = async () => {
      try {
        const response = await axiosPrivate.get(`/products/${id}`, {
          signal: controller.signal,
        });
        console.log(response?.data);
        if (isMounted) {
          setName(response?.data?.name);
          setImgUrl(response?.data?.imgUrl);
          setPrice(response?.data?.price);
          setStock(response?.data?.stock);
          const arrTags = response?.data?.tags.split(",");
          setTags(arrTags);
          setDescription(response?.data?.description);
        }
      } catch (err) {
        if (err.message !== "canceled") {
          console.error(err);
        }
      }
    };

    getProduct();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    let strTags = tags.join(",");
    const updatedProduct = {
      id,
      name,
      imgUrl,
      price,
      stock,
      tags: strTags,
      description,
    };
    try {
      const response = await axiosPrivate.put(
        "/products",
        JSON.stringify(updatedProduct),
        {
          signal: controller.signal,
        }
      );
      createNotifications(
        null,
        "Product Updated",
        `${response.data.name} has been updated successfully`,
        `/products/${response.data._id}`,
        NOTIF_LIST.Updates
      );
      console.log(JSON.stringify(response));
      setName("");
      setImgUrl("");
      setDescription("");
      setPrice(0);
      setStock(0);
      setTags([]);
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response.");
      } else if (err?.response?.status === 400) {
        setErrMsg("Product name and tags are required.");
      } else if (err?.response?.status === 401) {
        setErrMsg("User is unauthorized.");
      }

      errRef.current.focus();
    }

    return () => {
      controller.abort();
    };
  };

  return (
    <div>
      <p
        ref={errRef}
        className={
          errMsg
            ? "font-semibold text-white bg-red-500 rounded-md px-4 py-2 mb-4"
            : "hidden"
        }
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="text-2xl font-semibold">Update Product {id}</h1>
      <div className="p-4 mt-4 bg-white rounded-md">
        <form>
          <label htmlFor="name" className="block font-semibold">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
          />
          <label htmlFor="imgUrl" className="block mt-4 font-semibold">
            Image URL
          </label>
          <input
            type="text"
            id="imgUrl"
            autoComplete="off"
            onChange={(e) => setImgUrl(e.target.value)}
            value={imgUrl}
            required
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
          />
          <label htmlFor="price" className="block mt-4 font-semibold">
            Price
          </label>
          <input
            type="number"
            id="price"
            autoComplete="off"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
          />
          <label htmlFor="stock" className="block mt-4 font-semibold">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            autoComplete="off"
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            required
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
          />
          <label htmlFor="description" className="block font-semibold">
            Product Description
          </label>
          <textarea
            id="description"
            autoComplete="off"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
            maxLength={1000}
          ></textarea>
          <p className="block mt-4 font-semibold">Tags</p>
          <div className="flex gap-12 mt-2">
            <div>
              <div>
                <input
                  type="checkbox"
                  id="tag_laptop"
                  name="tags"
                  onChange={(e) => {
                    if (!e.target.checked) {
                      const filteredTags = tags.filter(
                        (tag) => tag !== "laptop"
                      );
                      setTags(filteredTags);
                    } else {
                      setTags([...tags, "laptop"]);
                    }
                  }}
                  checked={tags.includes("laptop")}
                />{" "}
                <label htmlFor="tag_laptop">Laptop</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="tag_keyboard"
                  name="tags"
                  onChange={(e) => {
                    if (!e.target.checked) {
                      const filteredTags = tags.filter(
                        (tag) => tag !== "keyboard"
                      );
                      setTags(filteredTags);
                    } else {
                      setTags([...tags, "keyboard"]);
                    }
                  }}
                  checked={tags.includes("keyboard")}
                />{" "}
                <label htmlFor="tag_keyboard">Keyboard</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="tag_mouse"
                  name="tags"
                  onChange={(e) => {
                    if (!e.target.checked) {
                      const filteredTags = tags.filter(
                        (tag) => tag !== "mouse"
                      );
                      setTags(filteredTags);
                    } else {
                      setTags([...tags, "mouse"]);
                    }
                  }}
                  checked={tags.includes("mouse")}
                />{" "}
                <label htmlFor="tag_mouse">Mouse</label>
              </div>
            </div>
            <div>
              <div>
                <input
                  type="checkbox"
                  id="tag_gaming"
                  name="tags"
                  onChange={(e) => {
                    if (!e.target.checked) {
                      const filteredTags = tags.filter(
                        (tag) => tag !== "gaming"
                      );
                      setTags(filteredTags);
                    } else {
                      setTags([...tags, "gaming"]);
                    }
                  }}
                  checked={tags.includes("gaming")}
                />{" "}
                <label htmlFor="tag_gaming">Gaming</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="tag_programming"
                  name="tags"
                  onChange={(e) => {
                    if (!e.target.checked) {
                      const filteredTags = tags.filter(
                        (tag) => tag !== "programming"
                      );
                      setTags(filteredTags);
                    } else {
                      setTags([...tags, "programming"]);
                    }
                  }}
                  checked={tags.includes("programming")}
                />{" "}
                <label htmlFor="tag_programming">Programming</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="tag_office"
                  name="tags"
                  onChange={(e) => {
                    if (!e.target.checked) {
                      const filteredTags = tags.filter(
                        (tag) => tag !== "office"
                      );
                      setTags(filteredTags);
                    } else {
                      setTags([...tags, "office"]);
                    }
                  }}
                  checked={tags.includes("office")}
                />{" "}
                <label htmlFor="tag_office">Office</label>
              </div>
            </div>
            <div>
              <div>
                <input
                  type="checkbox"
                  id="tag_mac"
                  name="tags"
                  onChange={(e) => {
                    if (!e.target.checked) {
                      const filteredTags = tags.filter((tag) => tag !== "mac");
                      setTags(filteredTags);
                    } else {
                      setTags([...tags, "mac"]);
                    }
                  }}
                  checked={tags.includes("mac")}
                />{" "}
                <label htmlFor="tag_mac">Mac</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="tag_msi"
                  name="tags"
                  onChange={(e) => {
                    if (!e.target.checked) {
                      const filteredTags = tags.filter((tag) => tag !== "msi");
                      setTags(filteredTags);
                    } else {
                      setTags([...tags, "msi"]);
                    }
                  }}
                  checked={tags.includes("msi")}
                />{" "}
                <label htmlFor="tag_msi">MSI</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="tag_rog"
                  name="tags"
                  onChange={(e) => {
                    if (!e.target.checked) {
                      const filteredTags = tags.filter((tag) => tag !== "rog");
                      setTags(filteredTags);
                    } else {
                      setTags([...tags, "rog"]);
                    }
                  }}
                  checked={tags.includes("rog")}
                />{" "}
                <label htmlFor="tag_rog">ROG</label>
              </div>
            </div>
            <div>
              <div>
                <input
                  type="checkbox"
                  id="tag_logitech"
                  name="tags"
                  onChange={(e) => {
                    if (!e.target.checked) {
                      const filteredTags = tags.filter(
                        (tag) => tag !== "logitech"
                      );
                      setTags(filteredTags);
                    } else {
                      setTags([...tags, "logitech"]);
                    }
                  }}
                  checked={tags.includes("logitech")}
                />{" "}
                <label htmlFor="tag_logitech">Logitech</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="tag_razer"
                  name="tags"
                  onChange={(e) => {
                    if (!e.target.checked) {
                      const filteredTags = tags.filter(
                        (tag) => tag !== "razer"
                      );
                      setTags(filteredTags);
                    } else {
                      setTags([...tags, "razer"]);
                    }
                  }}
                  checked={tags.includes("razer")}
                />{" "}
                <label htmlFor="tag_razer">Razer</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="tag_led"
                  name="tags"
                  onChange={(e) => {
                    if (!e.target.checked) {
                      const filteredTags = tags.filter((tag) => tag !== "led");
                      setTags(filteredTags);
                    } else {
                      setTags([...tags, "led"]);
                    }
                  }}
                  checked={tags.includes("led")}
                />{" "}
                <label htmlFor="tag_led">LED</label>
              </div>
            </div>
          </div>
        </form>

        <div className="flex gap-2 mt-6">
          <Link
            to="/products"
            className="px-4 py-2 font-semibold text-white transition duration-200 bg-red-500 rounded-md hover:bg-red-400"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 font-semibold text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-400"
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
