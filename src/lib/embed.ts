// La app corre "embebida en el CRT" cuando el módulo se muestra dentro del
// iframe del selector VHS. En ese caso, el botón de volver a Inicio no navega a
// "/" (eso cargaría el selector dentro del CRT) sino que le pide al selector que
// eyecte la cinta (postMessage al parent).

export function isInCrt(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    // Cross-origin al acceder a window.top → estamos embebidos.
    return true;
  }
}

export function ejectFromCrt(): void {
  try {
    window.parent?.postMessage({ type: 'aulirex:eject' }, '*');
  } catch {
    /* noop */
  }
}
