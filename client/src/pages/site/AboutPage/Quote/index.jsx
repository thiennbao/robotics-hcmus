import Appearance from "components/Appearance"
import style from "./Quote.module.scss"

const Quote = () => {
  return (
    <section className={style.quote}>
      <div className="position-absolute top-50 start-50 translate-middle text-center">
        <Appearance type="right">
          <h4>We live, we love, we lie, ♪♪♪</h4>
        </Appearance>
        <Appearance type="right">
          <p>Aptent pretium semper gravida lacinia erat taciti. Consectetur velit sollicitudin eleifend imperdiet consequat tempor natoque augue ridiculus. Mauris mus tempus aptent viverra fermentum nunc eros dictumst dolor pulvinar aliquet.</p>
        </Appearance>
        <Appearance type="right">
          <p>Aptent pretium semper gravida lacinia erat taciti. Consectetur velit sollicitudin eleifend imperdiet consequat tempor natoque augue ridiculus. Mauris mus tempus aptent viverra fermentum nunc eros dictumst dolor pulvinar aliquet.</p>
        </Appearance>
      </div>
    </section>
  )
}

export default Quote