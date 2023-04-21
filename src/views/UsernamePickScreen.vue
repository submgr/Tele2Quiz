<template>
    <transition name="show">
        <ion-page>
            <ion-content :fullscreen="true" v-if="state == 'main' || state == 'main_processing'">
        
                <h1 style="margin-left: 15px; margin-top: 18vh; font-size: 120px;">
                    <img src="../assets/Icons8_Arcade.png" style="height: 21vh; margin-top: 7vh"/>
                </h1>
        
                <p style="text-align: left; padding: 0px 22px 0px; margin-top: 0.75rem; margin-bottom: 0;  align-items: flex-start; min-width: 100%; font-size: 34px; font-weight: 600;">Почти готово</p>
                <p style="text-align: left; padding: 0px 22px 0px; padding-top: 2%; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 18px; font-weight: 400; opacity: 0.7">Это имя пользователя будут видеть другие пользователи</p>
        
                <ion-grid>
                    <ion-row>
                    <ion-col size="12">
                        <ion-input class="input-style" scrollAssist="false" autofocus="true" type="phone" placeholder="Имя пользователя" v-model="email" pattern="email"
                        ></ion-input>
                    </ion-col>
                    </ion-row>
                </ion-grid>
        
                <ion-button class="button-common-style" @click="signin" :disabled="state == 'main_processing'" style="margin-right: 5%; margin-left: 35%; margin-top: 2%; --opacity: 0.7;" expand="block">
                    <ion-icon v-if="state == 'main'" class="send-button" slot="end" :icon="arrowForwardOutline"></ion-icon>
                    Продолжить
                    <ion-spinner v-if="state == 'main_processing'" name="crescent" style="margin-left: 6%; margin-right: -6%;"></ion-spinner>
                </ion-button>

                <ion-modal
                    @willDismiss="Modal_onWillDismiss"
                    :is-open="message_modal_isOpen"
                    trigger="open-modal"
                    :initial-breakpoint="0.25"
                    :breakpoints="[0, 0.25, 0.5, 0.75]"
                    handle-behavior="cycle"
                >
                    <ion-content class="ion-padding">
                        <div class="ion-margin-top">
                        <ion-label style="white-space: pre-wrap;">{{message_modal_text}}</ion-label>
                        </div>
                    </ion-content>
                </ion-modal>


        
        </ion-content>
        
    </ion-page>
</transition>
    </template>
    
    
    <style scoped>

.show-enter-active,
.show-leave-enter {
    transform: translateX(0);
    transition: all .3s linear;
}
.show-enter,
.show-leave-to {
    transform: translateX(100%);
}
    .hr-line{
        margin-right: 7%; margin-left: 7%; background-color: white; margin-top: 7%; opacity: 0.3;
    }

    .form-control {
        display: block;
        height: 50px;
        margin-right: 0.5rem;
        text-align: center;
        font-size: 1.25rem;
        min-width: 0;
    }

    .form-control:last-child {
        margin-right: 0;
    }
    
    
    .input-style {
        margin-top: 8%;
        margin-left: 3%;
        width: 94.5%;
        line-height: 2.3;
        --background: #f8f8f893;
        --padding-start: 13px;
        border-radius: 8px;
        opacity: 0.9;
        --background: linear-gradient(134.98deg, rgba(214, 188, 188, 0.15) 0%, rgb(0, 181, 239, 0.2));
        font-weight: 700;
    }

    .button-common-style{
        opacity: 0.9;
        --background: linear-gradient(134.98deg, rgb(0, 181, 239, 0.4) 0%, rgba(119, 127, 207, 0.395) );
    }

    .input-code[value]:not([value=""]){
        font-size: 34px;
    }
    
    .send-button {
        --opacity: 0.7;
    }
    
    @media (prefers-color-scheme: light) {
        .input-style {
            --background: #ffffff17;
        }
    }
    </style>
    
    <script lang="ts">
    import {
        defineComponent
    } from 'vue';
    import {
        IonPage,
        IonContent,
        IonInput,
        IonButton,
        IonIcon,
        IonModal,
        IonSpinner,
        modalController
    } from '@ionic/vue';
    
    import {
        arrowForwardOutline,
        mailOutline,
        logoGoogle,
        chatbubbleOutline
    } from 'ionicons/icons';

    import * as vuefire from 'vuefire'

    import globaldata from '../modules/global';
    
    export default defineComponent({
        name: 'Tab1Page',
        components: {
            IonContent,
            IonPage,
            IonModal,
            IonSpinner,
            // eslint-disable-next-line
            IonInput,
            IonButton,
            IonIcon
        },
        data() {
            return {
                message_modal_isOpen: false,
                userid: "",
                code: "",
                state: "main",
                message_modal_text: "Something went wrong. Code: the text is not defined, but modal is called. Weird.",
                email: "",
                verificationCode: ""
            }
        },
        methods: {
            async Modal_onWillDismiss(){
                this.message_modal_isOpen = false;
            }
        },
        setup() {

            return {
                arrowForwardOutline,
                logoGoogle,
                mailOutline,
                chatbubbleOutline
            }
        },
        mounted(){
            vuefire
        }
    });
    </script>
    