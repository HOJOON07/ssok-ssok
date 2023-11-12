import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProductList from "./ProductList";

import "./Cart.scss";

function Cart() {
  const navigate = useNavigate();
  const [cartList, setCartList] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const accessToken = localStorage.getItem("token");

  const goToOrderList = () => {
    const orderCheckItems = cartList.filter((el) =>
      checkItems.includes(el.productOptionId)
    );

    const cartOrder = (orderCheckItems) => {
      return orderCheckItems.map((obj, i) => {
        return {
          productOptionId: orderCheckItems[i].productOptionId,
          quantity: orderCheckItems[i].quantity,
        };
      });
    };

    const cartOrderItems = cartOrder(orderCheckItems);
    const result = {
      totalPrice: totalPrice,
      orderItems: cartOrderItems,
    };

    fetch("http://127.0.0.1:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(result),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "order Created") setCartList(cartList);
        getCartList();
      });
    navigate("/payment");
  };

  //전체 선택, 해제
  const handleAllCheck = (checked) => {
    if (checked) {
      const newCheckArr = [];
      cartList.forEach((el) => newCheckArr.push(el.productOptionId));
      setCheckItems(newCheckArr);
    } else {
      setCheckItems([]);
    }
  };
  //선택 삭제
  const selectDelete = () => {
    const afterDeleted = cartList.filter(
      (el) => !checkItems.includes(el.productOptionId) //원래꺼
    );
    setCartList(afterDeleted);
    const beforeDeleted = cartList.filter(
      (el) => checkItems.includes(el.productOptionId) //원래꺼
    );

    const deleteCartId = beforeDeleted.map((el) => {
      return el.cartId;
    });

    fetch(`http://127.0.0.1:3000/carts/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        cartId: deleteCartId,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "cart deleted") {
          alert("삭제가 완료되었습니다.");
          getCartList();
        } else {
          alert("다시 시도해주세요!");
        }
      });
    // setCheckItems([]);

    // const productApi = checkItems
    //   .map(el => {
    //     return `productOptionId[]=${el}&`;
    //   })
    //   .join('');
    // delete?${productApi}`
  };

  //목데이터

  // useEffect(() => {
  //   fetch('/data/CartList.json')
  //     .then(response => response.json())
  //     .then(result => setCartList(result));
  // }, []);

  const getCartList = () => {
    fetch("/data/CartList.json")
      .then((res) => res.json())
      .then((result) => setCartList(result));
  };

  //백엔드 통신
  // const getCartList = () => {
  //   fetch('http://localhost:3000/carts/', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: accessToken,
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(result => setCartList(result));
  // };

  useEffect(() => {
    getCartList();
  }, []);

  //총 가격 계산
  const totalPrice = cartList
    .filter((el) => checkItems.includes(el.productOptionId))
    .reduce((acc, cur) => acc + cur.quantity * cur.price, 0);
  console.log(cartList);
  console.log(totalPrice);
  //삭제 버튼 통신

  const cartDelete = (productOptionId) => {
    setCartList(
      cartList.filter((product) => product.productOptionId !== productOptionId)
    );
    const beforeDeleted = cartList.filter(
      (el) => el.productOptionId === productOptionId
    );

    fetch(`http://localhost:3000/carts/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        cartId: [`${beforeDeleted[0].cartId}`],
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "cart deleted") {
          alert("삭제가 완료되었습니다.");
          getCartList();
        } else {
          alert("다시 시도해주세요!");
        }
      });
  };

  /////여기까지 삭제 버튼 통신
  return (
    <div className="container">
      <div className="cart">
        <div className="cartContainer">
          <div className="titleContainer">
            <input
              className="allCheckBox check"
              type="checkbox"
              onChange={(e) => handleAllCheck(e.target.checked)}
              checked={checkItems.length === cartList.length ? true : false}
            />
            <h1 className="titleWord titleCart">장바구니</h1>
            <button className="deleteButton" onClick={selectDelete}>
              선택 삭제
            </button>
          </div>
          <div className="cartInner">
            {cartList.length > 0 ? (
              cartList.map((product) => (
                <ProductList
                  cartDelete={cartDelete}
                  key={product.productOptionId}
                  product={product}
                  setCheckItems={setCheckItems}
                  checkItems={checkItems}
                  getCartList={getCartList}
                  selectDelete={selectDelete}
                  onChangeAmount={(amount) => {
                    setCartList(
                      cartList.map((cart) => {
                        if (cart.productOptionId === product.productOptionId) {
                          cart.quantity = amount;
                        }
                        return cart;
                      })
                    );
                  }}
                />
              ))
            ) : (
              <div className="noCart">상품이 없습니다</div>
            )}
          </div>
        </div>
        <div className="orderContainer">
          <h1 className="order titleWord">주문내역</h1>
          <aside className="orderList">
            <div className="orderPriceWrap orderFlex">
              <div className="priceMent fontSize">상품금액</div>
              <div className="orderPrice fontSize">
                {totalPrice.toLocaleString()} 원
              </div>
            </div>
            <div className="deliveryWrap orderFlex">
              <div className="deliveryPrice fontSize">배송비</div>
              <div className="free fontSize">무료</div>
            </div>
            <div className="totalPriceWrap orderFlex">
              <div className="totalOrder fontSize">총 결제 금액</div>
              <div className="finalPrice fontSize">
                {totalPrice.toLocaleString()} 원
              </div>
            </div>
            <div className="orderbtnWrap">
              <button
                className="orderBtn"
                onClick={goToOrderList}
                disabled={cartList && !checkItems}
              >
                주문결제
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Cart;
