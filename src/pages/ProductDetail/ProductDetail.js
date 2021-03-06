import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Slider } from "./compo/Slider";
import { PolicyBox } from "./compo/PolicyBox";
import { ViewCart } from "./compo/ViewCart";
import { NewTag, PopUp, Price, TopBottom } from "./compo/MiniCopo";
import ScrollToTop from "../../components/ScrollToTop";
import { RiArrowGoBackFill } from "react-icons/ri";
import "./ProductDetail.scss";

const ProductDetail = () => {
  const params = useParams();
  const [ad, setAd] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [imgList, setImgList] = useState([]);
  const [originalImg, setOriginalImg] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addCart, setAddCart] = useState(false);
  const [noticeNum, setNoticeNum] = useState(1);
  const userId = localStorage.getItem("token");
  const [x, setX] = useState(0);

  useEffect(() => {
    const adTimer = setTimeout(() => {
      setAd(true);
    }, 1000);

    fetch(`${process.env.REACT_APP_BASE_URL}/product/${params.product}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(res => {
        setData(res);
        const newImg = [...res.url, ...res.url];
        setImgList(newImg);
        setX(-(parseInt(newImg.length / 2, 10) * 600));
        setOriginalImg(res.url);
      });

    return () => {
      clearTimeout(adTimer);
    };
  }, [params.product]);

  const priceObject = (isSale, quantity) => {
    if (isSale) {
      return Math.round(data.price * (1 - data.sale_rate / 100) * quantity);
    } else {
      return Math.round(data.price * quantity);
    }
  };

  const toCart = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/cart`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        product_id: data.id,
        cart_quantity: quantity,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.result === true) {
          setAddCart(res.result);
        }
      })
      .catch(err => alert("????????? ????????????."));
  };
  const pickColor = cate => {
    switch (cate) {
      case "dog":
        return { backgroundColor: "#fccf1d" };
      case "cat":
        return { backgroundColor: "#c81a20" };
      case "turtle":
        return { backgroundColor: "#016ad5" };
      case "hamster":
        return { backgroundColor: "#cda5e0" };
      case "bird":
        return { backgroundColor: "#d8e22d" };
      default:
        return { backgroundColor: "black" };
    }
  };

  const toComma = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="ProductDetail">
      <ScrollToTop />
      <div className="detailArea">
        {addCart ? (
          <ViewCart
            cate={data.cate_name}
            setAddCart={setAddCart}
            navigate={navigate}
          />
        ) : null}
        <section className="mainArea">
          {data.is_new ? <NewTag /> : null}
          <div className="slideContainer">
            <div className="dumy" />
            <Slider
              x={x}
              setX={setX}
              imgList={imgList}
              setImgList={setImgList}
              originalImg={originalImg}
            />
          </div>
          <div className="productDetailArea">
            <div className="detailHeading">
              <ul className="noticeInfo">
                <li>
                  ?????? WETOWN & STORE??? WE ENTERTAINMENT ?????? ????????? ??????????????????.
                </li>
                <li>
                  ?????? WETOWN & STORE??? ????????? ??????????????? ?????? ???????????????,
                  ???????????? ??? ????????? ???????????????
                </li>
                <li>
                  ?????? WETOWN & STORE??? ?????? ?????? ????????? ????????????? ?????????????
                  ???????????????.
                </li>
              </ul>
              <div className="noticeIcon">
                <span>????</span> <span>????</span>
              </div>
              <div className="noticeImg">
                <div className="ad">
                  <img src="/images/ad.png" alt="ad" />
                </div>
                <div className="corona">
                  <img src="/images/corona.png" alt="corona" />
                </div>
              </div>
            </div>
            <div className="detailImg">
              {originalImg.map((e, i) => {
                return (
                  <div className="productImg" key={i}>
                    <img src={e.image} alt="productImg" />
                  </div>
                );
              })}
            </div>
            <PolicyBox noticeNum={noticeNum} setNoticeNum={setNoticeNum} />
          </div>
        </section>
        <section className="sidebarArea">
          <div className="sideHeading">
            <div className="subCateName">
              {data.subcate_name?.toUpperCase()}
            </div>
            <div className="productName">{data.eng_name?.toUpperCase()}</div>
            <div className="productPrice">
              {data.sale_rate ? (
                <Price sale={data.sale_rate} price={data.price} />
              ) : (
                `??? ` + toComma(priceObject(false, 1))
              )}
              <span className="shareIcon">
                <img src="/images/shareIcon.png" alt="shareIcon" />
              </span>
            </div>
          </div>
          <div
            className="savedMoney"
            onMouseEnter={() => {
              setIsOpen(true);
            }}
            onMouseLeave={() => {
              setIsOpen(false);
            }}
          >
            <ul className="savedName">
              <li>?????????</li>
              <li className="beforeHover">???????????????</li>
              <li className="beforeHover">???????????????</li>
            </ul>
            <ul className="savedValue">
              <li>0.5% ({Math.round(data.price * 0.005) + ` P`})</li>
              <li className="beforeHover">PINK SILVER ??????????????? +0.2%</li>
              <li className="beforeHover">PINK GOLD ??????????????? +0.5%</li>
            </ul>
            <span>
              <img
                src={!isOpen ? "/images/open.png" : "/images/close.png"}
                alt="open"
              />
            </span>
          </div>
          <div className="sideInfo">
            * ?????? ???????????? ??????????????? ???????????? ??????????????? ?????? ?????? ??? ?????????
            ???????????????. ????????? ?????? ?????? ????????????.
          </div>
          <div className="quantityArea">
            <div className="quantityName">{data.eng_name?.toUpperCase()}</div>
            <div className="quantityBox">
              <div className="quantityBtn">
                <button
                  className="minus"
                  onClick={() => {
                    quantity <= 1
                      ? alert("?????? ??????????????? 1??? ?????????.")
                      : setQuantity(quantity - 1);
                  }}
                >
                  -
                </button>
                {quantity}
                <button
                  className="plus"
                  onClick={() => {
                    quantity >= 10
                      ? alert("?????? ??????????????? 10??? ?????????.")
                      : setQuantity(quantity + 1);
                  }}
                >
                  +
                </button>
              </div>
              <span>
                {`??? ` +
                  (data.sale_rate
                    ? toComma(priceObject(true, quantity))
                    : toComma(priceObject(false, quantity)))}
              </span>
            </div>
          </div>
          <div className="totalArea">
            <span>TOTAL</span>
            <div>
              <span className="totalPrice">
                {`??? ` +
                  (data.sale_rate
                    ? toComma(priceObject(true, quantity))
                    : toComma(priceObject(false, quantity)))}
              </span>
              <span className="totalQuantity">({quantity + `???`})</span>
            </div>
          </div>
          <div className="orderArea">
            <button className="orderBtn" style={pickColor(data.cate_name)}>
              ?????? ????????????
            </button>
            <div className="btnBox">
              <button
                className="cartBtn"
                onClick={() => {
                  toCart();
                }}
              >
                ???????????? ??????
              </button>
              <button
                className="wishBtn"
                onClick={() => {
                  navigate(`/category/${data.cate_name}`);
                }}
              >
                ???????????? <RiArrowGoBackFill />
              </button>
            </div>
          </div>
          <div className="withHappyArea">
            <div className="title">???????????? ?????? ??????!</div>
            <div className="happyArea">
              <div className="happyBox">
                <div className="happyBackground">
                  <span>
                    <img src="/images/cat12.png" alt="cat" />
                  </span>
                </div>
                <div className="happyName">SUPER PRETTY CAT TOWER</div>
                <div className="happyPrice">??? 55,000</div>
              </div>
              <div className="happyBox">
                <div className="happyBackground">
                  <span>
                    <img src="/images/cat13.png" alt="cat" />
                  </span>
                </div>
                <div className="happyName">LUXURIOUS CAT CUSHION</div>
                <div className="happyPrice">??? 120,000</div>
              </div>
            </div>
          </div>
        </section>
        <TopBottom />
      </div>
      {ad && data.quantity <= 999 ? (
        <PopUp
          setAd={setAd}
          title="Hurry Up!"
          subtitle="????????? ?????? ?????? ????????????."
        />
      ) : null}
    </div>
  );
};

export default ProductDetail;
