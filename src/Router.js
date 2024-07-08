import { Routes, Route } from "react-router-dom"
import { pagePaths } from "./utils/constant"
import DashBoard from "./component/Dashboard";
import { SignInMobile } from "./container/signInMobile";
import { CreateAccount } from "./container/createAccount";
import { CartPage } from "./container/cartPage";
import { MyOrderPage } from "./container/myOrderPage";
import { ShippingPage } from "./container/shippingDetails";
import { ShippingPageFromPDP } from "./container/shippingDetailsfromPDP";
import { PaymenyPages } from "./container/paymentPages";
import OrderDetails2 from "./container/dummyTest";
import { CareerPage } from "./container/careerPage";
import { ContactUsPAge } from "./container/ContactUsPage";
import ProductListing from "./container/ProductListing";
import AboutUsPage from "./container/AboutusPage";
import Cancellation from "./container/Cancellation";
import CancellationPolicy from "./container/CancellationPolicy";
import FAQs from "./container/FAQs";
import PressRelease from "./container/PressRelease";
import Privacypolicy from "./container/Privacypolicy";
import ProductDetailsPage from "./container/ProductDetailsPage";
import ShippingPolicy from "./container/ShippingPolicy";
import Sitemap from "./container/Sitemap";
import TermsOfServices from "./container/TermsOfServices";
import WishlistPage from "./container/WishlistPage";
import ShippingConfirmPage from "./container/shippingConfirmPage";

const AppRouter = () => {

    return (
        <Routes>
            <Route path={pagePaths.root} element={<DashBoard />} />
            <Route path={pagePaths.signIn} element={<SignInMobile />} />
            <Route path={pagePaths.createAccount} element={<CreateAccount />} />
            <Route path={pagePaths.cartPage} element={<CartPage />} />
            <Route path={pagePaths.myOrderPage} element={<MyOrderPage />} />
            <Route path={pagePaths.shippingPage} element={<ShippingPage />} />
            <Route path={pagePaths.ShippingPageFromPDP} element={<ShippingPageFromPDP />} />
            <Route path={pagePaths.paymentPages} element={<PaymenyPages />} />
            <Route path={pagePaths.dummyTest} element={<OrderDetails2 />} />
            <Route path={pagePaths.careerPage} element={<CareerPage />} />
            <Route path={pagePaths.contactUsPage} element={<ContactUsPAge />} />
            <Route path={pagePaths.products} element={<ProductListing />} />
            <Route path={pagePaths.aboutUsPage} element={<AboutUsPage />} />
            <Route path={pagePaths.cancellationPage} element={<Cancellation />} />
            <Route path={pagePaths.cancellationPolicy} element={<CancellationPolicy />} />
            <Route path={pagePaths.faq} element={<FAQs />} />
            <Route path={pagePaths.pressRealese} element={<PressRelease />} />
            <Route path={pagePaths.privacyPolicy} element={<Privacypolicy />} />
            <Route path={pagePaths.productDetailsPage} element={<ProductDetailsPage />} />
            <Route path={pagePaths.shippingPolicy} element={<ShippingPolicy />} />
            <Route path={pagePaths.sitemap} element={<Sitemap />} />
            <Route path={pagePaths.termsOfServices} element={<TermsOfServices />} />
            <Route path={pagePaths.wishlistPage} element={<WishlistPage />} />
            <Route path={pagePaths.shippingConfirmPage} element={<ShippingConfirmPage />} />

        </Routes>
    )
}

export default AppRouter;