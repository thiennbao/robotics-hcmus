import style from "./Wallpaper.module.scss";

const Wallpaper = ({ title, background }) => {
  return (
    <section className={style.wall} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${background})`}}>
      <div className="position-absolute top-50 start-50 translate-middle text-white">
        <h2>{title}</h2>
      </div>
    </section>
  )
}

export default Wallpaper