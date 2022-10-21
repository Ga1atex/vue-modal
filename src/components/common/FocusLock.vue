<template>
  <div class="dialog-focus-lock">
    <slot />
  </div>
</template>

<script>
export default {
  name: "focus-lock",
  data() {
    return {
      focusableEls: [],
      firstFocusableEl: [],
      lastFocusableEl: [],
      focusedElBeforeOpen: document.activeElement,
    };
  },

  methods: {
    initFocusLock() {
      this.findFocusableElements();
      this.$el.addEventListener("keydown", this.handleKeyDown);
      this.firstFocusableEl.focus();
    },

    findFocusableElements() {
      const focusableElementsSelector =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

      const focusableElements = this.$el.querySelectorAll(
        focusableElementsSelector
      );
      this.focusableEls = focusableElements;
      this.firstFocusableEl = focusableElements[0];
      this.lastFocusableEl = focusableElements[focusableElements.length - 1];
    },

    handleBackwardTab(e) {
      if (document.activeElement === this.firstFocusableEl) {
        e.preventDefault();
        this.lastFocusableEl.focus();
      }
    },

    handleForwardTab(e) {
      if (document.activeElement === this.lastFocusableEl) {
        e.preventDefault();
        this.firstFocusableEl.focus();
      }
    },

    handleKeyDown(e) {
      const isTabPressed = e.key === "Tab";

      if (!isTabPressed) return;

      if (this.focusableEls.length === 1) {
        e.preventDefault();
      }
      if (e.shiftKey) {
        this.handleBackwardTab(e);
      } else {
        this.handleForwardTab(e);
      }
    },
  },

  mounted() {
    this.initFocusLock();
  },
  beforeUnmount() {
    this.$el.removeEventListener("keydown", this.handleKeyDown);
    this.focusedElBeforeOpen.focus();
  },
};
</script>
