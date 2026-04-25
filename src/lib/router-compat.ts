// Compatibility layer to ease migration from react-router-dom to @tanstack/react-router.
import { useRouter, useLocation as useTanstackLocation, useRouterState } from "@tanstack/react-router";

/** Mimics react-router-dom's useNavigate signature: navigate(path) or navigate(-1). */
export function useNavigate() {
  const router = useRouter();
  return (to: string | number, opts?: { replace?: boolean }) => {
    if (typeof to === "number") {
      if (to < 0) router.history.back();
      else router.history.forward();
      return;
    }
    router.navigate({ to, replace: opts?.replace });
  };
}

/** Mimics react-router-dom's useLocation — returns { pathname, search, hash }. */
export function useLocation() {
  return useTanstackLocation();
}

/** Mimics react-router-dom's useParams — returns route params from the deepest matched route. */
export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  return useRouterState({
    select: (s) => {
      const last = s.matches[s.matches.length - 1];
      return (last?.params ?? {}) as T;
    },
  });
}

