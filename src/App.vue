<script>
import MyModal from "./components/common/MyModal.vue";
import RoundedButton from "./components/common/RoundedButton.vue";
import DangerModal from "./components/DangerModal.vue";

export default {
  name: "App",
  components: {
    MyModal,
    DangerModal,
    RoundedButton,
  },
};
</script>

<template>
  <main class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <rounded-button @click="$refs.simpleModalRef.open()">
      Open modal
    </rounded-button>
    <rounded-button @click="$refs.dangerModalRef.open()">
      Open danger modal
    </rounded-button>
  </main>

  <my-modal ref="simpleModalRef">
    <template v-slot:header> Terms of Service </template>
    <template v-slot:default>
      <div class="p-6 space-y-6">
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          With less than a month to go before the European Union enacts new
          consumer privacy laws for its citizens, companies around the world are
          updating their terms of service agreements to comply.
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The European Union’s General Data Protection Regulation (G.D.P.R.)
          goes into effect on May 25 and is meant to ensure a common set of data
          rights in the European Union. It requires organizations to notify
          users as soon as possible of high-risk data breaches that could
          personally affect them.
        </p>
      </div>
    </template>
  </my-modal>
  <danger-modal ref="dangerModalRef"></danger-modal>
</template>

<style scoped></style>
