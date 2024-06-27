import { useCallback, useRef } from "react";

export default function useInfiniteScroll(
  isLoading: boolean,
  loadMoreItems: () => void
) {
  const observer = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: Element) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, loadMoreItems]
  );
  return { ref };
}
