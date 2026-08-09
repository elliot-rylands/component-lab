import { useEffect, useState } from 'react';
import Button, { HIERARCHIES } from './components/Button';
import Toggle from './components/Toggle';
import './App.css';

const SIZES = ['sm', 'md', 'lg', 'xl', '2xl'];
const TOGGLE_SIZES = ['sm', 'md'];

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

function toggleSnippet({ size, checked, disabled, label, supportingText }) {
  const props = [
    `size="${size}"`,
    checked ? 'checked' : null,
    disabled ? 'disabled' : null,
    label ? `label="${label}"` : null,
    supportingText ? `supportingText="${supportingText}"` : null,
  ]
    .filter(Boolean)
    .join(' ');
  return `<Toggle ${props} />`;
}

export default function App() {
  const [toast, setToast] = useState(false);
  const [notify, setNotify] = useState(true);
  const [digest, setDigest] = useState(false);
  const [sizeDemo, setSizeDemo] = useState({ sm: true, md: true });

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
          <p className="lab__eyebrow">Tailwind · from Figma via MCP</p>
          <h1 className="lab__title">Component Lab</h1>
          <p className="lab__dek">
            Interactive Buttons and Toggles built from a Tailwind component set.
            Every example copies its JSX.
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
                onClick={() =>
                  void copy(buttonSnippet({ hierarchy, size }))
                }
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

      <section className="lab__section">
        <h2 className="lab__section-title">Toggles</h2>
        <p className="lab__section-note">
          Shipped through a pull request with <code>role=&quot;switch&quot;</code>,
          sm/md sizes, and label + supporting text. Flip one to copy JSX.
        </p>
        <div className="lab__grid lab__grid--toggles">
          {TOGGLE_SIZES.map((size) => (
            <div key={size} className="lab__cell lab__cell--static">
              <span className="lab__cell-label">size · {size}</span>
              <Toggle
                size={size}
                label="Remember me"
                supportingText="Save my login details for next time."
                checked={sizeDemo[size]}
                onChange={(e) => {
                  setSizeDemo((prev) => ({ ...prev, [size]: e.target.checked }));
                  if (size === 'md') setNotify(e.target.checked);
                  void copy(
                    toggleSnippet({
                      size,
                      checked: e.target.checked,
                      label: 'Remember me',
                      supportingText: 'Save my login details for next time.',
                    }),
                  );
                }}
              />
            </div>
          ))}
          <button
            type="button"
            className="lab__cell"
            onClick={() =>
              void copy(
                toggleSnippet({
                  size: 'md',
                  checked: true,
                  disabled: true,
                  label: 'Locked',
                }),
              )
            }
          >
            <span className="lab__cell-label">disabled</span>
            <Toggle label="Locked" checked disabled />
          </button>
        </div>
        <div className="lab__row lab__row--toggles">
          <Toggle
            label="Notifications"
            supportingText="Push alerts for new reports."
            checked={notify}
            onChange={(e) => {
              setNotify(e.target.checked);
              setSizeDemo((prev) => ({ ...prev, md: e.target.checked }));
              void copy(
                toggleSnippet({
                  size: 'md',
                  checked: e.target.checked,
                  label: 'Notifications',
                  supportingText: 'Push alerts for new reports.',
                }),
              );
            }}
          />
          <Toggle
            label="Weekly digest"
            checked={digest}
            onChange={(e) => {
              setDigest(e.target.checked);
              void copy(
                toggleSnippet({
                  size: 'md',
                  checked: e.target.checked,
                  label: 'Weekly digest',
                }),
              );
            }}
          />
        </div>
      </section>

      <div className="lab__toast" data-show={toast} role="status">
        Copied JSX
      </div>
    </div>
  );
}
