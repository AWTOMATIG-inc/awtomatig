"use client";
import { useState } from "react";
export default function Accordion() {
  const [showAccordion, setShowAccordion] = useState(false);
  return (
    <div className=" border-t">
      <button
        onClick={() => setShowAccordion((prev) => !prev)}
        className="flex justify-between w-full py-2.5 font-medium"
      >
        <span>UI/UX design</span>
        <span>/01</span>
      </button>
      <div
        className={`border-t border-gray-700 transition-transform duration-500  ${
          showAccordion
            ? "h-full pt-3 scale-y-100 origin-top"
            : "h-0 scale-y-0 origin-bottom"
        }`}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
          quibusdam aliquid officiis dolores, qui reprehenderit rerum assumenda,
          debitis ullam ipsam harum voluptas laboriosam est unde et! Laborum
          maxime animi sint magnam vel eveniet qui quaerat iste, rem corporis.
          Unde, dolore! Itaque nam, amet odit officia nihil excepturi,
          perspiciatis, facere labore iste veritatis illo provident nostrum
          corrupti laboriosam. Eligendi sequi aliquam labore quo quaerat
          repudiandae officia explicabo expedita dicta nobis, corrupti
          necessitatibus dolorum saepe asperiores totam adipisci! Voluptate nemo
          odio, distinctio atque numquam et nam assumenda ratione commodi id
          natus rerum quidem culpa voluptatibus quae amet eum dolorum facere?
          Maxime vitae et, iure accusantium saepe magni similique placeat sit
          repudiandae? Mollitia modi commodi quos aliquam at, velit vel repellat
          expedita tempore sed doloribus aperiam nesciunt provident rem
          distinctio eos obcaecati. Architecto fugit, aut, ullam minima
          obcaecati ab beatae id praesentium iusto officia voluptatum velit
          repellendus soluta nihil quis iure repudiandae distinctio! Reiciendis,
          vero eum maiores dolor magni deserunt quas? Necessitatibus totam hic a
          porro neque deserunt beatae cum. Doloremque quae asperiores, facere
          consectetur eos doloribus in maiores velit incidunt non, voluptate
          exercitationem veniam itaque, vitae quod enim voluptatibus dolor
          cumque ex. At quam eum atque, quidem voluptatem, eveniet neque,
          possimus iure quaerat explicabo qui deserunt. Laboriosam odio vero
          ratione doloremque et obcaecati corporis veniam necessitatibus
          reprehenderit. Explicabo temporibus eius a recusandae saepe eaque,
          corporis nostrum perferendis deserunt nobis! Et nam, debitis ipsa,
          asperiores inventore dolore atque nemo aspernatur, quidem officia
          reiciendis. Vitae veritatis facere cumque nihil porro aliquam
          blanditiis architecto quisquam placeat nesciunt eligendi natus
          impedit, odio eaque unde amet autem dolores laborum fuga non
          voluptate. Saepe eligendi labore nam voluptatibus. Deserunt maiores
          ipsa alias minima dolores delectus laborum, veritatis sequi. Alias,
          veritatis quaerat mollitia architecto eius velit pariatur, est
          temporibus commodi inventore non aspernatur consequuntur sit eaque
          iure amet! Aspernatur soluta, consequuntur nemo, fugiat sed dolorum
          maiores similique, rerum dolorem animi commodi eos? Maxime, quam culpa
          aperiam nobis aspernatur velit repellendus ex a eligendi reiciendis
          sit amet incidunt voluptate magni repellat ut aliquid exercitationem
          hic! Fuga, nemo perspiciatis quas explicabo magni tenetur quisquam aut
          vero minima enim modi sequi officia. Minima aperiam odio molestias vel
          est minus porro, molestiae officiis eum. Aliquid aspernatur maxime
          numquam adipisci necessitatibus, placeat ab ipsum consequatur tenetur
          iste porro dolor officiis voluptatum quae corrupti obcaecati
          consequuntur doloribus nihil excepturi sunt? Doloribus dignissimos,
          cupiditate quo explicabo quis maiores dolores ad non nihil beatae eius
          fuga debitis vel commodi aspernatur, sed architecto illum placeat
          molestiae velit? Totam magnam minima eos tenetur facere eligendi earum
          eaque aliquid dicta quam ipsum eius, consequuntur architecto expedita
          mollitia doloremque. Obcaecati molestiae iste ipsam earum officia
          inventore consectetur quaerat. Veniam minus quasi, veritatis alias
          adipisci impedit, odit error saepe natus quos enim nulla nesciunt
          totam, itaque vel! Nobis atque eligendi voluptate architecto non,
          delectus laboriosam ipsum voluptatem dolores, praesentium, molestiae
          reprehenderit recusandae? Eveniet repellendus nihil dolores pariatur
          aliquid, velit dolore in rerum nulla odit soluta tenetur, repellat,
          odio sequi quis ullam nam maiores veritatis! Nobis fugit culpa ut
          neque officia et ratione.
        </p>
      </div>
    </div>
  );
}
