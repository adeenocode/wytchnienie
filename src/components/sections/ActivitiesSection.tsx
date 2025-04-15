interface ActivityProps {
  title: string;
  description: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

function Activity({ title, description, image, imageAlt, reverse = false }: ActivityProps) {
  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row items-stretch bg-white rounded-[2rem] overflow-hidden shadow-[0_-8px_15px_-3px_rgba(0,0,0,0.05),0_8px_15px_-3px_rgba(0,0,0,0.1)] relative z-10 transition-all duration-300 hover:shadow-2xl hover:translate-y-[-2px]">
        <div className={`w-full lg:w-3/5 order-2 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="p-8 lg:p-12">
            <h3 className="text-2xl font-medium text-gray-800 mb-6">{title}</h3>
            <ul className="space-y-6">
            {description.map((item, index) => (
              <li key={index} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-beige-400 mt-2.5 shrink-0" />
                <p className="text-gray-600 font-light text-base lg:text-lg">{item}</p>
              </li>
            ))}
            </ul>
          </div>
        </div>
        <div className={`w-full h-[300px] lg:h-auto lg:w-2/5 order-1 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative h-full">
            <img
              src={image}
              alt={imageAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-cream-100 rounded-[3rem] -rotate-3 z-0 transform transition-transform duration-300 group-hover:-rotate-4"></div>
    </div>
  );
}

function ActivityHeader() {
  return (
    <div className="relative mb-24">
      <div className="text-center relative z-10">
        <h2 className="text-4xl font-serif text-gray-800 mb-4">Jak działamy</h2>
        <div className="w-24 h-1 bg-beige-400 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto">
          Nasze działania skupiają się na czterech głównych obszarach, które pozwalają skutecznie wspierać rozwój osobisty i zawodowy
        </p>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-beige-100 rounded-full -z-10 blur-3xl opacity-50"></div>
    </div>
  );
}

function ActivityImage({ image, imageAlt }: { image: string; imageAlt: string }) {
  return (
    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl h-full">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      <img
        src={image}
        alt={imageAlt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function ActivitiesSection() {
  return (
    <section id="dzialania" className="py-20 bg-cream-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <ActivityHeader />
        <div className="max-w-6xl mx-auto space-y-24">
          <Activity
            title="Rozwój zawodowy i edukacja"
            description={[
              'Organizowanie szkoleń i warsztatów w zakresie rozwoju zawodowego i kompetencji miękkich',
              'Wsparcie w reorientacji zawodowej i podnoszeniu kwalifikacji',
              'Szkolenia z zakresu sprzedaży, marketingu i budowania marki osobistej',
              'Warsztaty z obsługi nowych technologii i cyberbezpieczeństwa'
            ]}
            image="/images/rozwojzawodowy.jpeg"
            imageAlt="Rozwój zawodowy i edukacja"
          />
          
          <Activity
            title="Zdrowie i aktywność"
            description={[
              'Organizowanie kampanii i prelekcji na temat profilaktyki zdrowotnej',
              'Wsparcie psychologiczne, organizowanie grup wsparcia i konsultacji indywidualnych',
              'Promowanie aktywnego stylu życia, organizowanie zajęć sportowych i rekreacyjnych',
              'Edukacja w zakresie zdrowia psychicznego i radzenia sobie ze stresem'
            ]}
            image="/images/zdrowieaktywnosc.jpeg"
            imageAlt="Zdrowie i aktywność"
            reverse
          />
          
          <Activity
            title="Pomoc specjalistyczna i doradztwo"
            description={[
              'Pomoc prawna dla osób w trudnej sytuacji życiowej',
              'Doradztwo w zakresie spraw urzędowych, rodzinnych i zawodowych',
              'Pomoc w prowadzeniu własnego biznesu',
              'Wsparcie dla osób opiekujących się bliskimi, w tym seniorami i osobami z niepełnosprawnościami',
              'Indywidualne konsultacje i pomoc w rozwiązywaniu problemów życiowych'
            ]}
            image="/images/pomocspecjalistyczna.jpeg"
            imageAlt="Pomoc specjalistyczna"
          />
          
          <Activity
            title="Integracja społeczna i międzypokoleniowa"
            description={[
              'Organizacja spotkań i wydarzeń sprzyjających budowaniu relacji społecznych',
              'Tworzenie Klubów Seniora oraz przestrzeni dla aktywności międzypokoleniowych',
              'Wspólne inicjatywy łączące młodzież, dorosłych i seniorów',
              'Projekty na rzecz przeciwdziałania wykluczeniu społecznemu'
            ]}
            image="/images/integracjaspoleczna.jpeg"
            imageAlt="Integracja społeczna"
            reverse
          />
        </div>
      </div>
    </section>
  );
}