import React from "react";
import { useState, useEffect, useRef } from "react";
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import "./ProductView.css";

function ProductView({ products }) {
  console.log("Product View renders");
  // TODO: Replace with state variable
  const [sideOpen, setSideOpen] = useState(() => {
    const savedValue = localStorage.getItem("sideOpen");
    return savedValue ? JSON.parse(savedValue) : false;
  });

  const [selectedProduct, setSelectedProduct] = useState(() => {
    const savedValue = localStorage.getItem("selectedProduct");
    return savedValue ? JSON.parse(savedValue) : "";
  });
  const isFirstRender = useRef(true);
  useEffect(() => {
    // Handing first render I thought this is cool
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Alternating so when we press the button it switchs the panel back to closed
    if (selectedProduct !== "") {
      setSideOpen(true);
    } else {
      setSideOpen(false);
    }
    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
  }, [selectedProduct]);
  useEffect(() => {
    if (!sideOpen) {
      setSelectedProduct("");
    }
    localStorage.setItem("sideOpen", JSON.stringify(sideOpen));
  }, [sideOpen]);
  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map((item) => (
            <ProductListItem
              key={item.id}
              product={item}
              onClick={() =>
                setSelectedProduct((prev) => {
                  if (prev === item) {
                    return "";
                  }
                  return item;
                })
              }
              isSelected={selectedProduct.id === item.id ? true : false}
            />
          ))}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div
            className="product-side-panel-toggle"
            onClick={() => setSideOpen((prev) => !prev)}
          >
            {sideOpen ? ">" : "<"}
          </div>
        </div>
        <ProductDetails visible={sideOpen} product={selectedProduct} />
      </div>
    </div>
  );
}

export default ProductView;
