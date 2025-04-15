import React from 'react';
import { Users, Target, Heart, HandHeart, Brain, Flower2 } from 'lucide-react';
import { GoalCard } from '../cards/GoalCard';

export function GoalsSection() {
  return (
    <section id="cele" className="py-20 bg-cream-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-gray-800 mb-4">Nasze cele</h2>
          <div className="w-24 h-1 bg-beige-400 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <GoalCard
            icon={<HandHeart className="w-8 h-8 text-beige-400" />}
            title="Wsparcie"
            description="Udzielanie pomocy osobom w trudnej sytuacji życiowej zwiększającej ich komfort i poczucie bezpieczeństwa"
          />
          <GoalCard
            icon={<Users className="w-8 h-8 text-beige-400" />}
            title="Integracja"
            description="Stworzenie nowych relacji międzyludzkich wzmacniających poczucie przynależności do społeczeństwa"
          />
          <GoalCard
            icon={<Target className="w-8 h-8 text-beige-400" />}
            title="Aktywizacja"
            description="Wspieranie rozwoju zawodowego w celu zmiany reorientacji zawodowej i pozycji na rynku pracy"
          />
          <GoalCard
            icon={<Heart className="w-8 h-8 text-beige-400" />}
            title="Zdrowie"
            description="Wzrost świadomości zdrowia fizycznego i psychicznego poprzez udział w kampaniach na rzecz profilaktyki zdrowia"
          />
          <GoalCard
            icon={<Brain className="w-8 h-8 text-beige-400" />}
            title="Edukacja"
            description="Poszerzanie wiedzy i rozwijanie umiejętności ułatwiających codzienne funkcjonowanie w świecie"
          />
          <GoalCard
            icon={<Flower2 className="w-8 h-8 text-beige-400" />}
            title="Rozwój"
            description="Inspirowanie do rozwoju i pomoc w zdobywaniu narzędzi potrzebnych do realizacji własnych projektów"
          />
        </div>
      </div>
    </section>
  );
}