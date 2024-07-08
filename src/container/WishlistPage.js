import '../styles/wishlistPage.css';
import React, { useState } from 'react';
import filledwishheart from '../svg/pip/filledwishheart.svg';
import emptywishheart from '../svg/pip/emptywishheart.svg';
import moreicon from '../svg/wishlist/moreicon.svg';
import ToolBar from '../component/toolbar';
import { Footer } from './footer';
import { useEffect } from 'react';
import axios from 'axios';
import { pagePaths } from '../utils/constant';
import { useContext } from 'react';
import noteContext from '../context/noteContext';
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAllWishItems } from '../redux/slices/wishSlice';
import { setwishlistdata } from '../redux/slices/CurrentUpdateFun';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [codes, setCodes] = useState([]);
  const [removed, setRemoved] = useState(false);
  const { setIsWishList } = useContext(noteContext)
  const dispatch = useDispatch()
  const [data, setData] = useState()

  const [clearStatus, setClearStatus] = useState({
    status: ""
})

// const fetchData = () => {
//   fetch(`${process.env.REACT_APP_BACKEND_URL}/user/wish/item/all`, {
//       method: "GET",
//       headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           Authorization:
//               `Bearer ${token}`,
//       },
//   })
//       .then((response) => response.json())
//       .then((data) => {
//           setData(data);
//           getAllWishItems({ data })
//           console.log(data)
//       })
//       .catch((error) => console.log(error));
// }
// useEffect(() => {
//   fetchData()
// }, [clearStatus])

  const token = JSON.parse(localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : ""

  const handleAddToCart = (ean) => {
    if (token !== "" && ean !== "") {
      let data = JSON.stringify({
        "ean_code": ean
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.sizeupp.wezbo.xyz/user/cart/add',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token + ''
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          if (response.data.ean_code === ean) {
            let config = {
              method: 'delete',
              maxBodyLength: Infinity,
              url: `${process.env.REACT_APP_BACKEND_URL}/user/wishlist/delete/${ean}`,
              headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token + ''
              }
            };
            axios.request(config)
              .then((response) => {
                setRemoved(true)
              })
              .catch((error) => {
                console.log(error);
              });
            // window.location.href = pagePaths.cartPage
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getWishlist = () => {
    if (token) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.sizeupp.wezbo.xyz/user/wishlist',
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token + ''
        }
      };

      axios.request(config)
        .then((response) => {
          if (response.data.length !== 0) {
            setWishlist(response.data)
            getAllWishItems(response.data)
          dispatch(setwishlistdata(response?.data))
            // console.log("getAllWishItems",response.data)
            response.data.map((item) => {
              setCodes((codes) => [...codes, item.product.ean_code])
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const handleRemoveWishlist = (ean_code) => {
    if (!token || token === "" && ean_code === "") {
      window.location.href = pagePaths.signIn
    } else {
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BACKEND_URL}/user/wishlist/delete/${ean_code}`,
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token + ''
        }
      };

      axios.request(config)
        .then((response) => {
          setRemoved(true)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getWishlist()
    setRemoved(false)
  }, [removed])

  useEffect(() => {
    setIsWishList(true)
  }, [])

  useEffect(() => {
    dispatch(getAllWishItems({ data }));
  }, [data]);


  return (<>
    <div className="toolBar_wishlist">
      <ToolBar fontColor="black" logo="black" dropDown="black" icons="black" backGroundColor="white" stroke="black" />
    </div>
    <div>
      <div className='wishlist-container'>

        <div className='pip-heading-women'>
          <p>Wishlist</p>
        </div>



        <div className='pip-main-image-container'
          style={{
            width: "90%",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)"
          }}>
          {
            wishlist?.map((wishItems, id) => {
              return (<>
                <p className='wishlist-sub-image-container'>
                  <Link
                    to={`/product-details?eon=${wishItems.ean_code}`}
                  >
                    <img src={wishItems.product.featuredImage} alt='alt' />
                  </Link>
                  {codes.includes(wishlist?.ean_code) ?
                    (<img
                      src={emptywishheart}
                      alt='alt'
                      className='emptyheart-wishlist'
                    />
                    ) : (
                      <img
                        src={filledwishheart}
                        alt='alt'
                        className='filledheart-wishlist'
                        onClick={() => handleRemoveWishlist(wishItems?.ean_code)}
                      />
                    )}
                  <span>{wishItems.product.product_type}</span>
                  <span>₹ {wishItems.product.mrp}</span>
                  {/* <div className='wishlist-select-size-btn'>
                    <select className='wishlist-size-btn'>Select Size<img src={moreicon} alt='alt' />
                      <option className='wishlist-size-btn'>Select Size</option>
                      <option className='wishlist-size-btn'>1</option>
                      <option className='wishlist-size-btn'>2</option>
                      <option className='wishlist-size-btn'>3</option>
                      <option className='wishlist-size-btn'>4</option>
                    </select>
                    <button className='wish-add-to-cart-btn' onClick={() => handleAddToCart(wishItems?.ean_code)}>Add To Cart</button>
                  </div> */}
                  <a className='wish-add-to-cart-btn' href={`/product-details?eon=${wishItems?.ean_code}&s=${wishItems?.product?.description?.size}`} >View</a>
                </p>
              </>)
            })
          }
        </div>
      </div>
    </div>
    <Footer />
  </>)
}
