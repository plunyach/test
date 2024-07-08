

import '../styles/aboutus.css';
import React from 'react'
import ToolBar from '../component/toolbar'
import { Footer } from './footer'
import anilimg from '../images/aboutus/anilimg.png';
import vikasimg from '../images/aboutus/vikasimg.png';
import bottomline from '../svg/aboutus/bottomline.svg';
import bottomline2 from '../svg/aboutus/bottomline2.svg';
import line from  '../svg/aboutus/line.svg';

export default function Aboutus() {
    return (
        <div>
            <ToolBar fontColor="#474747" logo="black" dropDown="#474747" icons="#474747" backGroundColor="white" stroke="black" />

            <div className='aboutus-main-container1'>
                <div className='aboutus-sub-main-container'>
                    <div className='aboutus-main-container'>
                        <p className='aboutus-heading'>About Us</p>
                        <p className='aboutus-into-txt'>sizeupp is a newly launched one stop shop for all things plus size!  </p>
                    </div>
                </div>

                <div className='aboutus-sub-main-container2'>
                    <div className='aboutus-sub-main-internal-container2'>
                        <p className='aboutus-heading-founfers'>our founders</p>
                        <img src={anilimg} alt='alt' />
                        <span className='anil-name-txt'>mr. anil saraf</span>
                        <img src={bottomline} alt='alt' />
                        <p className='intro-txt'>Mr. Anil Saraf is a seasoned businessman with an impressive three-decade-long career as
                            a garment manufacturer. His illustrious journey includes collaborations with renowned brands
                            such as Pantaloons, Jade Blue and Mufti, solidifying his reputation as a trusted partner. His
                            journey began as a passionate entrepreneur, and today, he stands as a visionary leader in the
                            field. His enduring success stands as a testament to his dedication and vision in the world of fashion.
                        </p>
                        <img className='vikas-img' src={vikasimg} alt='alt' />
                        <span className='vikas-name-txt'>mr. vikas singh</span>
                        <img src={bottomline} alt='alt' />
                        <p className='intro-txt'>The ingenious mind of our little unconventional founder brings to you Sizeupp. A sourcing and
                            product specialist with a never-ending hunger for creating beautiful and affordable clothes
                            geared up to make everyone find their right fit!
                            Vikash is a Nift alumni with 16+ years in the trade set out to revolutionise the plus size apparels space.
                            He aspires to create a brand that can provide plus size individuals' clothes for every occasion.</p>
                    </div>
                </div>

                <div className='aboutus-sub-main-container-bottom '>
                    <div className='aboutus-main-container'>
                        <span className='introduction-txt'>introduction</span>
                        <img src={bottomline2} alt='alt' />
                        <p className='intro-txt'>The fashion industry is slowly but surely starting to recognise the beauty in
                            all body types. We hear talk about size inclusive fashion and see plus size models across ad campaigns.
                            However, this appreciation falls short when it comes to actual shoppable fashion choices in store. Sizeupp
                            is here to fix just this.
                        </p>
                        <p className='intro-txt'>
                            We have created a brand that is dedicated solely to plus size fashion and understanding the nuances that
                            come with it. At Sizeupp, plus size clothing is not just a small tab on a large website. It IS the entire website.
                        </p>
                    </div>

                    <div className='aboutus-main-container'>
                        <span className='introduction-txt'>vision and values</span>
                        <img src={bottomline2} alt='alt' />
                        <p className='intro-txt'>Sizeupp was founded on the fundamental belief that fashion should not be
                            limited to a specific size range. It should be a welcoming space for all body shapes and sizes.
                            We envision a world where every plus size individual can easily find trendy, comfortable, and high-quality
                            clothing that not only
                            fits their bodies but also gives them the ability to express themselves through fashion.</p>
                        <p className='intro-txt'>Our core values are authenticity, inclusivity and self-expression. Sizeupp is dedicated to celebrating these values through its designs,
                            models and marketing campaigns. Thus ensuring that our customers feel seen and represented.</p>
                    </div>

                    <div className='aboutus-main-container'>
                        <span className='introduction-txt'>product range</span>
                        <img src={bottomline2} alt='alt' />
                        <p className='intro-txt'>Whether you are looking for everyday essentials, office wear or an outfit
                            for a fun night out, Sizeupp’s diverse collection has something for everyone.</p>
                        <p className='intro-txt'>Our dedicated design team spends an extensive amount of time researching and developing garments that
                            fit perfectly and accentuate the beauty of bigger bodies.</p>
                    </div>

                    <div className='aboutus-main-container'>
                        <span className='introduction-txt'>empowering fashion for all</span>
                        <img src={bottomline2} alt='alt' />
                        <p className='intro-txt'>Fashion is a world of endless possibilities which enables us to express our individuality. We at Sizeupp
                            believe that everyone should have the freedom to dress as they please irrespective of their size and gender.</p>
                    </div>
                </div>

                <div className='aboutus-sub-main-container2'>
                    <p className='sizeup-txt-btm'>let sizeupp inspire you to bring forth your</p>
                    <div className='fashion-txt'>
                    <span><img src={line} alt='alt'/></span>
                    <span>fashion a game!</span>
                    <span><img src={line} alt='alt'/></span>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

