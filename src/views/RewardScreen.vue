<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Центр вознаграждений</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">

        <div class="reward-stat-num">
            <img src="../assets/FigmaDesign_Coin.png" height="40" style="margin-left: 3%;"/>
            <p style="margin-left: 8px; padding-top: 1px;">{{ scores }}</p>
            <div style="margin-right: 0 !important;"><p style="margin-left: 18%"><ion-icon class="info-button info-btn" slot="end" :icon="informationCircleOutline"></ion-icon></p></div>
        </div>
  
        <img @click="req_spendCoinsFor1GB()" class="mgt-3 thumbnail" src="../assets/FigFrame_Exch1gbTo30mb.png">

        <ion-modal @willDismiss="Modal_onWillDismiss" :is-open="modalopen == 'yes'" trigger="open-modal" :initial-breakpoint="0.50" :breakpoints="[0.50, 0.75]" handle-behavior="cycle">
                <ion-content class="ion-padding">
                    <div class="ion-margin-top">
                        <ion-label style="white-space: pre-wrap;"><br><b style="font-size: 28px;">Меняем?</b><br><br>На данный момент вам не хватает некоторого количества баллов для получения этой награды, но вы уже почти достигли цели! Продолжайте активно участвовать в викторинах, чтобы скоро обменять свои баллы на доступ в интернет.</ion-label>
                    </div>
                </ion-content>
            </ion-modal>

        
      </ion-content>
    </ion-page>
  </template>

  <style scoped>
  @import url('https://fonts.cdnfonts.com/css/clash-display');
  .mgt-3{
    margin-top: 3vh;
  }
  .thumbnail{
    margin-left: 3vw;
    margin-right: 3vw;
    width: 94vw;
    border-radius: 22px;
  }

  .reward-stat-num{
    margin-left: 3vw;
    margin-right: 3vw;
    margin-top: 5vh;
    background: #2B313D;
    border-radius: 21px;
    height: 5vh;
    font-weight: 500;
    font-family: 'Clash Display', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vh;
    font-size: 3vh;
  }
  </style>

<script lang="ts">
import { IonPage, toastController , IonModal, IonToast, IonHeader, IonToolbar, IonContent, IonButton, IonInput, IonTitle, IonIcon, IonCol, IonSpinner, IonRow, IonGrid  } from '@ionic/vue';
import { defineComponent, ref, reactive } from 'vue';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { EffectCoverflow } from "swiper";

import axios from 'axios'
import globaldata from '../modules/global';

import { arrowForwardOutline, informationCircleOutline } from 'ionicons/icons';


import { socket } from "../modules/socket.js"

export default defineComponent({
    name: 'Tab3Page',
    components: { IonPage, IonToast, IonHeader, IonModal, IonToolbar, IonContent, IonButton, IonInput, IonTitle, IonIcon, IonCol, IonSpinner, IonRow, IonGrid  },
    mounted() {
        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = false;
            tabsEl.style.height = "1";
        }

        // eslint-disable-next-line
        var parent_this = this;


        
    },
    setup() {

        var coins = 0

        function httpRequest(address, reqType, asyncProc) {
  var req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  if (asyncProc) { 
    req.onreadystatechange = function() { 
      if (this.readyState == 4) {
        asyncProc(this);
      } 
    };
  }
  req.open(reqType, address, !(!asyncProc));
  req.send();
  return req;
}


var req = httpRequest(globaldata.api.hostname + "users/" + localStorage.getItem("userid") + "", "GET", false);  // In this example you don't want to GET the full page contents
        console.info(JSON.parse(req.response).scores)
coins = JSON.parse(req.response).scores
        return {
            state: "awaiting_code",
            arrowForwardOutline,
            informationCircleOutline,
            scores: coins,
            modalopen: "no"
        }
        //
    },
    methods: {
        test_alert(msg = "test alert msg is empty"){
            alert(msg)
        },
        async req_spendCoinsFor1GB(){
            console.log("try exch.1g")
            this.modalopen = "no"
            const toast = await toastController.create({
          message: 'На данный момент вам не хватает некоторого количества баллов для получения этой награды, но вы уже почти достигли цели! Продолжайте активно участвовать в викторинах, чтобы скоро обменять свои баллы на доступ в интернет.',
          duration: 7500,
          position: "middle"
        });

        await toast.present();
        },
        Modal_onWillDismiss(){
            //
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

.info-btn{
    opacity: 0.2;
    margin-top: 1vh;
    font-weight: 800;
    color: linear-gradient(134.98deg, rgba(243, 14, 14, 0.15) 0%, rgba(139, 208, 231, 0.2));
}
</style>
  