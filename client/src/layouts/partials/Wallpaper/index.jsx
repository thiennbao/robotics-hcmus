import style from "./Wallpaper.module.scss";
import wall from "assets/general/wallpaper-1.jpg"

const Wallpaper = ({ page }) => {
  console.log(window.location.pathname)

  return (
    <section className={style.wall} style={{backgroundImage: `url(${wall})`}}>
      <div className="position-absolute top-50 start-50 translate-middle text-white">
        <h2>{page}</h2>
      </div>
    </section>
  )
}

export default Wallpaper