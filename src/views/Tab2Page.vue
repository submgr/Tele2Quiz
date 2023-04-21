<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <ul>
        <li v-for="(person, index) in items" :key="index">
          {{ person.name }} - {{ index }}
        </li>
      </ul>



      <ExploreContainer name="Tab 2 page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Tab3Page',
  components: {},
  mounted() {
    const tabsEl = document.querySelector('ion-tab-bar');
    if (tabsEl) {
      tabsEl.hidden = false;
      tabsEl.style.height = "1";
    }
    this.test_alert()

    this.items.push({ name: 'Ваня', age: 34 })
  },
  setup() {

    return {
      items: [
        { name: 'Ваня', age: 34 },
        { name: 'Марина', age: 25 },
        { name: 'Николай', age: 51 },
      ]
    }
    //
  },

  methods: {
    test_alert(msg = "test alert msg is empty") {
      alert(msg)
    }
  }
});


</script>
