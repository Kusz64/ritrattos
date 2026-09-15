import perroFoto from "@/assets/perro-foto.jpg";
import perroOleo from "@/assets/perro-oleo.jpg";
import personaFoto from "@/assets/persona-foto.jpg";
import personaOleo from "@/assets/persona-oleo.jpg";
import gatoOleo from "@/assets/gato-oleo.jpg";
import familiaOleo from "@/assets/familia-oleo.jpg";
import digitalNino from "@/assets/digital-nino.jpg";
import certificado from "@/assets/certificado.jpg";

export type Categoria = "mascotas" | "personas" | "digital" | "certificados";

export type Pieza = {
  id: string;
  titulo: string;
  categoria: Categoria;
  tecnica: string;
  imagen: string;
  alt: string;
  antes?: { imagen: string; alt: string };
};

export const categorias: { valor: "todos" | Categoria; etiqueta: string }[] = [
  { valor: "todos", etiqueta: "Todos" },
  { valor: "mascotas", etiqueta: "Mascotas" },
  { valor: "personas", etiqueta: "Personas" },
  { valor: "digital", etiqueta: "Digital" },
  { valor: "certificados", etiqueta: "Certificados y Diplomas" },
];

export const piezas: Pieza[] = [
  {
    id: "golden",
    titulo: "Nala, golden retriever",
    categoria: "mascotas",
    tecnica: "Óleo sobre lienzo, 40 × 40 cm",
    imagen: perroOleo,
    alt: "Retrato al óleo personalizado de perro golden retriever sobre fondo cálido",
    antes: {
      imagen: perroFoto,
      alt: "Fotografía original de un perro golden retriever sentado, enviada por el cliente",
    },
  },
  {
    id: "retrato-mujer",
    titulo: "Camila",
    categoria: "personas",
    tecnica: "Óleo sobre lienzo, 50 × 50 cm",
    imagen: personaOleo,
    alt: "Retrato al óleo personalizado de una mujer joven con luz cálida",
    antes: {
      imagen: personaFoto,
      alt: "Fotografía original de una mujer joven sonriendo, enviada por el cliente",
    },
  },
  {
    id: "gato",
    titulo: "Simón, gato atigrado",
    categoria: "mascotas",
    tecnica: "Óleo sobre lienzo, 30 × 30 cm",
    imagen: gatoOleo,
    alt: "Retrato de mascota a pedido: gato atigrado naranja pintado al óleo",
  },
  {
    id: "familia",
    titulo: "Familia Herrera",
    categoria: "personas",
    tecnica: "Óleo sobre lienzo, 70 × 70 cm",
    imagen: familiaOleo,
    alt: "Retrato familiar al óleo de una pareja con dos niños en tonos tierra",
  },
  {
    id: "digital",
    titulo: "Emilia",
    categoria: "digital",
    tecnica: "Pintura digital, archivo para imprimir",
    imagen: digitalNino,
    alt: "Retrato digital personalizado de una niña sonriendo sobre fondo crema",
  },
  {
    id: "certificado",
    titulo: "Diploma conmemorativo",
    categoria: "certificados",
    tecnica: "Caligrafía y dorado a mano sobre papel de algodón",
    imagen: certificado,
    alt: "Certificado personalizado con borde dorado caligrafiado a mano y sello de lacre",
  },
];

export const testimonios = [
  {
    nombre: "Valentina R.",
    texto:
      "Encargué el retrato de mi perra Nala y lloré al abrirlo. El parecido es impresionante y la atención fue cercana en todo momento.",
    imagen: perroOleo,
    alt: "Retrato al óleo de perro golden retriever recibido por una clienta",
  },
  {
    nombre: "Matías P.",
    texto:
      "Un regalo para mi madre. Mandé una foto de celular y volvió convertida en una obra que hoy preside el living de la casa.",
    imagen: personaOleo,
    alt: "Retrato al óleo de una mujer joven regalado a la familia",
  },
  {
    nombre: "Familia Herrera",
    texto:
      "El boceto llegó en tres días y pudimos pedir ajustes sin problema. El resultado final superó lo que esperábamos.",
    imagen: familiaOleo,
    alt: "Retrato familiar al óleo encargado por la familia Herrera",
  },
];
