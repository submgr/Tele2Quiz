<template>
    <ion-page :style="pageStyle">
        <ion-content :fullscreen="true">

            <div class="floating_element" style="width:250%"></div>

            <swiper :modules="modules" :effect="'coverflow'" :pagination="{ clickable: true }">
                <swiper-slide
                    style="display: block; margin-top: 12vh; text-align: left; padding-left: 5vw; padding-right: 5vw;">
                    <div class="slide">
                        <p>
                            <Vue3Lottie :animationData="OnboardingElement_01" style="height: 35vh; margin-left: -10vw;" />
                        </p>
                        <h2 style="font-weight: 800; font-size: 4vh; line-height: 0.9;">Знания — это новые мегабайты! </h2>
                        <p
                            style="opacity: 0.6; font-size: 2.5vh; font-weight: 500; color: #999999; line-height: 24px !important; letter-spacing: -0.8px;">
                            Получайте баллы за правильные ответы в нашей викторине и обменяйте их на мегабайты!
                        </p>
                        <ion-button fill="solid" href="/tabs/auth"
                            style="opacity: 0.9; --background: linear-gradient(134.98deg, rgba(255, 255, 255, 0.15) 0%, rgb(0, 181, 239, 0.2); font-weight: 700;">Начать
                            <ion-icon slot="end" :icon="arrowForward"></ion-icon></ion-button>
                    </div>
                </swiper-slide>
            </swiper>

        </ion-content>
    </ion-page>
</template>

<style scoped>
* {
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Roboto, sans-serif;
}

.floating_element {
    display: block;
    position: fixed;
    z-index: -1;
    bottom: -100%;
    height: 160%;
    left: 30px;
}

.swiper-coverflow {
    height: 90%;
}

.swiper-pagination {
    bottom: 20px !important;
    position: relative;
    z-index: 4000;
}

.swiper-pagination-bullet {
    background: #3a81ff !important;
}
</style>

<script lang="ts">
import OnboardingElement_01 from '../assets/juicy-girl-typing-on-phone.json'
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { EffectCoverflow } from "swiper";
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton } from '@ionic/vue';
import { arrowForward } from 'ionicons/icons';
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import 'swiper/css';
import "swiper/css/effect-cards";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-coverflow";

import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

export default defineComponent({
    name: 'Tab3Page',
    components: { IonHeader, IonToolbar, IonButton, IonContent, IonPage, Swiper, SwiperSlide, Vue3Lottie },
    props: ['someFunctionParent'],
    mounted() {
        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = true;
            tabsEl.style.height = "1";
        }
    },
    setup() {
        
        return {
            OnboardingElement_01,
            pageStyle: {
                "--ion-background-color": "#000000",
                "--ion-font-family": "Roboto"
            },
            modules: [Navigation, Pagination, Scrollbar, A11y, EffectCoverflow],
            arrowForward,
            footer: "hide"
        }
        //
    }
});
</script>

<style scoped>ion-content {
    --background: #000 url('../assets/BoardingBackgroundRetina.png') no-repeat center center / cover !important;
}</style>