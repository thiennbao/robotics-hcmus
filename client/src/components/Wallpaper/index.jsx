import style from "./Wallpaper.module.scss";

const Wallpaper = ({ page, image }) => {
  return (
    <section className={style.wall} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${image})`}}>
      <div className="position-absolute top-50 start-50 translate-middle text-white">
        <h2>{page}</h2>
      </div>
    </section>
  )
}

export default Wallpaper