import React from 'react';
import logo from '../../assets/logo/logo.svg';

export function AboutSection() {
  return (
    <section id="o-nas" className="relative -mt-24 bg-gradient-to-b from-transparent to-white">
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        <img
          src={logo}
          alt=""
          className="absolute top-8 -left-16 w-[200px] h-[200px] md:top-6 md:-left-24 md:w-[300px] md:h-[300px] lg:top-4 lg:-left-32 lg:w-[400px] lg:h-[400px] opacity-[0.07] -rotate-[15deg] text-beige-200"
        />
      </div>
      <div className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-800 mb-4">Kim jesteśmy</h2>
            <div className="w-24 h-1 bg-beige-400 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="prose">
              <p className="text-gray-600 mb-6 font-light text-base lg:text-lg">
                Stowarzyszenie dla kobiet „Wytchnienie" powstało w grudniu 2023 roku, z potrzeby niesienia wsparcia tym,
                którzy go potrzebują. Tworzymy przestrzeń, w której każdy może znaleźć wytchnienie od codziennych trosk i
                siłę do działania.
              </p>
              <p className="text-gray-600 mb-6 font-light text-base lg:text-lg">
                Jesteśmy grupą kobiet o różnym doświadczeniu życiowym i zawodowym. Wśród nas są: prawniczka,
                logopeda, księgowa, specjalistka od marketingu, studentka oraz aktywna seniorka.
              </p>
              <p className="text-gray-600 mb-6 font-light text-base lg:text-lg">
                To co nas łączy, to umiejętność nawiązywania bliskich relacji z ludźmi, oparta na zaufaniu, szacunku,
                wzajemnym wspieraniu.
              </p>
              <p className="text-gray-600 mb-6 font-light text-base lg:text-lg">
                Jesteśmy gotowe do niesienia pomocy w rozwiązywaniu problemów z jakimi mierzą się kobiety, seniorzy i
                młodzież.
              </p>
              <p className="text-gray-600 mb-6 font-light text-base lg:text-lg">
                Nasze projekty powstają w wyniku wspólnych rozmów, burzy mózgów i wymiany wiedzy. Każda z nas wnosi
                coś wyjątkowego, a razem tworzymy spójne programy, które odpowiadają na realne potrzeby społeczności.
              </p>
              <p className="text-gray-600 font-light text-base lg:text-lg">
                Działamy, bo wiemy, jak ważne jest wsparcie. Bo każda historia może mieć nowy rozdział.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}