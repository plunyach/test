

import ToolBar from '../component/toolbar';
import '../styles/FAQs.css';
import React from 'react'
import { Footer } from './footer';
import bottomline from '../svg/FAQs/bottomline.svg';

export default function FAQs() {
    return (
        <div>

            <ToolBar fontColor="#474747" logo="black" dropDown="#474747" icons="#474747" backGroundColor="white" stroke="black" />

            <div className='faq-main-container'>
                <div className='faq-sub-main-container'>
                    <h2 className='faq-heading'>FAQ’s</h2>

                    <div className='faq-sub-container'>
                        <div className='faq-text-container'>
                            <p className='faq-heading-1'>account</p>
                            <img src={bottomline} alt='alt' />
                            <p className='faq-text-content'>
                                <li> How do I create an account?</li>
                                You can simply click on the sign-up button fill in the required sections and you are registered with us.
                            </p>
                            <p className='faq-text-content'>
                                <li>How do I change my password?</li>
                                Customers may change their password at any time. All you may need to do is please click on https://sizeupp.com/account/login then select on “Forgot Your Password." Enter your registered email address in the provided box and follow the password reset link to change your password.
                            </p>
                            <p className='faq-text-content'>
                                <li> I forgot my password. What should I do now?</li>
                                Please click on https://sizeupp.com/account/login then click on "Forgot Your Password." Please submit your email address and follow the password reset link to change your password  </p>
                        </div>

                        <div className='faq-text-container'>
                            <p className='faq-heading-1'>order</p>
                            <img src={bottomline} alt='alt' />
                            <p className='faq-text-content'>
                                <li> How do I view my past orders?</li>
                                Please login into your account to view your past orders.
                            </p>
                            <p className='faq-text-content'>
                                <li> How do I know if my order has been placed successfully?</li>
                                When you place an order, you will receive a confirmation email and SMS along with an estimated time frame for delivery. You can also check your order under the My Orders tab.
                            </p>
                            <p className='faq-text-content'>
                                <li> My order hasn't yet arrived.</li>
                                Once your order has been placed, you will receive an email with a tentative shipping and delivery date. Alternatively, please check the status of your order under the My Orders tab.
                            </p>
                            <p className='faq-text-content'>
                                <li> How can I modify my order?</li>
                                Unfortunately, at this time, we do not allow modifications to orders that have been placed. If you've changed your mind about a product, you may cancel the order before it's shipped and place a fresh order. In case it's shipped, you will have to return the order, and a full refund will be issued once the order is received by us.
                            </p>
                        </div>


                        <div className='faq-text-container'>
                            <p className='faq-heading-1'>shipping</p>
                            <img src={bottomline} alt='alt' />
                            <p className='faq-text-content'>
                                <li> How many days does it take to ship the products?</li>
                                Let's break it down to make it easy for you. It takes 1-2 working days to ship within the city, 2-3 days within the state, 3-5 working days in Metropolitan Cities, and 5-7 days anywhere in India.
                            </p>
                            <p className='faq-text-content'>
                                <li> How do I add/remove a shipping address?</li>
                                Please login to your account and click on the View Addresses link to add/remove a shipping address.
                            </p>
                            <p className='faq-text-content'>
                                <li> Do we ship internationally?</li>
                                No, we don't ship internationally as of now.
                            </p>
                        </div>



                        <div className='faq-text-container'>
                            <p className='faq-heading-1'>payments</p>
                            <img src={bottomline} alt='alt' />
                            <p className='faq-text-content'>
                                <li> What payment methods are accepted?</li>
                                At present, we accept payment via Net-Banking, UPI, Debit and Credit Cards.
                            </p>
                            <p className='faq-text-content'>
                                <li> My order was unsuccessful, but my account was still debited. What should I do now?</li>
                                If your card is debited by mistake, don't worry. Failed transactions are normally automatically reversed within 7 business days. This time-frame can vary from bank to bank, so please contact your bank for further info.
                            </p>
                            <p className='faq-text-content'>
                                <li> Help, I've been charged twice!</li>
                                This is very unlikely. However, if you believe that you've been mistakenly charged multiple times for the same order, please write to us with screenshots of your bank statement at customercare@sizeupp.com, and we will do our best to resolve your issue.
                            </p>
                        </div>

                        <div className='faq-text-container'>
                            <p className='faq-heading-1'>returns</p>
                            <img src={bottomline} alt='alt' />
                            <p className='faq-text-content'>
                                <li>Can I return part or all of my order at the time of delivery?</li>
                                Instant returns are not possible. Products will have to be sent back after initiating a reverse pick-up request or by self-shipping if reverse pick-up is not available.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
