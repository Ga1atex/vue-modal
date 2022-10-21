const focusableElementsSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const useFocusTrap = () => {
  let focusedElBeforeOpen;
  let focusableElements = [];
  let $firstFocusable;
  let $lastFocusable;
  let trapRef;
  // const trapRef = customRef((track, trigger) => {
  //   let $trapEl = null;
  //   return {
  //     get() {
  //       track();
  //       return $trapEl;
  //     },
  //     set(value) {
  //       $trapEl = value;
  //       value ? initFocusTrap() : clearFocusTrap();
  //       trigger();
  //     },
  //   };
  // });

  function keyHandler(e) {
    const isTabPressed = e.key === "Tab";

    if (!isTabPressed) return;

    if (e.shiftKey) {
      if (document.activeElement === $firstFocusable) {
        $lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === $lastFocusable) {
        $firstFocusable.focus();
        e.preventDefault();
      }
    }
  }

  function initFocusTrap(elem) {
    if (!elem) return;

    trapRef = elem;
    focusedElBeforeOpen = document.activeElement;
    focusableElements = trapRef.querySelectorAll(focusableElementsSelector);
    $firstFocusable = focusableElements[0];
    $lastFocusable = focusableElements[focusableElements.length - 1];

    trapRef.addEventListener("keydown", keyHandler);
    $firstFocusable.focus();
  }

  function clearFocusTrap() {
    trapRef.removeEventListener("keydown", keyHandler);
    focusedElBeforeOpen.focus();
  }

  return {
    initFocusTrap,
    clearFocusTrap,
  };
};

export default useFocusTrap;
