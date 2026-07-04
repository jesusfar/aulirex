import type { Item } from '../types/content';
import biologia from './items/biologia/banco-biologia.json';
import fisica from './items/fisica/banco-fisica.json';
import quimica from './items/quimica/banco-quimica.json';

// Banco importado de los prengunteros (autoría del usuario). Los JSON se generan
// con scripts/import/*.mjs a partir del texto de los PDFs. El cast evita el
// ensanchamiento de tipos literales al leer JSON (source/track/type como string).
export const importedItems = [
  ...biologia,
  ...fisica,
  ...quimica,
] as unknown as Item[];
