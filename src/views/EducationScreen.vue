<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Центр обучения</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">

            <p style="margin-top: 8.2vh; margin-left: 5vw; margin-right: 3vw; font-weight: 600; font-size: 24px;">Для вас</p>

            <div class="reward-container" v-if="reloader">
                <div  v-for="(reward, index) in materials" :key="index" class="reward-stat-num">
                    
                    <img src="../assets/Icons8_Play.png" height="40" style="margin-left: 8%; margin-top: 3.5vh">
                    <p style="margin-left: 8px; margin-top: 3.2vh;">{{ reward.videoTitle }}</p>
                </div>
            </div>

            <div style="margin-top: 5vh; margin-left: 3vw; margin-right: 3vw;">
                <p style="margin-left: 8px; margin-top: 3.2vh; font-weight: 600; font-size: 24px;">Выбор редакции</p>
                <iframe
                        style="border-radius: 20px; width: 100%;"
                            :src="'https://www.youtube.com/embed/ICMtwRpfcb0'"
                            frameborder="0"
                            allow="autoplay; encrypted-media"
                            allowfullscreen
                        ></iframe>
            </div>

            <img  class="mgt-3 thumbnail" src="../assets/DailyEventsThumbnail_Simpler.png">

            
        </ion-content>
    </ion-page>
</template>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/clash-display');

.mgt-3 {
    margin-top: 3vh;
}

.thumbnail {
    margin-left: 3vw;
    margin-right: 3vw;
    width: 94vw;
    border-radius: 22px;
}

.reward-stat-num {
    margin-left: 3vw;
    margin-right: 3vw;
    margin-top: 0vh;
    background: #2B313D;
    border-radius: 21px;
    height: 5vh;
    font-weight: 500;
    font-family: 'Clash Display', sans-serif;
    display: flex;
    bottom: 0 !important;
    height: 15vh;
    font-size: 3vh;
    width: 80vw;
}

.parent-container {
    display: flex;
    flex-wrap: nowrap;
    /* prevents items from wrapping */
    overflow-x: auto;
    /* allows horizontal scrolling */
    -ms-overflow-style: none;
    /* hides scrollbar in IE */
    scrollbar-width: none;
    /* hides scrollbar in Firefox */
}

.reward-container {
    bottom: 0 !important;
    display: flex;
    /* Make the container a flexbox */
    overflow-x: scroll;
    /* Add horizontal scrolling */
}

.reward-stat-num {
    flex: 0 0 auto;
    /* Make the divs flexible, but not grow or shrink */
    margin-right: 16px;
    /* Add margin between divs */
    bottom: 0 !important;
}
</style>

<script lang="ts">
import OnboardingElement_01 from '../assets/juicy-girl-typing-on-phone.json'
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonInput, IonTitle, IonIcon, IonCol, IonSpinner, IonRow, IonGrid } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { EffectCoverflow } from "swiper";

import { arrowForwardOutline, informationCircleOutline } from 'ionicons/icons';

import axios from 'axios'
import globaldata from '../modules/global';

import { socket } from "../modules/socket.js"

import { createApp } from 'vue'

import { reactive } from 'vue'


interface Material {
    id: string,
    videoTitle: string,
    videoUrl: string,
    theme: string
}

export default defineComponent({
    name: 'Tab3Page',
    components: { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonInput, IonTitle, IonIcon, IonCol, IonSpinner, IonRow, IonGrid },
    mounted() {
        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = false;
            tabsEl.style.height = "1";
        }
        // eslint-disable-next-line
        const parent_this = this;
        function proxy_prepareEduMaterial(data = { id: "0", videoTitle: "", videoUrl: "", theme: "" }) {
            parent_this.prepareEduMaterial(data)

        }
        var vm = this;

        axios.get(globaldata.api.hostname + "videos", {
            params: { key: "value" }
        })
            .then((response) => {
                console.log(response);
                this.prepareEduMaterial({
                    "id": "1",
                    "videoTitle": "История США на карте",
                    "videoUrl": "https://www.youtube.com/watch?v=w1bWTB3S_4U",
                    "theme": "История"
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    setup() {


        return {
            state: "awaiting_code",
            arrowForwardOutline,
            informationCircleOutline,
            reloader: true,
            materials: [{
		"id": '1',
		"videoTitle": "История США на карте",
		"videoUrl": "https://www.youtube.com/watch?v=w1bWTB3S_4U",
		"theme": "История"
	},
	{
		"id": 2,
		"videoTitle": "Философия на пальцах",
		"videoUrl": "https://www.youtube.com/watch?v=ICMtwRpfcb0",
		"theme": "Философия"
	},
	{
		"id": 3,
		"videoTitle": "Венеция. Орёл и Решка",
		"videoUrl": "https://www.youtube.com/watch?v=Xiuce2-837Y",
		"theme": "Путешествия"
	}
            ]
        }
        //
    },
    methods: {
        test_alert(msg = "test alert msg is empty") {
            alert(msg)
        },
        prepareEduMaterial(data = { id: "0", videoTitle: "", videoUrl: "", theme: "" }) {
            this.materials.push({
                "id": data.id + "trgerf",
                "videoTitle": data.videoTitle,
                "videoUrl": data.videoUrl,
                "theme": data.theme
            })
            this.reloader = true
            console.info(this.materials)
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

.button-style {
    margin-top: 6%;
    --opacity: 0.7;
    margin-top: 2.8vh;
    line-height: 2.3;
}

.info-btn {
    opacity: 0.2;
    margin-top: 1vh;
    font-weight: 800;
    color: linear-gradient(134.98deg, rgba(243, 14, 14, 0.15) 0%, rgba(139, 208, 231, 0.2));
}
</style>
  