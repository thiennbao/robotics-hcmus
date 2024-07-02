import { HTMLAttributes } from "react";
import Appear from "../utils/appear";

const Quote = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="text-light bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(/picsum-1.png)] bg-cover bg-center">
        <div className="h-full flex justify-center items-center backdrop-blur-sm">
          <div className="w-4/5 md:w-3/4 xl:w-3/5 py-16 text-center overflow-hidden">
            <Appear variant="left">
              <p className="text-3xl mb-8">Wir leben, wir lieben, wir lügen, ♪♪♪</p>
            </Appear>
            <Appear variant="left">
              <p className="mb-4">
                Auf der Heide blüht ein kleines Blümelein und das heißt Erika. Heiß von
                hunderttausend kleinen Bienelein wird umschwärmt Erika. Denn ihr Herz ist voller
                Süßigkeit zarter Duft entströmt dem Blütenkleid.Auf der Heide blüht ein kleines
                Blümelein und das heißt Erika
              </p>
            </Appear>
            <Appear variant="left">
              <p>
                Auf der Heide blüht ein kleines Blümelein und das heißt Erika. Heiß von
                hunderttausend kleinen Bienelein wird umschwärmt Erika. Denn ihr Herz ist voller
                Süßigkeit zarter Duft entströmt dem Blütenkleid.Auf der Heide blüht ein kleines
                Blümelein und das heißt Erika
              </p>
            </Appear>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quote;
