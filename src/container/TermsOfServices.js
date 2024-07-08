


import React from 'react'
import '../styles/TermsOfServices.css';
import { Footer } from './footer'
import bottomline from '../svg/TermOfServices/bottomline.svg';
import ToolBar from '../component/toolbar'
import { pagePaths } from '../utils/constant';

export default function TermsOfServices() {
    return (
        <div>

            <ToolBar fontColor="#474747" logo="black" dropDown="#474747" icons="#474747" backGroundColor="white" stroke="black" />

            <div className='tos-main-container'>
                <div className='tos-sub-main-container'>
                    <h2 className='tos-heading'>Terms of Service</h2>
                    <p className='tos-text-content'>
                        Access to and use of Sizeupp.com and the products and service available through the website are subject to the following
                        terms, conditions and notices (“Terms of Service”). By browsing through these Terms of Service and using the services
                        provided by our website <a href="www.sizeupp.com">(www.sizeupp.com)</a>, you agree to all Terms of Service
                        along with the Privacy Policy on our website, which may be updated by us from time to time. Please check this page
                        regularly to take notice of any changes we may have made to the Terms of Service. We reserve the right to review and
                        withdraw or amend the services without notice. We will not be liable if for any reason this Website is unavailable at
                        any time or for any period. From time to time, we may restrict access to some parts or this entire Website.
                    </p>

                    <div className='tos-sub-container'>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>Introduction</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                The domain name <a href='www.sizeupp.com'>www.sizeupp.com</a> is a site operated by SizeuppBrand, a company incorporated under laws of India with our registered office at B-220, Solaris 1 IndlEstate, Opp L & T Gate No. 6, Saki Vihar Rd, Powai, Andheri-East, Mumbai-400 072, India (“Company”).
                            </p>
                        </div>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>services</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                Sizeupp.com is an online retailer of apparel and lifestyle products offered at great values to the consumer.
                                Membership allows customers to purchase a variety of products. Upon placing an order, Sizeupp.com shall ship the product to you and be
                                entitled to its payment for the service.
                                Additionally, we may provide you with information about other services, we consider similar to those that you are either already using,
                                or have inquired about, or that may interest you or any combination thereof. Upon registering with us, we may contact you by electronic means
                                (i.e., either e-mail or SMS or telephone or any combination thereof) to inform about these services.
                            </p>
                        </div>
                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>third party websites and content</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                Our website provides links for sharing our content on facebook, twitter and other such third-party website. These are only for sharing and/or listing purpose and we take no responsibility of the third party websites and/or their contents listed on our website <a href='www.sizeupp.com  '>(www.sizeupp.com ) </a>and disclaim all our liabilities arising out of any or all third party websites. We disclaim all liabilities and take no responsibility for the content that may be posted on such third party websites by the users of such websites in their personal capacity on any of the above mentioned links for sharing and/or listing purposes as well as any content and/or comments that may be posted by such user in their personal capacity on any official webpage of Sizeupp on any social networking platform.                </p>
                        </div>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>privacy</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                Our <a href={pagePaths.Privacypolicy}>Privacy Policy</a> incorporated by reference in these Terms of Service, sets out how we will use personal information you provide to us. By using this Website, you agree to be bound by the Privacy Policy, and warrant that all data provided by you is accurate and up to date.                </p>
                        </div>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>exactness of the product</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                The images of the items on the website are for illustrative purposes only. Although we have made every effort to display the colors accurately, we cannot guarantee that your computer's display of the colors accurately reflects the color of the items. Your items may vary slightly from those images. All sizes and measurements of items are approximate; however, we do make every effort to ensure they are as accurate as possible. We take all reasonable care to ensure that all details, descriptions, and prices of items are as accurate as possible.
                            </p>
                        </div>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>pricing</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                We ensure that all details of prices appearing on the website are accurate; however, errors may occur. If we discover an error in the price of any goods which you have ordered, we will inform you of this as soon as possible. If we are unable to contact you, we will treat the order as canceled. If you cancel and you have already paid for the goods, you will receive a full refund. The products available on the website are for retail sales, intended for end-user consumption, and are in no way available for resale. Additionally, prices for items may change from time to time without notice. However, these changes will not affect orders that have already been dispatched. The price of an item includes VAT, goods and service tax (or similar taxes) at the prevailing rate for which we are responsible as a seller. Please note that the prices listed on the website are only applicable for items purchased on the website and not through any other source.
                            </p>
                        </div>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>payment</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                Upon receiving your order, we carry out a standard pre-authorization check on your payment card to ensure there are sufficient funds to fulfill the transaction. Goods will not be dispatched until this pre-authorization check has been completed. Your card will be debited once the order has been accepted. For any further payment-related queries, please check our <a href='FAQs'>FAQs</a> on Payment Mode.
                            </p>
                        </div>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>delivery</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                You will be given various options for delivery of items during the order process. The options available to you will vary depending on where you are ordering from. An estimated delivery time is displayed on the order summary page. On placing your order, you will receive an email containing a summary of the order and also the estimated delivery time to your location. Sometimes, delivery may take longer due to unforeseen circumstances. In such cases, we will proactively reach out to you by e-mail and SMS. However, we will not be able to compensate for any mental agony caused due to delay in delivery.
                            </p>
                        </div>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>returns and refund</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                If you change your mind about any items purchased, you can return them to us. For more information on Returns and Refund, please refer to our <a href={pagePaths.Cancellation}>Return Policy</a>.
                            </p>
                        </div>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>intellectual property rights</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                All and any intellectual property rights in connection with the products shall be owned absolutely by the Company.
                            </p>
                        </div>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>law and jurisdiction</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                These terms shall be governed by and constructed in accordance with the laws of India without reference to conflict of laws principles, and disputes arising in relation hereto shall be subject to the exclusive jurisdiction of the courts at Mumbai.
                            </p>
                        </div>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>indemnification</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                You agree to indemnify, defend, and hold harmless the Company, its directors, officers, employees, consultants, agents, and affiliates, from any and all third-party claims, liability, damages, or costs arising from your use of this website, your breach of these Terms of Service, or infringement of any intellectual property right.
                            </p>
                        </div>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>violation and termination</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                You agree that the Company may, in its sole discretion and without prior notice, terminate your access to the website and block your future access if we determine that you have violated these Terms of Service or any other policies. If you or the Company terminates your use of any service, you shall still be liable to pay for any service that you have already ordered till the time of such termination.
                            </p>
                        </div>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>disclaimer</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                IN NO EVENT WILL THE COMPANY OR ITS REPRESENTATIVES BE LIABLE FOR ANY DAMAGES, ARISING OUT OF OR RELATED TO MISUSE OF PERSONAL INFORMATION OF THE CUSTOMER. THE CUSTOMER IS SOLELY LIABLE FOR SUCH ACTS AND THEY ARE ADVISED NOT TO SHARE THEIR CONFIDENTIAL INFORMATION LIKE SIZEUPP PASSWORD, OTP, CREDIT/DEBIT CARD EXPIRY, AND CVV WITH ANYONE EVEN THOUGH THEY CLAIM TO BE A SIZEUPP.COM EMPLOYEE. NONE OF OUR EMPLOYEES WILL ASK FOR SUCH CONFIDENTIAL INFORMATION.
                            </p>
                        </div>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>contact us</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                If you have any questions, comments, or requests regarding our Terms of Service or the website, please contact us at <a href='mailto:customercare@sizeupp.com'>customercare@sizeupp.com</a>.
                            </p>
                        </div>

                        <div className='tos-text-container'>
                            <p className='tos-content-heading'>grievance officer - required?</p>
                            <img src={bottomline} alt='alt' />
                            <p className='tos-content'>
                                In accordance with Consumer Protection (E-Commerce) Rules, 2020, the name and contact details of the Grievance Officer are provided below: Head – Customer Experience Sizeupp Brands Private Limited, B-220, Solaris 1 IndlEstate, Opp L & T Gate No.6, Saki Vihar Rd, Powai, Andheri-East, Mumbai-400 072, India. Contact: <a href='mailto:customercare@sizeupp.com'>customercare@sizeupp.com</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
