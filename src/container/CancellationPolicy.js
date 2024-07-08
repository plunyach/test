


import ToolBar from '../component/toolbar';
import '../styles/CancellationPolicy.css';
import React, { useEffect } from 'react'
import { Footer } from './footer';
import bottomline from '../svg/CancellationPolicy/bottomline.svg';
import { pagePaths } from '../utils/constant';

// const mainScreenWidth = window.screen.width;
// const cancelFontSize = (3.33 / 100) * mainScreenWidth;



export default function CancellationPolicy() {

  // useEffect(() => {
    const mainScreenWidth = window.screen.width;
    // const fontPercentage = 3.33 / 100;
    const desiredFontSize = 3.33 / 100 * mainScreenWidth;
    const  cp_text_content_1 =  1.1 /100 * mainScreenWidth;
 
    // Select the elements by class name
  //   const elements = document.querySelectorAll('.cp-heading');
  //   const element2 = document.querySelectorAll('.cp-text-content-1');

  //   elements.forEach(element => {
  //     element.style.fontSize = `${desiredFontSize}px`;
  //   });
  // }, []); 

  return (
    <div>

            <ToolBar fontColor="#474747" logo="black" dropDown="#474747" icons="#474747" backGroundColor="white" stroke="black" />

            <div className='cp-main-container'>
                <div className='cp-sub-main-container'>
                    <h2 className='cp-heading'
                    style={{
                      fontSize:`${desiredFontSize}px`
                    }}
                    >cancellations policy</h2>

                    <div className='cp-sub-container'>
                        <div className='cp-text-container'>
                          <p className='cp-text-content-1'>how do i cancel an order?</p>
                          <img src={bottomline} alt='alt' />
                            <p className='cp-text-content'>
                            You can cancel your order online before the product has been shipped. Your entire order amount will be refunded.                            </p>
                            <p className='cp-text-content-2'>
                            In order to cancel an item in your order: </p>
                             <p className='cp-text-content-demo'><span className='cp-text-content-span'>1. </span>
                              Log into your Sizeupp Store account and go to the 'My Orders' page
                            </p> 

                            <p className='cp-text-content-demo'><span className='cp-text-content-span'>2. </span>
                               Identify the item you want to cancel and click on the corresponding 'View Details' link
                            </p>

                            <p className='cp-text-content-demo'><span className='cp-text-content-span'>3. </span>
                              In the detailed order page, you will see 'Cancel' links against each of the items in that order
                            </p>

                           <p className='cp-text-content-demo'><span className='cp-text-content-span'> 4. </span>
                              Click on the 'Cancel' link, indicate the reason for cancellation, choose a mode of refund and confirm cancellation
                            </p>

                            <p className='cp-text-content-demo'><span className='cp-text-content-span'> 5. </span>
                              Once your cancellation request is created, we will ensure that the cancellation is processed as soon as possible
                            </p>

                            <p className='cp-text-content-dark'>Unfortunately, an order cannot be cancelled once the item has been shipped.
                              Kindly feel free to reject the order once it reaches to you*</p>
                        </div>
                    </div>

                    <div className='cp-sub-container'>
                        <div className='cp-text-container'>
                          <p className='cp-text-content-1'>how long will it take to process my cancellation request?</p>
                          <img src={bottomline} alt='alt' />
                            <p className='cp-text-content-demo'>
                            Once you request the cancellation of item(s) in your order, it will take us a maximum of 1-2 business days to cancel the order and initiate a refund. You will be notified of the same by email.  
                            </p>
                            <p className='cp-text-content-demo'>
                            The refund mode will be Sizeupp Store Wallet. The refunded amount will reflect in your account within
6-7 business days.
                            </p>

                            <p className='cp-text-content-demo'>
                            However, if you opt for having the money transferred back to the source of transaction, it may take up to 7 business days for the respective banks to process the refund. Please get in touch with the banks directly in case of any delays post confirmation of cancellation/refund by Sizeupp Store.
                            </p>
                        </div>
                    </div>


                    <div className='cp-sub-container'>
                        <div className='cp-text-container'>
                          <p className='cp-text-content-1'>what are the modes of refund available after cancellation?</p>
                          <img src={bottomline} alt='alt' />
                            <p className='cp-text-content'>
                            In order to confirm cancellation of item(s) in your order, you need to indicate your refund preference.                                 </p>
                            <p className='cp-text-content-2'>
                            Modes of refund:
                            </p>
                            <p className='cp-text-content-demo'>
                            1. Back to Source - In this case, within 6-7 working days the money will be refunded back to the payment mode/account that was originally used to make the transaction.
                            </p>

                            <p className='cp-text-content-demo'>
                              2. Wallet –You will also have an option to keep the money in your wallet so that same can be used again while you shop.
                            </p>

                            <p className='cp-text-content-dark'>Once you have requested the cancellation of item(s) in your order, Sizeupp Store will complete the cancellation and initiate the refund, depending on your preference*</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
  )
}
