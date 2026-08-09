import './button.css';

const HIERARCHIES = [
  'primary',
  'secondary-gray',
  'secondary-color',
  'tertiary-gray',
  'tertiary-color',
  'link-gray',
  'link-color',
];

/**
 * Tailwind Button: Hierarchy x Size x Destructive x Dot.
 * Specs from Figma node 3287:427074.
 */
export default function Button({
  hierarchy = 'primary',
  size = 'md',
  destructive = false,
  showDot = false,
  disabled = false,
  type = 'button',
  className = '',
  children = 'Button CTA',
  ...rest
}) {
  const hierarchyKey = HIERARCHIES.includes(hierarchy) ? hierarchy : 'primary';
  const colorClass = destructive
    ? hierarchyKey === 'primary'
      ? 'btn--primary-destructive'
      : hierarchyKey.startsWith('secondary')
        ? 'btn--secondary-destructive'
        : hierarchyKey.startsWith('tertiary')
          ? 'btn--tertiary-destructive'
          : 'btn--link-destructive'
    : `btn--${hierarchyKey}`;

  const classes = ['btn', `btn--${size}`, colorClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {showDot ? <span className="btn__dot" aria-hidden /> : null}
      <span className="btn__label">{children}</span>
    </button>
  );
}

export { HIERARCHIES };
