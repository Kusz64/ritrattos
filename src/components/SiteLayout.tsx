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
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="font-serif text-xl tracking-wide text-foreground">
            Estudio Kusz<span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            {enlaces.map((e) => (
              <Link
                key={e.to}
                to={e.to}
                className="text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: e.to === "/" }}
              >
                {e.label}
              </Link>
            ))}
            <Link
              to="/encargar"
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90"
            >
              Encargar un Retrato
            </Link>
          </nav>

          <button
            type="button"
            aria-label="Abrir menú"
            className="md:hidden"
            onClick={() => setAbierto((v) => !v)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {abierto && (
          <nav className="flex flex-col gap-1 border-t border-border px-5 pb-4 text-sm md:hidden">
            {enlaces.map((e) => (
              <Link
                key={e.to}
                to={e.to}
                onClick={() => setAbierto(false)}
                className="py-2 text-muted-foreground"
                activeProps={{ className: "py-2 text-foreground" }}
                activeOptions={{ exact: e.to === "/" }}
              >
                {e.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-20 border-t border-border bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 text-sm sm:grid-cols-3">
          <div>
            <p className="font-serif text-lg">Estudio Kusz</p>
            <p className="mt-2 text-muted-foreground">
              Retratos al óleo personalizados de personas y mascotas, pinturas digitales,
              certificados y diplomas.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Navegación</p>
            {enlaces.map((e) => (
              <Link key={e.to} to={e.to} className="block text-muted-foreground hover:text-foreground">
                {e.label}
              </Link>
            ))}
            <Link to="/legal" className="block text-muted-foreground hover:text-foreground">
              Términos y Privacidad
            </Link>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p className="font-medium text-foreground">Contacto</p>
            <p>Pedidos y consultas por el formulario de encargo.</p>
            <p>Envíos a todo el país.</p>
          </div>
        </div>
        <div className="border-t border-border px-5 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Estudio Kusz. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
