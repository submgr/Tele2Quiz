<template>
    <ion-page>
        <ion-content :fullscreen="true">
    
            <img style="margin-left: 17px; margin-top: 4rem; height: 13vh; opacity: 0.99;" src="../../assets/Icons8_Login_240.png">
    
            <p style="text-align: left; padding: 0px 22px 0px; margin-top: 1rem; margin-bottom: 0;  align-items: flex-start; min-width: 100%; font-size: 34px; font-weight: 600;">Почти готово</p>
            <p style="text-align: left; padding: 0px 22px 0px; padding-top: 2%; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 18px; font-weight: 200;">После входа Вы сможете проходить викторины, зарабатывать баллы и обменивать их на призы!</p>
    
            <!-----<ion-input class="input-style" placeholder="Электронный адрес"></ion-input> 
            <ion-button @click="authenticateWithGoogle" color="danger" style="margin-right: 5%; margin-left: 35%; margin-top: 6%; --opacity: 0.7;" expand="block">
                <ion-icon class="send-button" slot="end" :icon="arrowForwardOutline"></ion-icon>
                Продолжить
            </ion-button>--->
            <ion-button @click="authenticateWithGoogle" class="button-common-style" style="margin-right: 5%; margin-left: 5%; margin-top: 6%; --opacity: 0.7;" expand="block">
                <ion-icon class="send-button" slot="end" :icon="logoGoogle"></ion-icon>
                Войти с Google
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
    </template>
    <style scoped>
    .hr-line{
        margin-right: 7%; margin-left: 7%; background-color: white; margin-top: 7%; opacity: 0.3;
    }
    .input-style {
        margin-top: 14%;
        margin-left: 5%;
        width: 90%;
        line-height: 2.3;
        --background: #f8f8f834;
        --padding-start: 13px;
        border-radius: 8px;
    }
    .send-button {
        --opacity: 0.7;
    }
    .button-common-style{
        opacity: 0.99;
        --background: linear-gradient(134.98deg, rgba(10, 135, 177, 0.8) 0%, rgba(94, 103, 199, 0.795) );
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
        IonLabel
    } from '@ionic/vue';
    import {
        arrowForwardOutline,
        mailOutline,
        logoGoogle,
        chatbubbleOutline
    } from 'ionicons/icons';
    import {
        GoogleAuth
    } from '@codetrix-studio/capacitor-google-auth';
    import axios from 'axios'
    import globaldata from '../../modules/global';
    export default defineComponent({
        name: 'Tab1Page',
        components: {
            IonContent,
            IonPage,
            // eslint-disable-next-line
            IonInput,
            IonButton,
            IonIcon,
            IonModal,
            IonLabel
        },
        data () {
            return {
                message_modal_isOpen: false,
                message_modal_text: "ModalText"
            }
        },
        mounted () {
            const tabsEl = document.querySelector('ion-tab-bar');
            if (tabsEl) {
                tabsEl.hidden = true;
                tabsEl.style.height = "1";
            }
            
            GoogleAuth.initialize({
                clientId: '33960040607-coalo6hl8cscmu8mngtb3rf6jgnibr5q.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
                grantOfflineAccess: true,
            });
        },
        setup() {
            return {
                arrowForwardOutline,
                logoGoogle,
                mailOutline,
                chatbubbleOutline
            }
        },
        methods: {
            async Modal_onWillDismiss(){
                this.message_modal_isOpen = false;
            },
            async authenticateWithGoogle(){
                const userResponse = await GoogleAuth.signIn()
                        var accessToken = userResponse.authentication.accessToken;
                        var idToken = userResponse.authentication.idToken;
                        // eslint-disable-next-line
                        const parent_this = this;
                        axios.get(globaldata.api.hostname + "login", { params:
                                {accessToken: accessToken, idToken: idToken }
                            }).then((response) => {
                                if(response.data != "failure"){
                                    localStorage.setItem("auth_token", response.data.password)
                                    localStorage.setItem("userid", response.data.id)
                                    this.$router.push({path:'/tabs/home', replace: true, query: { auth_token: response.data.auth_token, auth_userid:response.data.userid }});
                                    //this.message_modal_text = `Выполнен вход.`
                                    //this.message_modal_isOpen = true;
                                }else {
                                    this.message_modal_text = `Произошла ошибка при входе с помощью учетной записи Google. Попробуйте еще раз или воспользуйтесь другим способом входа.\n\nСведения: ` + JSON.stringify(response)
                                    this.message_modal_isOpen = true;
                                }
                            }).catch(function(error){
                                localStorage.setItem("auth_token", "response.data.password")
                                    localStorage.setItem("userid", "1")
                                    parent_this.$router.push({path:'/tabs/home', replace: true});
                                    //parent_this.message_modal_text = `Сервер временно недоступен.\n\nСведения: ` + error
                                    //parent_this.message_modal_isOpen = true;
                            });
                        // add the code for the functionality your need
            }
                
        }
    })
    </script>