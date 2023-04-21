<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">

        <ion-tab-button tab="onboarding" href="/tabs/home">
          <ion-icon aria-hidden="true" :icon="prismOutline" />
          <ion-label>Главная</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="reward" href="/tabs/reward">
          <ion-icon aria-hidden="true" :icon="albumsOutline" />
          <ion-label>Вознаграждения</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="edu" href="/tabs/edu">
          <ion-icon aria-hidden="true" :icon="libraryOutline" />
          <ion-label>Образование</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="chat" href="/tabs/chat">
          <ion-icon aria-hidden="true" :icon="chatbubbleOutline" />
          <ion-label>Чат</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle, albumsOutline, prismOutline, gameControllerOutline, libraryOutline, chatbubbleOutline } from 'ionicons/icons';
</script>
