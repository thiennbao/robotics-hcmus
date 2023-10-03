import Heading from "components/Heading";
import style from "./Timeline.module.scss";
import Section from "components/Section";
import Appearance from "components/Appearance";

const Item = ({ data }) => {
  return (
    <div>
      <div className={style.time}>
        <h4>{data.time}</h4>
      </div>
      <div>
        <h3>{data.title}</h3>
        <p>{data.content}</p>
        <div className="row g-2">
          {data.images.map((image, index) => (
            <div key={index} className="col-xl-3 col-lg-6 col-md-3 col-6">
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  // Call API bla bla
  const timeline = [
    {
      title: "Lorem ipsum dolor sit amet",
      content:
        "Aptent pretium semper gravida lacinia erat taciti. Consectetur velit sollicitudin eleifend imperdiet consequat tempor natoque augue ridiculus. Mauris mus tempus aptent viverra fermentum nunc eros dictumst dolor pulvinar aliquet.",
      time: "October 18 2023",
      images: [
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
      ],
    },
    {
      title: "Lorem ipsum dolor sit amet",
      content:
        "Aptent pretium semper gravida lacinia erat taciti. Consectetur velit sollicitudin eleifend imperdiet consequat tempor natoque augue ridiculus. Mauris mus tempus aptent viverra fermentum nunc eros dictumst dolor pulvinar aliquet.",
      time: "October 18 2023",
      images: [
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
      ],
    },
    {
      title: "Lorem ipsum dolor sit amet",
      content:
        "Aptent pretium semper gravida lacinia erat taciti. Consectetur velit sollicitudin eleifend imperdiet consequat tempor natoque augue ridiculus. Mauris mus tempus aptent viverra fermentum nunc eros dictumst dolor pulvinar aliquet.",
      time: "October 18 2023",
      images: [
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
      ],
    },
    {
      title: "Lorem ipsum dolor sit amet",
      content:
        "Aptent pretium semper gravida lacinia erat taciti. Consectetur velit sollicitudin eleifend imperdiet consequat tempor natoque augue ridiculus. Mauris mus tempus aptent viverra fermentum nunc eros dictumst dolor pulvinar aliquet.",
      time: "October 18 2023",
      images: [
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
      ],
    },
    {
      title: "Lorem ipsum dolor sit amet",
      content:
        "Aptent pretium semper gravida lacinia erat taciti. Consectetur velit sollicitudin eleifend imperdiet consequat tempor natoque augue ridiculus. Mauris mus tempus aptent viverra fermentum nunc eros dictumst dolor pulvinar aliquet.",
      time: "October 18 2023",
      images: [
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
      ],
    },
  ];

  return (
    <Section>
      <Heading className="text-center" subcontent="Pellentesque fames at dui eu justo">
        Timeline malesuada elementum
      </Heading>
      <div className={style.timeline}>
        <ul>
          {timeline.map((item, index) => (
            <li key={index}>
              <Appearance type={index % 2 || window.innerWidth <= 992 ? "left" : "right"}>
                <Item data={item} />
              </Appearance>
            </li>
          ))}
          <div style={{ clear: "both" }}></div>
        </ul>
      </div>
    </Section>
  );
};

export default Timeline;
