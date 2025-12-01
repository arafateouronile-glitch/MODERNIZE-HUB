import { motion } from 'framer-motion'
import { DemoCard } from '../portfolio/DemoCard'
import { demos } from '../../data/demos'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Reveal } from '../animations/Reveal'

export const Portfolio = () => {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="portfolio" ref={ref} className="py-32 bg-background relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="mb-20 flex flex-col items-center text-center gap-8 pb-12 border-b border-white/10">
            <span className="font-mono text-[#D9FF00] text-sm tracking-widest uppercase">
              Preuve par les Faits
            </span>
            <h2 className="font-display text-5xl md:text-8xl font-bold text-white uppercase leading-[0.9] max-w-4xl">
              +850K€ GÉNÉRÉS <br/>
              <span className="text-[#D9FF00]">POUR NOS CLIENTS</span>
            </h2>
            <p className="text-xl md:text-2xl text-text-muted max-w-3xl font-light">
              5 transformations. 5 succès. Des sites obsolètes devenus des machines à cash.
              <span className="block mt-2 text-white font-bold">Le prochain, c'est le vôtre.</span>
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {demos.map((demo, index) => (
            <DemoCard
              key={demo.id}
              demo={demo}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
