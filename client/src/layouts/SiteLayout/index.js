import Header from "layouts/partials/Header";
import Footer from "layouts/partials/Footer";

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
