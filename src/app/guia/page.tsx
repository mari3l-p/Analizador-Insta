import SectionHeader from "@/components/SectionHeader";
import Highlight from "./Highlight";
import { List, GearWide } from "react-bootstrap-icons";
import Link from "next/link";

import type { Metadata } from 'next'

// Only define the specific part of the title here
export const metadata: Metadata = {
  title: 'Guía de Uso',
}

 export default function Guia() {

    return (
      <>
         <div className="center-element">
            <SectionHeader
               title="Guía Rápida"
               subtitle="Descarga y Analiza tus Datos de Instagram"
            ></SectionHeader>

            <div className=" w-xs mx-auto text-justify">
               <h3 className="font-medium text-lg">Exportar tu información:</h3>
               <ol className="list-decimal w-2xs mx-auto steps">
                  <li>En la aplicación de Instagram ve a tu perfil.</li>
                  <li>Haz clic en <Highlight Icon={List} text="Más" /> en la parte superior derecha.</li>
                  <li>Haz clic en <Highlight text="Centro de cuentas" /> y, luego, en <Highlight text="Tu información y permisos" />.</li>
                  <li>Haz clic en <Highlight  text="Exportar tu información"/>.</li>
                  <li>Haz clic en <Highlight  text="Crear exportación"/>.</li>
                  <li>Selecciona el perfil del que quieres exportar información.</li>
                  <li>Haz clic en <Highlight  text="Siguiente"/>.</li>
                  <li>Selecciona <Highlight  text="Exportar al dispositivo"/>.</li>
                  <li>Desde aquí, puedes elegir la información específica que quieres exportar, seleccionar un intervalo de fechas <Highlight  text="(Desde un principio)"/>, el formato <Highlight  text="(JSON)"/>, el correo electrónico para notificaciones y la calidad del contenido multimedia.</li>
                  <li>Una vez que hayas personalizado la exportación, haz clic en <Highlight text="Iniciar exportación"/>.</li>
                  <li>Ingresa la contraseña de tu perfil y espera la notificacion cuando tu descarga esté lista.</li>
                  <li>Ingresa tu documento Zip en el <Link href="/" className="underline blue-text">Analizador de Datos</Link></li>
               </ol>
            </div>

            <div className="w-xs mb-20 text-justify">
               <hr className="my-8 gray-text"/>
               <p className="px-4 gray-text">Si quieres conocer más acerca de exportar tus datos visita el <a href="https://help.instagram.com/181231772500920?helpref=about_content&locale=es_LA" target="_blank" className="white-text underline hover:blue" rel="noopener noreferrer"> Servicio de Ayuda </a> de Instagram.</p>
            </div>
         </div>
      </>
    )
 }