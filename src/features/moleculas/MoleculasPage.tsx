import { useMemo, useState } from 'react';
import moleculesData from '../../content/molecules/molecules.json';
import { MoleculeViewer } from '../../components/MoleculeViewer';

interface Molecule {
  id: string;
  name: string;
  formula: string;
  category: string;
  note: string;
  mol: string;
}
const molecules = moleculesData as Molecule[];

const CATS: [string, string][] = [
  ['', 'Todas'],
  ['inorganica', 'Inorg\u00e1nicas'],
  ['hidrocarburo', 'Hidrocarburos'],
  ['grupo_funcional', 'Grupos funcionales'],
  ['biologica', 'Biol\u00f3gicas'],
];

const CPK: [string, string, string][] = [
  ['#3f3f3f', 'C', 'Carbono'],
  ['#ffffff', 'H', 'Hidr\u00f3geno'],
  ['#ff0d0d', 'O', 'Ox\u00edgeno'],
  ['#3050f8', 'N', 'Nitr\u00f3geno'],
];

const CATEGORY_LABELS = Object.fromEntries(CATS) as Record<string, string>;

const MOLECULE_INFO: Record<string, { structure: string; importance: string; focus: string }> = {
  agua: {
    structure: 'Angular y polar; el ox\u00edgeno concentra densidad electr\u00f3nica.',
    importance: 'Disolvente biol\u00f3gico clave y referencia para puentes de hidr\u00f3geno.',
    focus: 'Polaridad, geometr\u00eda angular y enlaces O-H.',
  },
  co2: {
    structure: 'Lineal y globalmente apolar aunque cada enlace C=O sea polar.',
    importance: 'Producto de combusti\u00f3n y respiraci\u00f3n; participa en equilibrio \u00e1cido-base.',
    focus: 'Doble enlace, linealidad y cancelaci\u00f3n de dipolos.',
  },
  amoniaco: {
    structure: 'Piramidal trigonal; el nitr\u00f3geno conserva un par libre.',
    importance: 'Base d\u00e9bil y punto de partida para estudiar aminas.',
    focus: 'Par libre, basicidad y geometr\u00eda piramidal.',
  },
  oxigeno: {
    structure: 'Diat\u00f3mica con doble enlace O=O.',
    importance: 'Reactivo esencial en oxidaciones, combusti\u00f3n y respiraci\u00f3n celular.',
    focus: 'Mol\u00e9cula elemental, enlace doble y reacciones redox.',
  },
  metano: {
    structure: 'Tetra\u00e9drica con carbono sp3.',
    importance: 'Alcano m\u00e1s simple; modelo para enlaces C-H saturados.',
    focus: 'Hibridaci\u00f3n sp3, \u00e1ngulo cercano a 109,5 grados y baja polaridad.',
  },
  etano: {
    structure: 'Dos carbonos sp3 unidos por enlace simple C-C.',
    importance: 'Ejemplo b\u00e1sico de alcano y rotaci\u00f3n alrededor de enlace sigma.',
    focus: 'Cadena saturada, enlace simple y f\u00f3rmula general de alcanos.',
  },
  eteno: {
    structure: 'Plana alrededor del doble enlace; carbonos sp2.',
    importance: 'Alqueno de referencia para adici\u00f3n y polimerizaci\u00f3n.',
    focus: 'Doble enlace, insaturaci\u00f3n y geometr\u00eda trigonal plana.',
  },
  etino: {
    structure: 'Lineal por triple enlace; carbonos sp.',
    importance: '\u00datil para comparar enlaces simple, doble y triple.',
    focus: 'Triple enlace, linealidad y alta insaturaci\u00f3n.',
  },
  propano: {
    structure: 'Cadena saturada de tres carbonos.',
    importance: 'Alcano combustible; ayuda a reconocer series hom\u00f3logas.',
    focus: 'Cadena carbonada, enlaces sigma y saturaci\u00f3n.',
  },
  benceno: {
    structure: 'Anillo arom\u00e1tico plano con enlaces deslocalizados.',
    importance: 'Base conceptual de aromaticidad y resonancia.',
    focus: 'Anillo, resonancia y estabilidad arom\u00e1tica.',
  },
  etanol: {
    structure: 'Alcohol primario con grupo hidroxilo -OH.',
    importance: 'Compuesto org\u00e1nico polar; forma puentes de hidr\u00f3geno.',
    focus: 'Grupo funcional alcohol, polaridad y solubilidad.',
  },
  acido_acetico: {
    structure: '\u00c1cido carbox\u00edlico con grupo -COOH.',
    importance: 'Componente \u00e1cido del vinagre; ejemplo cl\u00e1sico de \u00e1cido org\u00e1nico d\u00e9bil.',
    focus: 'Carboxilo, acidez y enlace C=O.',
  },
  acetona: {
    structure: 'Cetona con carbonilo interno.',
    importance: 'Solvente polar apr\u00f3tico; diferencia aldeh\u00eddos de cetonas.',
    focus: 'Grupo carbonilo, cetona y polaridad.',
  },
  acetaldehido: {
    structure: 'Aldeh\u00eddo con carbonilo terminal -CHO.',
    importance: 'Intermedio metab\u00f3lico y ejemplo para oxidaci\u00f3n de aldeh\u00eddos.',
    focus: 'Carbonilo terminal, reactividad y oxidaci\u00f3n.',
  },
  metilamina: {
    structure: 'Amina primaria con nitr\u00f3geno y par libre.',
    importance: 'Modelo simple para basicidad de aminas org\u00e1nicas.',
    focus: 'Grupo amino, basicidad y enlace C-N.',
  },
  glucosa: {
    structure: 'Hexosa con varios grupos -OH y un anillo oxigenado.',
    importance: 'Monosac\u00e1rido central en metabolismo energ\u00e9tico.',
    focus: 'Carbohidratos, grupos hidroxilo y f\u00f3rmula C6H12O6.',
  },
};

const SUB = ['\u2080', '\u2081', '\u2082', '\u2083', '\u2084', '\u2085', '\u2086', '\u2087', '\u2088', '\u2089'];
const prettyFormula = (f: string) => f.replace(/\d/g, (d) => SUB[+d]);

const selectClass =
  'h-11 w-full rounded-md border border-sky-300/20 bg-slate-950/80 px-3 text-sm font-semibold text-white outline-none transition focus:border-sky-300/70 focus:ring-2 focus:ring-sky-400/20';

function getMoleculesByCategory(category: string) {
  return category ? molecules.filter((m) => m.category === category) : molecules;
}

function readMolStats(molBlock: string) {
  const lines = molBlock.split('\n');
  const counts = lines[3]?.trim().split(/\s+/) ?? [];
  const atomCount = Number.parseInt(counts[0] ?? '0', 10);
  const bondCount = Number.parseInt(counts[1] ?? '0', 10);
  const elementCounts = new Map<string, number>();
  const bondOrderCounts = new Map<string, number>();

  for (let i = 4; i < 4 + atomCount; i += 1) {
    const element = lines[i]?.trim().split(/\s+/)[3];
    if (element) elementCounts.set(element, (elementCounts.get(element) ?? 0) + 1);
  }

  for (let i = 4 + atomCount; i < 4 + atomCount + bondCount; i += 1) {
    const order = lines[i]?.trim().split(/\s+/)[2];
    if (order) bondOrderCounts.set(order, (bondOrderCounts.get(order) ?? 0) + 1);
  }

  const elementSummary = [...elementCounts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([element, count]) => element + ': ' + count)
    .join(' - ');

  const bondSummary = [
    ['1', 'simples'],
    ['2', 'dobles'],
    ['3', 'triples'],
  ]
    .map(([order, label]) => {
      const count = bondOrderCounts.get(order);
      return count ? count + ' ' + label : '';
    })
    .filter(Boolean)
    .join(' - ');

  return {
    atomCount,
    bondCount,
    elementSummary,
    bondSummary: bondSummary || 'Sin enlaces',
  };
}

export function MoleculasPage() {
  const [cat, setCat] = useState('');
  const [style, setStyle] = useState<'stick' | 'sphere'>('stick');
  const list = useMemo(
    () => (cat ? molecules.filter((m) => m.category === cat) : molecules),
    [cat],
  );
  const categoryCounts = useMemo(
    () =>
      CATS.map(([value, label]) => ({
        value,
        label,
        count: getMoleculesByCategory(value).length,
      })),
    [],
  );
  const [selectedId, setSelectedId] = useState(molecules[0]?.id);
  const selected = list.find((m) => m.id === selectedId) ?? list[0];
  const stats = selected ? readMolStats(selected.mol) : null;
  const info = selected ? MOLECULE_INFO[selected.id] : null;

  const handleCategoryChange = (nextCategory: string) => {
    const nextList = getMoleculesByCategory(nextCategory);
    setCat(nextCategory);
    setSelectedId(nextList[0]?.id ?? '');
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4">
        <h2 className="text-2xl font-black text-white">Mol&eacute;culas 3D</h2>
        <p className="mt-1 text-sm text-slate-400">
          Gir&aacute; con el mouse, hac&eacute; zoom con la rueda. Colores por elemento (CPK).
        </p>
      </div>

      <div className="mb-4 grid gap-3 rounded-lg border border-white/10 bg-slate-950/50 p-3 sm:grid-cols-[0.9fr_1.4fr]">
        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-400">
            Categor&iacute;a
          </span>
          <select
            value={cat}
            onChange={(event) => handleCategoryChange(event.target.value)}
            className={selectClass}
            aria-label="Filtrar moleculas por categoria"
          >
            {categoryCounts.map(({ value, label, count }) => (
              <option key={value || 'all'} value={value}>
                {label} ({count})
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-400">
            Mol&eacute;cula
          </span>
          <select
            value={selected?.id ?? ''}
            onChange={(event) => setSelectedId(event.target.value)}
            className={selectClass}
            aria-label="Seleccionar molecula"
          >
            {list.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} - {m.formula}
              </option>
            ))}
          </select>
        </label>
      </div>

      {selected && (
        <div className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-lg font-black text-white">
                {selected.name}{' '}
                <span className="font-mono text-sky-300">{prettyFormula(selected.formula)}</span>
              </p>
              <p className="text-sm text-slate-400">{selected.note}</p>
            </div>
            <label className="min-w-36">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-400">
                Vista
              </span>
              <select
                value={style}
                onChange={(event) => setStyle(event.target.value as 'stick' | 'sphere')}
                className={selectClass}
                aria-label="Cambiar tipo de visualizacion 3D"
              >
                <option value="stick">Varillas</option>
                <option value="sphere">Esferas</option>
              </select>
            </label>
          </div>

          <MoleculeViewer molBlock={selected.mol} style={style} />

          {stats && info && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    F&oacute;rmula y familia
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    <span className="font-mono text-sky-300">
                      {prettyFormula(selected.formula)}
                    </span>{' '}
                    - {CATEGORY_LABELS[selected.category] ?? selected.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    &Aacute;tomos y enlaces
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {stats.atomCount} &aacute;tomos - {stats.bondCount} enlaces
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">{stats.bondSummary}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Elementos
                  </p>
                  <p className="mt-1 text-sm text-slate-200">{stats.elementSummary}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Punto clave
                  </p>
                  <p className="mt-1 text-sm text-slate-200">{info.focus}</p>
                </div>
              </div>

              <div className="mt-4 border-l-2 border-sky-300/50 pl-3">
                <p className="text-sm font-semibold text-white">{info.structure}</p>
                <p className="mt-1 text-sm text-slate-400">{info.importance}</p>
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-3">
            {CPK.map(([color, el, name]) => (
              <span
                key={el}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-slate-950/45 px-2 py-1 text-xs text-slate-300"
              >
                <span
                  className="inline-block size-3 rounded-full border border-white/30"
                  style={{ background: color }}
                />
                <span>{name}</span>
                <span className="font-mono text-slate-500">({el})</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
