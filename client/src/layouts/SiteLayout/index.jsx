import Header from "./partials/Header";
import Footer from "./partials/Footer";

const SiteLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default SiteLayout
