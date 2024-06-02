import Appear from "@/components/appear";
import { HTMLAttributes } from "react";

const Description = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="container flex flex-wrap gap-y-8">
        <div className="lg:w-1/2 flex items-center">
          <div className="lg:mr-20">
            <h2 className="mb-8 text-3xl font-bold before:content-['WHO_WE_ARE'] before:block before:text-primary before:text-[0.6em] before:font-normal">
              Robotics & IoT - HCMUS
            </h2>
            <Appear variant="right">
              <p className="mt-4">
                Des yeux qui font baisser les miens un rire qui se perd sur sa bouche voilà le
                portrait sans retouche de l&apos;homme auquel j&apos;appartiens. Quand il me prend
                dans ses bras il me parle tout bas je vois la vie en rose qu&apos;il me dit des mots
                d&apos;amour des mots de tous les jours et ça me fait quelque chose.
              </p>
            </Appear>
            <Appear variant="right">
              <p className="mt-4">
                Il est entré dans mon cœur Une part de bonheur Dont je connais la cause C&apos;est
                lui pour moi Moi, pour lui, dans la vie Il me l&apos;a dit, l&apos;a juré pour la
                vie Et dès que je l&apos;aperçois Alors, je sens en moi Mon cœur qui bat.
              </p>
            </Appear>
            <Appear variant="right">
              <p className="mt-4">
                Des nuits d&apos;amour à ne plus en finir Un grand bonheur qui prend sa place Des
                ennuis, des chagrins, s&apos;effacent Heureux, heureux à en mourir
              </p>
            </Appear>
          </div>
        </div>
        <div className="lg:w-1/2 flex flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap gap-4 overflow-hidden">
          <Appear variant="up" className="h-48 md:h-full">
            <img src="/picsum-1.png" alt="Image about us" className="h-full object-cover" />
          </Appear>
          <Appear variant="down" className="h-48 md:h-full">
            <img src="/picsum-1.png" alt="Image about us" className="h-full object-cover" />
          </Appear>
        </div>
      </div>
    </section>
  );
};

export default Description;
