import './toggle.css';

/**
 * Untitled UI Toggle — sm/md, label + supporting text, role=switch.
 * Specs from Figma node 1102:4208 (Untitled UI PRO v3.1).
 */
export default function Toggle({
  size = 'md',
  label,
  supportingText,
  checked = false,
  disabled = false,
  onChange,
  className = '',
  id,
  ...rest
}) {
  const inputId = id || undefined;

  return (
    <label
      className={['toggle', `toggle--${size}`, className].filter(Boolean).join(' ')}
      data-checked={checked ? 'true' : 'false'}
      data-disabled={disabled ? 'true' : 'false'}
      htmlFor={inputId}
    >
      <span className="toggle__control">
        <input
          id={inputId}
          className="toggle__input"
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          aria-checked={checked}
          onChange={onChange}
          {...rest}
        />
        <span className="toggle__track" aria-hidden>
          <span className="toggle__thumb" />
        </span>
      </span>
      {(label || supportingText) && (
        <span className="toggle__copy">
          {label ? <span className="toggle__label">{label}</span> : null}
          {supportingText ? (
            <span className="toggle__supporting">{supportingText}</span>
          ) : null}
        </span>
      )}
    </label>
  );
}
