type intersectionCallback = (entry: IntersectionObserverEntry) => void;

const intersectionHandler = (isIntersectingFn: intersectionCallback) =>
  function handleIntersection(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry) => {
      isIntersectingFn(entry);
    });
  };

function observeElemement(
  element: HTMLElement,
  isIntersectingFn: intersectionCallback,
  options?: IntersectionObserverInit
) {
  const handleIntersection = intersectionHandler(isIntersectingFn);
  const observer = new IntersectionObserver(handleIntersection, options);
  observer.observe(element);
}

export default { observeElemement };
