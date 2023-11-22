import style from "./Quote.module.scss"
import Appear from "components/Appear"

const Quote = () => {
  return (
    <section className={style.quote}>
      <div className="position-absolute top-50 start-50 translate-middle text-center">
        <Appear variant="right">
          <h4>We live, we love, we lie, ♪♪♪</h4>
        </Appear>
        <Appear variant="right">
          <p>Aptent pretium semper gravida lacinia erat taciti. Consectetur velit sollicitudin eleifend imperdiet consequat tempor natoque augue ridiculus. Mauris mus tempus aptent viverra fermentum nunc eros dictumst dolor pulvinar aliquet.</p>
        </Appear>
        <Appear variant="right">
          <p>Aptent pretium semper gravida lacinia erat taciti. Consectetur velit sollicitudin eleifend imperdiet consequat tempor natoque augue ridiculus. Mauris mus tempus aptent viverra fermentum nunc eros dictumst dolor pulvinar aliquet.</p>
        </Appear>
      </div>
    </section>
  )
}

export default Quote