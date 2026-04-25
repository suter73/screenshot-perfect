// Compatibility layer to ease migration from react-router-dom to @tanstack/react-router.
import { useRouter, useLocation as useTanstackLocation, useParams as useTanstackParams } from "@tanstack/react-router";

/** Mimics react-router-dom's useNavigate signature: navigate(path) or navigate(-1). */
export function useNavigate() {
  const router = useRouter();
  return (to: string | number, opts?: { replace?: boolean }) => {
    if (typeof to === "number") {
      // Only support -1 (back). Other deltas behave like back/forward as best-effort.
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

/** Mimics react-router-dom's useParams — returns route params as a record. */
export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  // strict: false lets us call this from anywhere without supplying a Route id.
  return useTanstackParams({ strict: false }) as T;
}
