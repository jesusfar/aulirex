import { Fragment, useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Renderizador liviano de texto con soporte de KaTeX inline ($...$) y **negrita**.
// La integración completa de KaTeX (KaTeXBlock con aria-label) llega en la Fase 3;
// esto alcanza para que el contenido STEM del banco se vea correcto ya en la Fase 1.

interface MathTextProps {
  children: string;
  className?: string;
}

type Token =
  | { kind: 'text'; value: string }
  | { kind: 'bold'; value: string }
  | { kind: 'math'; value: string };

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  // Divide por $...$ (math) y **...** (bold), respetando el orden de aparición.
  const regex = /\$([^$]+)\$|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(input)) !== null) {
    if (m.index > last) {
      tokens.push({ kind: 'text', value: input.slice(last, m.index) });
    }
    if (m[1] !== undefined) {
      tokens.push({ kind: 'math', value: m[1] });
    } else if (m[2] !== undefined) {
      tokens.push({ kind: 'bold', value: m[2] });
    }
    last = regex.lastIndex;
  }
  if (last < input.length) {
    tokens.push({ kind: 'text', value: input.slice(last) });
  }
  return tokens;
}

export function MathText({ children, className }: MathTextProps) {
  const tokens = useMemo(() => tokenize(children), [children]);
  return (
    <span className={className}>
      {tokens.map((t, i) => {
        if (t.kind === 'math') {
          let html: string;
          try {
            html = katex.renderToString(t.value, { throwOnError: false });
          } catch {
            html = t.value;
          }
          return (
            <span
              key={i}
              aria-label={t.value}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        if (t.kind === 'bold') {
          return <strong key={i}>{t.value}</strong>;
        }
        return <Fragment key={i}>{t.value}</Fragment>;
      })}
    </span>
  );
}
