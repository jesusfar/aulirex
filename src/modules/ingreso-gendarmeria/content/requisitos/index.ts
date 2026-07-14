// Datos informativos del examen de aptitud física, examen médico y proceso de
// selección para el ingreso a la Escuela de Gendarmería (según el temario oficial).
// No son preguntas: alimentan la página de referencia "Requisitos".

export interface AptitudRow {
  puntaje: number;
  barra: string; // flexiones de brazo en la barra
  abdominales: string;
  flexoext: string; // flexo-extensiones de brazos en el suelo
  carrera: string; // carrera 1500 m
}

// Escala masculina (temario oficial).
export const aptitudMasculino: AptitudRow[] = [
  { puntaje: 100, barra: '12', abdominales: '110', flexoext: '38', carrera: "5' 20\"" },
  { puntaje: 90, barra: '11', abdominales: '105', flexoext: '36', carrera: "5' 50\"" },
  { puntaje: 80, barra: '10', abdominales: '100', flexoext: '34', carrera: "6' 00\"" },
  { puntaje: 70, barra: '9', abdominales: '95', flexoext: '32', carrera: "6' 10\"" },
  { puntaje: 60, barra: '8', abdominales: '90', flexoext: '30', carrera: "6' 20\"" },
  { puntaje: 50, barra: '7', abdominales: '85', flexoext: '28', carrera: "6' 30\"" },
  { puntaje: 40, barra: '6', abdominales: '80', flexoext: '26', carrera: "6' 40\"" },
  { puntaje: 30, barra: '5', abdominales: '75', flexoext: '24', carrera: "6' 50\"" },
  { puntaje: 20, barra: '4', abdominales: '70', flexoext: '22', carrera: "7' 00\"" },
  { puntaje: 10, barra: '3', abdominales: '65', flexoext: '20', carrera: "7' 10\"" },
  { puntaje: 0, barra: '2 o (-)', abdominales: '60 o (-)', flexoext: '18 o (-)', carrera: "7' 20\" o (+)" },
];

// Escala femenina (temario oficial).
export const aptitudFemenino: AptitudRow[] = [
  { puntaje: 100, barra: '16', abdominales: '100', flexoext: '27', carrera: "7' 30\"" },
  { puntaje: 90, barra: '15', abdominales: '95', flexoext: '26', carrera: "7' 50\"" },
  { puntaje: 80, barra: '14', abdominales: '90', flexoext: '25', carrera: "8' 10\"" },
  { puntaje: 70, barra: '13', abdominales: '85', flexoext: '24', carrera: "8' 30\"" },
  { puntaje: 60, barra: '12', abdominales: '80', flexoext: '23', carrera: "8' 50\"" },
  { puntaje: 50, barra: '11', abdominales: '75', flexoext: '22', carrera: "9' 10\"" },
  { puntaje: 40, barra: '10', abdominales: '70', flexoext: '21', carrera: "9' 30\"" },
  { puntaje: 30, barra: '9', abdominales: '65', flexoext: '20', carrera: "9' 50\"" },
  { puntaje: 20, barra: '8', abdominales: '60', flexoext: '19', carrera: "10' 10\"" },
  { puntaje: 10, barra: '7', abdominales: '55', flexoext: '18', carrera: "10' 30\"" },
  { puntaje: 0, barra: '6 o (-)', abdominales: '50 o (-)', flexoext: '17 o (-)', carrera: "10' 31\" o (+)" },
];

export const pruebas = [
  { nombre: 'Flexiones de brazo en la barra', detalle: 'En barra fija alta, suspensión completa con toma dorsal; flexionar hasta tocar la barra con la barbilla y volver a la extensión completa.' },
  { nombre: 'Flexiones abdominales', detalle: 'Desde decúbito dorsal, pasar a posición sentado tocando las rodillas con la barbilla, en forma continua y sin detenciones.' },
  { nombre: 'Flexo-extensiones de brazos en el suelo', detalle: 'Desde decúbito ventral, extender los brazos manteniendo el cuerpo recto; el codo pasa de 180° a menos de 90° en cada repetición.' },
  { nombre: 'Carrera de 1500 m', detalle: 'Se cronometra el tiempo total; a menor tiempo, mayor puntaje.' },
  { nombre: 'Natación', detalle: 'Nadar 25 m en cualquier estilo, sin tomarse del borde ni apoyar los pies: con técnica 100 puntos, sin técnica 50 puntos, no nadó 0 puntos.' },
];

export const aprobacion = {
  apto: 'APTO: promedio de 50 puntos o más.',
  noApto: 'NO APTO: promedio de 49 puntos o menos.',
};

export const examenMedico = [
  'Al presentarse a rendir el examen de ingreso, el aspirante debe llevar la documentación sanitaria en sobre cerrado (Anexos 4 y 5).',
  'Debe concurrir previamente a un Centro de Salud público o privado para cumplir los estudios exigidos. La falta de cualquier estudio condiciona la continuidad de los exámenes de admisión.',
  'Si en el reconocimiento resulta NO APTO en una o más exigencias, se produce la caducidad del trámite de inscripción.',
  'La calificación de APTO en el reconocimiento previo no asegura el ingreso: la aptitud definitiva la otorga el "Examen Médico Definitivo" del Centro Único de Reclutamiento.',
];

export const seleccion = [
  'Los resultados de los exámenes de admisión otorgan un orden de mérito que se considera para el ingreso a la Escuela de Gendarmería.',
  'La cantidad de convocados depende de las vacantes que para cada año fija la Dirección de Recursos Humanos de la Fuerza.',
  'Si el aspirante resulta seleccionado, se le envía una carta de citación con fecha, hora y datos para su incorporación.',
  'Si no resulta seleccionado, se le notifica el motivo; su legajo queda en archivo por 90 días por si desea postularse nuevamente al año siguiente.',
];
