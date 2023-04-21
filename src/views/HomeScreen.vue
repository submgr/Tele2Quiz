<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Главная</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
  
        <img @click="connect()" class="mgt-3 thumbnail" src="../assets/DailyEventsThumbnail_Simpler.png">
        
        <ion-grid style="margin-top: 3vh;">
            <ion-row>
                <ion-col size="6">
                    <img @click="connect('e')" src="../assets/fire_nfnf(1).png"/>
                </ion-col>
                <ion-col size="6">
                    <img @click="connect('2')" src="../assets/fireаgtg2).png"/>
                </ion-col>
            </ion-row>
        </ion-grid>
        <ion-grid style="margin-top: -1.5vh;">
            <ion-row>
                <ion-col size="6">
                    <img @click="connect('3')" src="../assets/fireerferg(3).png"/>
                </ion-col>
                <ion-col size="6">
                    <img @click="connect('1')" src="../assets/fireferjhfrj4).png"/>
                </ion-col>
            </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
  </template>

  <style scoped>
  .mgt-3{
    margin-top: 3vh;
  }
  .thumbnail{
    margin-left: 3vw;
    margin-right: 3vw;
    width: 94vw;
    border-radius: 22px;
  }
  </style>

<script lang="ts">
import OnboardingElement_01 from '../assets/juicy-girl-typing-on-phone.json'
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonInput, IonTitle, IonIcon, IonCol, IonSpinner, IonRow, IonGrid } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { EffectCoverflow } from "swiper";

import { arrowForwardOutline } from 'ionicons/icons';

export default defineComponent({
    name: 'Tab3Page',
    components: { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonInput, IonTitle, IonIcon, IonCol, IonSpinner, IonRow, IonGrid },
    mounted() {
        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = false;
            tabsEl.style.height = "1";
        }
    },
    setup() {
        
        return {
            state: "awaiting_code",
            arrowForwardOutline
        }
        //
    },
    methods: {
        connect(id) {
            var eid = "1"
            //
            switch (id) {
                case "1":
                    eid = "1"
                    break;
                    case "2":
                    eid = "2"
                    break;
                    case "3":
                    eid = "3"
                    break;
                    case "e":
                    eid = "2"
                    break;
                default:
                    break;
            }

            this.$router.push({path:'/tabs/quiz', replace: true, query: { quiz_id: "1" }});
            
        },
        disconnect() {
            //socket.disconnect();
        }
    }
});


</script>

<style>
.input-style {
        margin-top: 2.8vh;
        margin-left: 5%;
        width: 90%;
        line-height: 2.0;
        --background: #f8f8f893;
        --padding-start: 13px;
        border-radius: 14px;
        opacity: 0.9;
        --background: linear-gradient(134.98deg, rgba(214, 188, 188, 0.15) 0%, rgba(139, 208, 231, 0.2));
        font-weight: 700;
    }
.button-style{
    margin-top: 6%; --opacity: 0.7; margin-top: 2.8vh; line-height: 2.3;
}
</style>
  