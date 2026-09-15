import { useRef, useState } from "react";

type Props = {
  antes: { imagen: string; alt: string };
  despues: { imagen: string; alt: string };
};

export function AntesDespues({ antes, despues }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const mover = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  };

  return (
    <div className="space-y-3">
      <div
        ref={ref}
        className="relative aspect-square w-full select-none overflow-hidden rounded-lg border border-border"
        onPointerMove={(e) => {
          if (e.buttons === 1) mover(e.clientX);
        }}
        onPointerDown={(e) => mover(e.clientX)}
      >
        <img
          src={antes.imagen}
          alt={antes.alt}
          loading="lazy"
          width={912}
          height={912}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <img
            src={despues.imagen}
            alt={despues.alt}
            loading="lazy"
            width={912}
            height={912}
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-accent"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground shadow">
            ↔
          </span>
        </div>
      </div>
      <label className="block text-xs text-muted-foreground">
        <span className="mb-1 block">Desliza para comparar foto y retrato terminado</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          aria-label="Comparar foto original y retrato terminado"
          onChange={(e) => setPos(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
      </label>
    </div>
  );
}
