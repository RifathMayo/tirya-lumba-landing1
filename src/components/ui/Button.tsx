import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'coral';
type Props = { variant?: Variant; small?: boolean; href?: string; children: ReactNode; className?: string } &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

const styles: Record<Variant, string> = {
  primary: 'bg-cy text-white hover:bg-pb',
  outline: 'border-2 border-pb bg-transparent text-pb hover:bg-pb hover:text-white',
  coral: 'bg-co text-white hover:opacity-90',
};

export default function Button({ variant = 'primary', small, href, children, className, ...rest }: Props) {
  const cls = cx(
    'inline-block rounded-full font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-cy focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    small ? 'px-4 py-2 text-sm' : 'px-6 py-[11px] text-[15px]', styles[variant], className,
  );
  return href ? <Link href={href} className={cls}>{children}</Link> : <button className={cls} {...rest}>{children}</button>;
}
