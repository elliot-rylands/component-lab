import { useEffect, useState } from 'react';
import Button, { HIERARCHIES } from './components/Button';
import './App.css';

const SIZES = ['sm', 'md', 'lg', 'xl', '2xl'];

function buttonSnippet({ hierarchy, size, destructive, showDot, disabled }) {
  const props = [
    `hierarchy="${hierarchy}"`,
    `size="${size}"`,
    destructive ? 'destructive' : null,
    showDot ? 'showDot' : null,
    disabled ? 'disabled' : null,
  ]
    .filter(Boolean)
    .join(' ');
  return `<Button ${props}>Button CTA</Button>`;
}

export default function App() {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(false), 1400);
    return () => window.clearTimeout(t);
  }, [toast]);

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
    setToast(true);
  }

  return (
    <div className="lab">
      <header className="lab__header">
        <div>
          <p className="lab__eyebrow">Untitled UI · from Figma via MCP</p>
          <h1 className="lab__title">Component Lab</h1>
          <p className="lab__dek">
            Interactive Buttons built from the Untitled UI PRO set. Every example
            copies its JSX. New components ship through pull requests with preview
            URLs.
          </p>
        </div>
      </header>

      <section className="lab__section">
        <h2 className="lab__section-title">Buttons</h2>
        <p className="lab__section-note">
          Seven hierarchies × five sizes, plus destructive and dot-leading.
          Click a cell to copy JSX.
        </p>
        <div className="lab__grid">
          {HIERARCHIES.flatMap((hierarchy) =>
            SIZES.map((size) => (
              <button
                key={`${hierarchy}-${size}`}
                type="button"
                className="lab__cell"
                onClick={() => void copy(buttonSnippet({ hierarchy, size }))}
              >
                <span className="lab__cell-label">
                  {hierarchy} · {size}
                </span>
                <Button hierarchy={hierarchy} size={size}>
                  Button CTA
                </Button>
              </button>
            )),
          )}
        </div>
        <div className="lab__row">
          <Button
            hierarchy="primary"
            showDot
            onClick={() =>
              void copy(buttonSnippet({ hierarchy: 'primary', size: 'md', showDot: true }))
            }
          >
            With dot
          </Button>
          <Button
            hierarchy="primary"
            destructive
            onClick={() =>
              void copy(
                buttonSnippet({ hierarchy: 'primary', size: 'md', destructive: true }),
              )
            }
          >
            Destructive
          </Button>
          <Button
            hierarchy="secondary-gray"
            destructive
            onClick={() =>
              void copy(
                buttonSnippet({
                  hierarchy: 'secondary-gray',
                  size: 'md',
                  destructive: true,
                }),
              )
            }
          >
            Secondary destructive
          </Button>
          <Button hierarchy="primary" disabled>
            Disabled
          </Button>
        </div>
      </section>

      <div className="lab__toast" data-show={toast} role="status">
        Copied JSX
      </div>
    </div>
  );
}
