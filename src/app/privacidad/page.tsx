import SectionHeader from "@/components/SectionHeader";

import type { Metadata } from 'next'

// Only define the specific part of the title here
export const metadata: Metadata = {
  title: 'Privacidad',
}

export default function Privacidad() {
return (
    <>
        <SectionHeader 
            title="Política de Privacidad" 
            subtitle="Tu privacidad es nuestra máxima prioridad.">
        </SectionHeader>

        <div className="center-element text-justify">
            <div>
                <h3 className="font-medium text-lg text-center">¿Cómo Funciona?</h3>
                <ol className="w-2xs mx-auto list-decimal marker:text-white steps">
                    <li className="gray-text"><span className="white-text">Todo es Local:</span> El análisis de tu archivo ZIP ocurre directamente en tu navegador lo que se conoce como procesamiento del lado del cliente.</li>
                    <li className="gray-text"><span className="white-text">No hay Servidores Involucrados:</span> Cuando subes tu archivo, nuestro código lo lee y lo procesa localmente en tu equipo. No se envía a ningún servidor en internet.</li>
                    <li className="gray-text"><span className="white-text">La Información se Desvanece:</span> Los resultados se generan y se te muestran a ti, y a nadie más. Una vez que cierras la pestaña del navegador, toda la información y los resultados se eliminan por completo.</li>
                </ol>
            </div>

            <div>
                <h3 className="mt-16 font-medium text-lg text-center">Lo que <span className="red-text">NO</span> Hacemos con tus Datos</h3>
                <ul className="w-2xs px-10 list-disc steps font-light">
                    <li>No vemos tu información</li>
                    <li>No almacenamos tus datos</li>
                    <li>No vendemos ni compartimos tus datos</li>
                    <li>No te rastreamos</li>
                </ul>
            </div>
            <p className="w-2xs gray-text my-20">Esta herramienta funciona como una <span className="blue-text">&quot;caja de arena&quot;</span> segura que se ejecuta en tu propio navegador. Eres la única persona que interactúa con tus datos de principio a fin. Tu privacidad no es solo una promesa, es el resultado del diseño de la aplicación.</p>
        </div>
    </>
)
}