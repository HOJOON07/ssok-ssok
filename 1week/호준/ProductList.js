import React, { useEffect, useState } from "react";
import "./ProductList.scss";
import SIZE_LIST from "./SizeList";

function ProductList(props) {
  const {
    product,
    getCartList,
    onChangeAmount,
    cartDelete,
    setCheckItems,
    checkItems,
  } = props;
  const {
    productOptionId,
    price,
    thumbnailImageUrl,
    quantity,
    productName,
    colorName,
    sizeName,
    cartId,
  } = product;
  const [selected, setSelected] = useState(quantity);
  const accessToken = localStorage.getItem("token");
  const handleSingleCheck = (checked, productOptionId) => {
    if (checked) {
      setCheckItems((prev) => [...prev, productOptionId]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== productOptionId));
    }
  };
  // const saveAmount = e => {
  //   onChangeAmount(e.target.value);
  //   quantityOnchange();
  // };
  //상품 수량에 따른 가격
  const amountPrice = price * selected;
  // console.log(amountPrice);

  //장바구니 물건 삭제 기능

  const quantityOnchange = (e) => {
    const productCartId = cartId;
    // fetch(`http://127.0.0.1:3000/carts/${[productCartId]}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: accessToken,
    //   },
    //   body: JSON.stringify({
    //     quantity: e.target.value,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(result => {
    //     if (result.message === 'product quantity modified') {
    //       setSelected(e.target.value);
    //       getCartList();
    //     }
    //   });
    setSelected(e.target.value);
  };

  const saveAmount = (e) => {
    onChangeAmount(e.target.value);
    // quantityOnchange();
  };
  // useEffect(() => {
  //   quantityOnchange();
  // }, [selected]);

  return (
    <>
      <div className="product">
        <input
          className="checkBox check"
          type="checkbox"
          onChange={(e) => handleSingleCheck(e.target.checked, productOptionId)}
          checked={checkItems.includes(product.productOptionId)}
        />
        <div className="imgContainer">
          <img
            src={thumbnailImageUrl}
            alt="장바구니 상품"
            className="productImg"
          />
        </div>

        <div className="productInfo" key={productOptionId}>
          <div className="productInfo">
            <div className="productName line fontSize">{productName}</div>
            <div className="productColor line gray fontSize">{colorName}</div>
            <div className="productSize line gray fontSize">{sizeName}</div>
            <div className="productAmount line gray fontSize">
              수량
              <select
                className="amountOption"
                onChange={(e) => {
                  quantityOnchange(e);
                  saveAmount(e);
                }}
                defaultValue={selected}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
              </select>
            </div>
            <div className="iconBox">
              <div className="heartIconWrap">
                <button className="heartBtn">
                  <img
                    className="heartImg"
                    src="/images/signup/heart.png"
                    alt="하트아이콘"
                  />
                </button>
              </div>
              <div className="deleteIconWrap">
                <button
                  className="deleteBtn"
                  onClick={() => cartDelete(productOptionId, cartId)}
                >
                  <img
                    className="heartImg"
                    src="/images/signup/delete.png"
                    alt="삭제아이콘"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="productPrice"> {amountPrice.toLocaleString()} 원 </div>
      </div>

      <div className="delivery fontSize">무료배송</div>
      <div className="arrival fontSize">도착예정일</div>
    </>
  );
}

export default ProductList;
