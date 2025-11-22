import React from 'react';

/**
 * Utility to join class names conditionally
 * @param  {...any} args - Class names or objects
 * @returns {string}
 */
export function cx(...args) {
  return args
    .flat()
    .filter(x => x !== null && x !== undefined && typeof x !== 'boolean')
    .join(' ')
    .trim();
}

/**
 * Button Component Wrapper
 */
export const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size, 
  outline, 
  ghost, 
  children, 
  ...props 
}, ref) => {
  const classes = cx(
    'wf-btn',
    variant && `wf-btn-${variant}`,
    size && `wf-btn-${size}`,
    outline && 'wf-btn-outline',
    ghost && 'wf-btn-ghost',
    className
  );

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'WafooButton';

/**
 * Card Component Wrapper
 */
export const Card = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cx('wf-card', className)} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'WafooCard';

/**
 * Badge Component Wrapper
 */
export const Badge = React.forwardRef(({ className, variant = 'primary', children, ...props }, ref) => {
  return (
    <span ref={ref} className={cx('wf-badge', `wf-badge-${variant}`, className)} {...props}>
      {children}
    </span>
  );
});

Badge.displayName = 'WafooBadge';
