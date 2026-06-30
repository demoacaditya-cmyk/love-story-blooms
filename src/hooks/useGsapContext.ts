import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";

export function useGsapContext(
  setup: (self: gsap.Context) => void,
  scope: RefObject<HTMLElement | null>,
  deps: ReadonlyArray<unknown> = [],
) {
  const ctxRef = useRef<gsap.Context | null>(null);
  useEffect(() => {
    if (!scope.current) return;
    ctxRef.current = gsap.context(setup, scope.current);
    return () => ctxRef.current?.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}