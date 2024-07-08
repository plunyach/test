
import ToolBar from '../component/toolbar';
import '../styles/productdetails.css'
import { Footer } from "./footer";
import pd_img1 from '../images/productdetails/pd_img1.png';
import pd_img2 from '../images/productdetails/pd_img2.png';
import pd_img3 from '../images/productdetails/pd_img3.png';
import pd_img4 from '../images/productdetails/pd_img4.png';
import pd_img5 from '../images/productdetails/pd_img5.png';
import pd_img6 from '../images/productdetails/pd_img6.png';
import wishList from '../svg/productDetails/wishList.svg';
import reviewed from '../svg/productDetails/reviewed.svg';
import pd_imgselect1 from '../images/productdetails/pd_imgselect1.png';
import pd_imgselect2 from '../images/productdetails/pd_imgselect2.png';
import pd_imgselect3 from '../images/productdetails/pd_imgselect3.png';
import pd_imgselect4 from '../images/productdetails/pd_imgselect4.png';
import like from '../svg/productDetails/like.svg';
import dislike from '../svg/productDetails/dislike.svg';
import pd_img11 from '../images/productdetails/pd_img11.png';
import viewmore from '../svg/productDetails/viewmore.svg';
import React, { useState } from 'react';
import reviewed_singlestar from '../svg/productDetails/reviewed_singlestar.svg';
import maximize_pd from '../svg/productDetails/maximize_pd.svg'
import Checkbox from 'react-custom-checkbox';
import likeempty from '../svg/productDetails/likeempty.svg';

// const reviewsData = [
//     {
//         name: 'sonali kumar',
//         rating: "5.0",
//         reviewText: 'Lörem ipsum megad måna vifongen. Dysskop episk. Apocentrism nesegt krosat samt nigisk. 24-timmarsmyndighet.',
//         imageCount: 6,
//         likeCount: 31,
//         dislikeCount: 6,
//     },
//     {
//         name: 'sonali kumar',
//         rating: "4.0",
//         reviewText: 'Lörem ipsum megad måna vifongen. Dysskop episk. Apocentrism nesegt krosat samt nigisk. 24-timmarsmyndighet.',
//         imageCount: 6,
//         likeCount: 31,
//         dislikeCount: 6,
//     },
//     {
//         name: 'sonali kumar',
//         rating: "5.0",
//         reviewText: 'Lörem ipsum megad måna vifongen. Dysskop episk. Apocentrism nesegt krosat samt nigisk. 24-timmarsmyndighet.',
//         imageCount: 6,
//         likeCount: 31,
//         dislikeCount: 6,
//     },
//     {
//         name: 'sonali kumar',
//         rating: "4.0",
//         reviewText: 'Lörem ipsum megad måna vifongen. Dysskop episk. Apocentrism nesegt krosat samt nigisk. 24-timmarsmyndighet.',
//         imageCount: 6,
//         likeCount: 31,
//         dislikeCount: 6,
//     },
// ];
export default function ProductDetails() {

    const [isSelected, setIsSelected] = useState(false);
    const [view, setView] = useState(true);
    const [guide, setGuide] = useState(false);
    const [productDetails, setProductDetails] = useState(false);
    const [delivery, setDelivery] = useState(false);

    const [pin, setPin] = useState('');
    const [availability, setAvailability] = useState(null);

    // Function to check PIN availability
    const checkPin = () => {
        if (pin.trim() === '') {
            setAvailability('Enter Pin');
        } else {
            if (pin === '12345' || pin === '400001') {
                setAvailability('Products are available for delivery ');
            } else {
                setAvailability('Products are not available for delivery');
            }
        }
    };
    const toggleSelection = (e) => {
        setIsSelected(!isSelected);
    };

    const handleReview = () => {
        setView(!view);
    }

    const handleProductDetails = () => {
        setProductDetails(!productDetails);
    }
    const handleGuide = () => {
        setGuide(!guide);
    }

    const handleDelivery = () => {
        setDelivery(!delivery);
    }
    const handleSizeguilde = () => {
        // setGuide(!guide);
    }

	const getProductPrice =(price, discountPrice) =>
  {
	if (discountPrice)
	{
		return parseInt(discountPrice);
	}
	return parseInt(price);
  }

  const getDiscountPercent =(price, discountPrice) =>
  {
	if (!discountPrice )
	{
		return null;
	}
	const percentage = parseInt((((price - discountPrice)/price)*100));

	return `(${percentage}% OFF)`;
  }

    return (
        <div>
            <ToolBar fontColor="#474747" logo="black" dropDown="#474747" icons="#474747" backGroundColor="white" stroke="black" />
            <div className='pd-main-container'>
                <div className='pd-sub-main-container'>

                    {/* <div className='pd-sticky-container'> */}
                    <div className='left-img-container'>
                        <img src={pd_img1} alt='alt' />
                        <img src={pd_img2} alt='alt' />
                        <img src={pd_img3} alt='alt' />
                        <img src={pd_img4} alt='alt' />
                        <img src={pd_img5} alt='alt' />
                        <img src={pd_img6} alt='alt' />
                    </div>

                    <div className='pd-right-contianer'>
                        {view && (
                            <div className='pd-right-sub-contianer'>
                                <p className='pd-txt-heading'>red printed dress
                                    <p className='rupee-txt'><span>₹</span> <span> 2,699</span></p>
                                </p>
                                <p><img src={wishList} alt='alt' /></p>
                            </div>)}
                        {view && (
                            <div className='checkbox-main-container'>
                                <p>colour : Red</p>

                                <div className='checkbox-sub-container'>
                                    <div className="custom-radio">
                                        <input type="radio" id="radio1" name="color" value="red" />
                                        <label htmlFor="radio1" className='label-color1'></label>

                                    </div>

                                    <div className="custom-radio">
                                        <input type="radio" id="radio2" name="color" value="blue" />
                                        <label htmlFor="radio2" className='label-color2'></label>

                                    </div>
                                    <div className="custom-radio">
                                        <input type="radio" id="radio3" name="color" value="purple" />
                                        <label htmlFor="radio3" className='label-color3'></label>

                                    </div>
                                    <div className="custom-radio">
                                        <input type="radio" id="radio4" name="color" value="purple" />
                                        <label htmlFor="radio4" className='label-color4'></label>

                                    </div>
                                </div>
                            </div>)}

                        {view && (
                            <div className='main-select-size'>
                                <p>size</p>
                                <div className='select-size'>
                                    <div className='sub-select-size'>
                                        <div className={`selectable-box ${isSelected ? 'selected' : ''}`} id={"color1"}
                                            onClick={(e) => toggleSelection(e)} ><span>s</span></div>
                                        <div className={`selectable-box ${isSelected ? 'selected' : ''}`} id={"color2"}
                                            onClick={(e) => toggleSelection(e)}>M</div>
                                        <div className={`selectable-box ${isSelected ? 'selected' : ''}`} id={"color3"}
                                            onClick={(e) => toggleSelection(e)} >L</div>
                                        <div className={`selectable-box ${isSelected ? 'selected' : ''}`} id={"color4"}
                                            onClick={(e) => toggleSelection(e)} >XL</div>
                                        <div className={`selectable-box ${isSelected ? 'selected' : ''}`} id={"color5"}
                                            onClick={(e) => toggleSelection(e)} >XXL</div>
                                        <div className={`selectable-box ${isSelected ? 'selected' : ''}`} id={"color6"}
                                            onClick={(e) => toggleSelection(e)} >XXXL</div>
                                    </div>
                                    <p className='size-guide' onClick={handleSizeguilde()}><span>size guide</span> <span>
                                        <img src={maximize_pd} alt='alt1' /></span></p>
                                </div>
                            </div>)}

                        {view && (
                            <div className='check-pin'>
                                <input
                                    type='number'
                                    placeholder='Enter Pin'
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                />
                                <button onClick={checkPin}>Check</button>
                                {availability === null ? (
                                    <p className='available-product' style={{ color: availability === '12345' ? 'green' : 'red' }}>availability9999</p>
                                ) : (
                                    <p className='available-product' style={{ color: availability === '12345' ? 'green' : 'red' }}>{availability}</p>
                                )}
                            </div>
                        )}

                        {view && (
                            <div className='addtocart'>
                                <button>Add To Cart</button>
                            </div>
                        )}

                        <div className={`${!view ? 'reviewed-container-removedpding' : 'reviewed-container'}`}>
                            {view && (
                                <div className='sub-reviewed-container'>
                                    <p>4.3</p>
                                    <img src={reviewed} alt='alt' /><p>(4000+ reviews)</p>
                                </div>)}

                            {!productDetails && !guide && !delivery && (<div className='review-header1'>
                                <p className={`${!view ? 'review-header-removedpadding' : 'review-header'}`}>top reviews</p>

                                {reviewsData.slice(0, 2).map((review, index) => (
                                    <>
                                        <div className="review-details" key={index}>
                                            <span>{review.name}</span>
                                            <p className="reviewed-singlestar-txt">
                                                <img src={reviewed_singlestar} alt="alt" />
                                                <span className="total-review">{review.rating}</span>
                                            </p>
                                        </div>
                                        <p className="review-content">{review.reviewText}</p>
                                        <div className='details-pd'>
                                            <p>
                                                <img src={pd_img11} alt='alt' /><span>+6 images</span>
                                            </p>

                                            <div className='like-dislike-container'>
                                                <div> <span className='likecounts'>31 </span><img src={like} alt='alt' className='likeimg' /></div>
                                                <div><span className='dislikecounts'>6 </span><img src={dislike} alt='alt' className='likeimg' /></div>
                                            </div>
                                        </div>
                                    </>
                                ))}



                                {!view &&
                                    (
                                        <>
                                            {reviewsData.map((review, index) => (
                                                <>
                                                    <div className="review-details" key={index}>
                                                        <span>{review.name}</span>
                                                        <p className="reviewed-singlestar-txt">
                                                            <img src={reviewed_singlestar} alt="alt" />
                                                            <span className="total-review">{review.rating}</span>
                                                        </p>
                                                    </div>
                                                    <p className="review-content">{review.reviewText}</p>
                                                    <div className='details-pd'>
                                                        <p>
                                                            <img src={pd_img11} alt='alt' /><span>+6 images</span>
                                                        </p>

                                                        <div className='like-dislike-container'>
                                                            <div> <span className='likecounts'>31 </span><img src={like} alt='alt' className='likeimg' /></div>
                                                            <div><span className='dislikecounts'>6 </span><img src={dislike} alt='alt' className='likeimg' /></div>
                                                        </div>                                                    </div>
                                                </>
                                            ))}
                                        </>
                                    )
                                }

                            </div>)}
                            {/* <div className='viewReview' >icon</div> */}


                            <p className='view-more-txt' onClick={() => handleReview()}>


                                {
                                    view ?
                                        <div className='more-less-text'>
                                            <span>View</span><span>More</span>
                                            <span><img src={viewmore} alt='alt' className='dropdown-view-more ' /></span>
                                        </div> :
                                        <div className='more-less-text'>
                                            <span>View</span><span>Less</span>
                                            <span><img src={viewmore} alt='alt' className='dropdown-view-more rotate-dwnarr' /></span>
                                        </div>
                                }
                            </p>
                        </div>
                        {view && (
                            <div className='product-details-review'>
                                <p onClick={() => handleProductDetails()}>Product details <img src={viewmore} alt='alt' className={`${productDetails && 'product-review-txt'}`} /></p>
                                {productDetails &&
                                    (<ol className='pd-details-more'>
                                        <li>
                                            Lörem ipsum megad måna vifongen. Dysskop episk. Apocentrism nesegt krosat samt nigisk. 24-timmarsmyndighet.
                                        </li>
                                        <li>
                                            Lörem ipsum megad måna vifongen. Dysskop episk. Apocentrism nesegt krosat samt nigisk. 24-timmarsmyndighet.
                                        </li>
                                        <li>
                                            Lörem ipsum megad måna vifongen. Dysskop episk. Apocentrism nesegt krosat samt nigisk. 24-timmarsmyndighet.
                                        </li>
                                    </ol>)
                                }

                                <p onClick={() => handleGuide()}>care guide <img src={viewmore} alt='alt' className={`${guide && 'product-review-txt'}`} /></p>
                                {guide &&
                                    (<ol className='pd-details-more'>
                                        <li>
                                            Lörem ipsum megad måna vifongen. Dysskop episk. Apocentrism nesegt krosat samt nigisk. 24-timmarsmyndighet.
                                        </li>
                                        <li>
                                            Lörem ipsum megad måna vifongen. Dysskop episk. Apocentrism nesegt krosat samt nigisk. 24-timmarsmyndighet.
                                        </li>
                                        <li>
                                            Lörem ipsum megad måna vifongen. Dysskop episk. Apocentrism nesegt krosat samt nigisk. 24-timmarsmyndighet.
                                        </li>
                                    </ol>)
                                }
                                <p onClick={() => handleDelivery()}>return policy <img src={viewmore} alt='alt' className={`${delivery && 'product-review-txt'}`} /></p>
                                {delivery &&
                                    (<ol className='pd-details-more'>
                                        <li>
                                            Lörem ipsum megad måna vifongen. Dysskop episk. Apocentrism nesegt krosat samt nigisk. 24-timmarsmyndighet.
                                        </li>
                                        <li>
                                            Lörem ipsum megad måna vifongen. Dysskop episk. Apocentrism nesegt krosat samt nigisk. 24-timmarsmyndighet.
                                        </li>
                                        <li>
                                            Lörem ipsum megad måna vifongen. Dysskop episk. Apocentrism nesegt krosat samt nigisk. 24-timmarsmyndighet.
                                        </li>
                                    </ol>)
                                }
                            </div>)}
                    </div>
                    {/* </div> */}

                </div>
                {view && (
                    <p className={`${!productDetails && !guide && !delivery ? 'might-like-header-txt-rmv-pdg' : 'might-like-header-txt'}`}>you might also like</p>)}
                {view && (
                    <div className='pd-options-product'>
                        <div className='pd-options-product-1'>
                            <div className='img-container-heart-img'>
                                <img className='img-prd-details' src={pd_imgselect1} alt='alt' />
                                <img className='likeemptyimg' src={likeempty} alt='alt' />
                            </div>
                            <span className='product-name'>yellow sweat t shirt</span>
                            <span className='product-price'><span className='rupee-text'>₹</span> 2,190</span>
                        </div>
                        <div className='pd-options-product-1'>
                            <div className='img-container-heart-img'>
                                <img className='img-prd-details' src={pd_imgselect2} alt='alt' />
                                <img className='likeemptyimg' src={likeempty} alt='alt' />
                            </div>
                            <span className='product-name'>yellow sweat t shirt</span>
                            <span className='product-price'><span className='rupee-text'>₹</span> 2,190</span>
                        </div>
                        <div className='pd-options-product-1'>
                            <div className='img-container-heart-img'>
                                <img className='img-prd-details' src={pd_imgselect3} alt='alt' />
                                <img className='likeemptyimg' src={likeempty} alt='alt' />
                            </div>
                            <span className='product-name'>yellow sweat t shirt</span>
                            <span className='product-price'><span className='rupee-text'>₹</span> 2,190</span>
                        </div>
                        <div className='pd-options-product-1'>
                            <div className='img-container-heart-img'>
                                <img className='img-prd-details' src={pd_imgselect4} alt='alt' />
                                <img className='likeemptyimg' src={likeempty} alt='alt' />
                            </div>
                            <span className='product-name'>yellow sweat t shirt</span>
                            <span className='product-price'><span className='rupee-text'>₹</span> 2,190</span>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}
