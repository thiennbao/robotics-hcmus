import Header from "./partials/Header";
import Footer from "./partials/Footer";

const SiteLayout = ({ children }) => {
  window.scrollTo(0, 0);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default SiteLayout
