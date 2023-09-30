import Section from "layouts/partials/Section";
import style from "./Gallery.module.scss";
import Heading from "components/Heading";
import Appearance from "components/Appearance";

const Gallery = () => {
  // Call IPA for images bla bla
  const images = [
    "https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg",
    "https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg",
    "https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg",
    "https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg",
    "https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg",
    "https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg",
    "https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg",
    "https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg",
    "https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg",
    "https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg",
    "https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg",
    "https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg",
  ];

  // Images slide show and zoom feature bla bla later

  return (
    <Section wavy className={style.gallery}>
      <div className="container">
        <Heading subcontent="--- WELCOME TO">GALLERY</Heading>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
          ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <div className="row g-lg-4 g-md-3 g-2 my-3">
          {images.map((image, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-6">
              <Appearance type="up" animation={{ delay: `${index % 4 * 0.1}s` }}>
                <img src={image} alt="gallery" />
              </Appearance>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Gallery;
