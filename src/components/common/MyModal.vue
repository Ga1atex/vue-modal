<template lang="">
  <focus-lock v-if="isOpen">
    <div
      v-if="isOpen"
      id="defaultModal"
      tabindex="-1"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 w-full md:inset-0 h-modal md:h-full justify-center items-center flex bg-gray-900 dark:bg-opacity-80 inset-0 z-40"
      :aria-hidden="!isOpen"
      :aria-modal="isOpen"
      role="dialog"
      @mouseup.self="close"
    >
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto" ref="trapRef">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              <slot name="header"></slot>
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              @click="close"
            >
              <cross-sign />
            </button>
          </div>
          <!-- Modal body -->
          <slot></slot>
          <!-- Modal footer -->
          <div
            class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
          >
            <slot name="footer" :close="close" :confirm="confirm">
              <button
                data-modal-toggle="defaultModal"
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="confirm"
              >
                Okay
              </button>
              <button
                data-modal-toggle="defaultModal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                @click="close"
              >
                Decline
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </focus-lock>
</template>

<script>
// import useFocusTrap from "@/composables/useFocusTrap";
import CrossSign from "./CrossSign.vue";
import FocusLock from "./FocusLock.vue";
export default {
  currentModalController: null,
  components: {
    FocusLock,
    CrossSign,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  // setup() {
  //   const { initFocusTrap, clearFocusTrap } = useFocusTrap();

  //   return { initFocusTrap, clearFocusTrap };
  // },
  methods: {
    open() {
      const modalPromise = new Promise((resolve, reject) => {
        this.$options.currentModalController = { resolve, reject };
      });

      this.isOpen = true;
      // this.$nextTick(() => {
      //   this.initFocusTrap(this.$refs.trapRef);
      // });

      return modalPromise;
    },
    close() {
      this.$options.currentModalController.resolve(false);
      this.isOpen = false;

      // this.clearFocusTrap();
    },
    confirm() {
      this.$options.currentModalController.resolve(true);
      this.isOpen = false;
    },
    handleEscape(e) {
      if (this.isOpen && e.key === "Escape") {
        this.close();
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", this.handleEscape);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleEscape);
  },
};
</script>
<style lang=""></style>
