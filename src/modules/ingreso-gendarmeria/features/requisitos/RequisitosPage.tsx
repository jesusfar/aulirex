import {
  aptitudMasculino,
  aptitudFemenino,
  pruebas,
  aprobacion,
  examenMedico,
  seleccion,
  type AptitudRow,
} from '../../content/requisitos';

function AptitudTable({ title, rows }: { title: string; rows: AptitudRow[] }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/24 p-4 backdrop-blur-xl">
      <h3 className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-emerald-200">
        {title}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <thead>
            <tr className="text-left text-[0.7rem] font-bold uppercase tracking-wide text-slate-500">
              <th className="px-2 py-2">Puntaje</th>
              <th className="px-2 py-2">Barra</th>
              <th className="px-2 py-2">Abdominales</th>
              <th className="px-2 py-2">Flexo-ext.</th>
              <th className="px-2 py-2">1500 m</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.puntaje}
                className="border-t border-white/5 text-slate-200"
              >
                <td className="px-2 py-1.5 font-black text-emerald-300">{r.puntaje}</td>
                <td className="px-2 py-1.5">{r.barra}</td>
                <td className="px-2 py-1.5">{r.abdominales}</td>
                <td className="px-2 py-1.5">{r.flexoext}</td>
                <td className="px-2 py-1.5">{r.carrera}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function RequisitosPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="rounded-lg border border-white/10 bg-slate-900/68 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl">
        <div className="mb-3 inline-flex rounded-md border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">
          Requisitos de ingreso
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Aptitud física, examen médico y selección
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Además del examen intelectual, el ingreso incluye pruebas de aptitud
          física, un examen médico y un proceso de selección por orden de mérito.
          Los datos siguientes provienen del temario oficial y son informativos.
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <AptitudTable title="Escala masculina" rows={aptitudMasculino} />
        <AptitudTable title="Escala femenina" rows={aptitudFemenino} />
      </div>

      <section className="grid gap-3 rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm sm:grid-cols-2">
        <p className="font-bold text-emerald-200">{aprobacion.apto}</p>
        <p className="font-bold text-slate-300">{aprobacion.noApto}</p>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/24 p-5 backdrop-blur-xl">
        <h2 className="mb-3 text-lg font-black text-emerald-200">Las pruebas</h2>
        <ul className="space-y-3 text-sm leading-6 text-slate-300">
          {pruebas.map((p) => (
            <li key={p.nombre}>
              <span className="font-bold text-white">{p.nombre}. </span>
              {p.detalle}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/24 p-5 backdrop-blur-xl">
        <h2 className="mb-3 text-lg font-black text-emerald-200">Examen médico</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
          {examenMedico.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/24 p-5 backdrop-blur-xl">
        <h2 className="mb-3 text-lg font-black text-emerald-200">
          Selección para la incorporación
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
          {seleccion.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
