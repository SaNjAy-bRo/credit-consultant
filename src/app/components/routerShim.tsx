import { useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname, useParams as useNextParams } from 'next/navigation';

export function Link({ to, href, children, ...props }: any) {
  const target = href || to || '/';
  return (
    <NextLink href={target} {...props}>
      {children}
    </NextLink>
  );
}

export function useLocation() {
  const pathname = usePathname() || '/';
  return { pathname, search: '' };
}

export function useParams<T extends Record<string, string | string[]> = Record<string, string>>() {
  const params = useNextParams();
  return (params || {}) as T;
}

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (replace) window.location.replace(to);
      else window.location.href = to;
    }
  }, [to, replace]);
  return null;
}
