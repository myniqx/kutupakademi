import { ComponentProps } from 'react';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function H2({ children, ...props }: ComponentProps<'h2'>) {
  const text = typeof children === 'string' ? children : '';
  const id = slugify(text);

  return (
    <h2 id={id} {...props}>
      {children}
    </h2>
  );
}

export function H3({ children, ...props }: ComponentProps<'h3'>) {
  const text = typeof children === 'string' ? children : '';
  const id = slugify(text);

  return (
    <h3 id={id} {...props}>
      {children}
    </h3>
  );
}
