import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";

const enlaces = [
  { to: "/", label: "Inicio" },
  { to: "/portafolio", label: "Portafolio" },
  { to: "/proceso", label: "Proceso" },
  { to: "/encargar", label: "Encargar" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-[#DDD5C7] bg-[#F3ECE4]/95 backdrop-blur-md shadow-[0_2px_4px_rgba(0,0,0,0.03)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link
            to="/"
            className="flex items-baseline gap-2 transition-colors hover:text-stone-700"
          >
            <span className="font-serif text-3xl md:text-[2.15rem] font-bold tracking-wide text-stone-950">
              Ritrattos
            </span>
            <span className="hidden sm:inline font-serif text-[0.7rem] italic tracking-wider text-[#B8A080]">
              desde 1944
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            {enlaces.map((e) => (
              <Link
                key={e.to}
                to={e.to}
                className="font-medium text-stone-600 transition-colors hover:text-stone-950"
                activeProps={{ className: "text-stone-950 font-semibold" }}
                activeOptions={{ exact: e.to === "/" }}
              >
                {e.label}
              </Link>
            ))}
            <Link
              to="/encargar"
              className="rounded-md bg-stone-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-stone-800 hover:shadow"
            >
              Encargar un Retrato
            </Link>
          </nav>

          <button
            type="button"
            aria-label="Abrir menú"
            className="rounded-md p-1.5 text-stone-900 hover:bg-[#EAE1D7] md:hidden"
            onClick={() => setAbierto((v) => !v)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {abierto && (
          <nav className="flex flex-col gap-1 border-t border-[#DDD5C7] bg-[#F3ECE4] px-5 py-4 text-sm md:hidden">
            {enlaces.map((e) => (
              <Link
                key={e.to}
                to={e.to}
                onClick={() => setAbierto(false)}
                className="py-2 text-stone-600"
                activeProps={{ className: "py-2 text-stone-950 font-semibold" }}
                activeOptions={{ exact: e.to === "/" }}
              >
                {e.label}
              </Link>
            ))}
            <Link
              to="/encargar"
              onClick={() => setAbierto(false)}
              className="mt-2 rounded-md bg-stone-900 py-2.5 text-center font-medium text-white"
            >
              Encargar un Retrato
            </Link>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-24 border-t border-stone-800 bg-stone-950 text-stone-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 text-sm sm:grid-cols-3">
          <div>
            <p className="font-serif text-3xl font-bold tracking-wide text-white">
              Ritrattos
            </p>
            <p className="mt-3 leading-relaxed text-stone-400">
              Retratos al óleo personalizados de personas y mascotas, pinturas digitales,
              certificados y diplomas hechos a mano con dedicación artística.
            </p>
          </div>
          <div className="space-y-2.5">
            <p className="font-medium tracking-wide text-white uppercase text-xs">Navegación</p>
            {enlaces.map((e) => (
              <Link
                key={e.to}
                to={e.to}
                className="block text-stone-400 transition-colors hover:text-white"
              >
                {e.label}
              </Link>
            ))}
            <Link to="/legal" className="block text-stone-400 transition-colors hover:text-white">
              Términos y Privacidad
            </Link>
          </div>
          <div className="space-y-2.5 text-stone-400">
            <p className="font-medium tracking-wide text-white uppercase text-xs">Atención & Envíos</p>
            <p className="leading-relaxed">
              Consultas y pedidos mediante nuestro formulario de encargo con atención personalizada.
            </p>
            <a
              href="https://wa.me/56966885084?text=Hola%20Ritrattos,%20quiero%20hacer%20una%20consulta%20sobre%20un%20retrato%20personalizado"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-stone-200 hover:text-emerald-400 transition-colors font-medium text-sm"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#25D366]" />
              WhatsApp: +56 9 6688 5084
            </a>
            <p className="text-stone-300 font-medium text-xs">Envíos a todo Chile con embalaje de protección especial.</p>
          </div>
        </div>
        <div className="border-t border-stone-900 px-5 py-5 text-center text-xs text-stone-400">
          © {new Date().getFullYear()} Ritrattos. Todos los derechos reservados.
        </div>
      </footer>

      {/* Botón Flotante de WhatsApp para consultas directas */}
      <a
        href="https://wa.me/56966885084?text=Hola%20Ritrattos,%20quiero%20hacer%20una%20consulta%20sobre%20un%20retrato%20personalizado"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hablar por WhatsApp con Ritrattos"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-all hover:scale-105 hover:bg-[#20bd5a] hover:shadow-xl"
      >
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">Hablar por WhatsApp</span>
      </a>
    </div>
  );
}
