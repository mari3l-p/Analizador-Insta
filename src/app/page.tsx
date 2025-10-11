
import "./globals.css";

import SectionHeader from "@/components/SectionHeader";
import InstaAnalyzer from "@/components/InstaAnalyzer";


export default function HomePage() {



  return (
    <div className="center-element">

      <SectionHeader 
          title="Análisis de Seguidores de Instagram" 
          subtitle="Usa el analizador de seguidores de instagram y obtén resultados sin exponer tu privacidad.">
      </SectionHeader>

      <InstaAnalyzer></InstaAnalyzer>

    </div>
  );
}