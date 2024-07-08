import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Router";
import Notestate from "./context/noteState";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./container/scrollToTop";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ToolbarProvider } from "./component/toolbarContext";


function App() {
  return (
    <div>
      <Provider store={store}>
        <ToolbarProvider>
          <Notestate>
            <Router>
              <Helmet>
                <title>Sizeupp</title>
              </Helmet>
              <ScrollToTop />
              <AppRouter />
            </Router>
          </Notestate>
        </ToolbarProvider>
      </Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
