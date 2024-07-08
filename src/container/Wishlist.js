


import '../styles/wishlist.css';
import React, { useContext, useEffect, useState } from 'react';
import pip_img1 from '../images/pip/ipi_img1.png';
import pip_img2 from '../images/pip/ipi_img2.png';
import pip_img3 from '../images/pip/ipi_img3.png';
import pip_img4 from '../images/pip/ipi_img4.png';
import filledwishheart from '../svg/pip/filledwishheart.svg';
import emptywishheart from '../svg/pip/emptywishheart.svg';
import select_more from '../svg/pip/select_more.svg';
import moreicon from '../svg/wishlist/moreicon.svg';
import ToolBar from '../component/toolbar';
import { Footer } from "../container/footer";
import noteContext from '../context/noteContext';

const products = [
  {
    id: 1,
    image: pip_img4,
    name: 'Yellow Sweat T-shirt',
    price: '1499',
  },
  {
    id: 2,
    image: pip_img3,
    name: 'Yellow Sweat T-shirt',
    price: '1499',
  },
  {
    id: 3,
    image: pip_img2,
    name: 'Yellow Sweat T-shirt',
    price: '1499',
  },
  {
    id: 4,
    image: pip_img1,
    name: 'Yellow Sweat T-shirt',
    price: '1499',
  },
  {
    id: 5,
    image: pip_img3,
    name: 'Yellow Sweat T-shirt',
    price: '1499',
  },
  {
    id: 6,
    image: pip_img4,
    name: 'Yellow Sweat T-shirt',
    price: '1499',
  },
  {
    id: 7,
    image: pip_img1,
    name: 'Yellow Sweat T-shirt',
    price: '1499',
  },
  {
    id: 8,
    image: pip_img2,
    name: 'Yellow Sweat T-shirt',
    price: '1499',
  },

  // Add more data objects for other products
];

export default function Wishlist() {

  const [Color, setColor] = useState(false);
  const [Style, setStyle] = useState(false);
  const [Pattern, setPattern] = useState(false);
  const [Size, setSize] = useState(false);
  const [isLike, setIsLike] = useState(true);


  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState('Select Size'); // Initialize with default text

  const sizeOptions = ['Small', 'Medium', 'Large', 'XL']; // Replace with your available size options

  const { setIsWishList } = useContext(noteContext)

  useEffect(() => {
    setIsWishList(true)
  }, [])

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSizeClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setDropdownOpen(false); // Close the dropdown after selecting a size
    setSelectedSize(size);
    setIsDropdownVisible(false); // Hide the dropdown after selection
  };

  const handleSizeMoreColor = () => {
    // console.log("color");
    setColor(!Color);
  }

  const handleSizeMoreStyle = () => {
    setStyle(!Style);
  }

  const handleSizeMoreSize = () => {
    setSize(!Size);
  }

  const handleSizeMorePattern = () => {
    setPattern(!Pattern);
  }

  const handleLikeMethods = () => {
    setIsLike(!isLike);
  }

  return (
    <div>
      <ToolBar fontColor="#474747" logo="black" dropDown="#474747" icons="#474747" backGroundColor="white" stroke="black" />
      <div className='wishlist-container'>
        <div className='pip-heading-women'>
          <p>Wishlist</p>
        </div>

        <div className='wishlist-super-main-container'>
          {products.map((product) => (
            <div className='wishlist-main-image-container' key={product.id}>
              <div className='wishlist-sub-image-container'>
                <div className='wishlist-img'>
                  <img src={product.image} alt='alt' className='dropdown-img' />
                  {!isLike ? (
                    <img src={emptywishheart} alt='alt' className='emptyheart-wishlist' onClick={handleLikeMethods} />
                  ) : (
                    <img src={filledwishheart} alt='alt' className='filledheart-wishlist' onClick={handleLikeMethods} />
                  )}
                </div>
                <span className='wish-product-name'>{product.name}</span>
                <span className='wish-product-price'><b>₹</b>{product.price}</span>
                <div className='wishlist-select-size-btn'>
                  <div className='size-selector-div' onClick={handleSizeClick}>
                    <button className='wishlist-size-btn'>{selectedSize}</button>
                    <span className='img-size-drpdwn'>
                      <img src={moreicon} alt='alt' className='dropdown-img' />
                    </span>
                  </div>
                  {isDropdownOpen && (
                    <div className='size-dropdown'>
                      <ul className={`size-options ${isDropdownVisible ? 'visible' : ''}`}>
                        {sizeOptions.map((size, index) => (
                          <li key={index} onClick={() => handleSizeChange(size)}>
                            {size}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button className='wish-add-to-cart-btn'>Add To Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
