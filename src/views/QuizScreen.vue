<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <div style="max-height: 40vh;"> 
            <flow-form
          ref="flowform"
          v-on:complete="onComplete"
          v-bind:language="language"
          v-bind:progressbar="false"
          v-bind:standalone="true"
        >
          <question 
            v-for="(question, index) in questions" 
            v-bind="question" 
            v-bind:key="'m' + index" 
            v-model="question.model"
          >
          </question>
          
          <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
          <template v-slot:complete>
            <div class="f-section-wrap">
              <div v-if="1<2">
                <div v-if="loading">
                  <span class="fh2">Проверяем ваши ответы</span>
                </div>
                <div v-else>
                  <Vue3Lottie :animationData="QuizElement_01" style="height: 25vh; margin-left: -18vw;" />
                  <span class="fh2" style="margin-top: 5vh; margin-left: 1vw; ">Вы заработали 2 балла! </span>
                </div>
              </div>
            </div>  
          </template>
          <!-- We've overriden the default "complete" slot content -->
          <template v-slot:completeButton>
            <div class="f-submit">
              <!-- Leave empty to hide default submit button -->
            </div>
          </template>
        </flow-form>
        </div>
      </ion-content>
    </ion-page>
  </template>

<style scoped>
  rion-content{
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.121) 10%, rgba(2, 156, 12, 0.714)), url('https://images.unsplash.com/photo-1586078074298-05dca4848695?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80') !important;
    background-position: 100%;
    background-size: cover !important;
  }
  .vff ul.f-radios li {
    border-radius: 20px !important;
  }
</style>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonContent } from '@ionic/vue';
  import { FlowForm, Question, QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form'

  import axios from 'axios'
  import globaldata from '../modules/global';

  import QuizElement_01 from '../assets/juicy-girl-typing-on-phone.json'

  import { Vue3Lottie } from 'vue3-lottie'
  import 'vue3-lottie/dist/style.css'
  
  interface Question {
    type: string;
    id: string;
    tagline: string;
    title: string;
    multiple: boolean;
    required: boolean;
    helpTextShow: boolean;
    model: string;
    options: object
    }

  export default  defineComponent({
    name: 'Tab1Page',
    components: { IonContent, IonPage, FlowForm, Question, Vue3Lottie },
    data() {
      return {
        finalScore: 0,
        QuizElement_01,
        loading: false,
        completed: false,
        language: new LanguageModel({
          pressEnter: "",
          continue: "дальше"
        }),
        questions: [{
            type: 'sectionbreak',
            id: 'review',
            tagline: 'Попробуйте ответить на как можно больше вопросов, чтобы получить как можно больше баллов.',
            title: 'Начнем?',
            multiple: false,
            required: true,
            helpTextShow: false,
            model: '',
            options: [

            ],
          }] as Question[]
      }
    },
    methods: {
      /* eslint-disable-next-line no-unused-vars */
      onComplete(completed, questionList) {
        // This method is called whenever the "completed" status is changed.
        this.completed = completed
        // Set `submitted` to true so the form knows not to allow back/forward
        // navigation anymore.
        //!!! this.$refs.flowform.submitted = true
        this.onSendData()

        axios.post(globaldata.api.hostname + "users/" + localStorage.getItem("userid") + "/plusscores/2", { params:
                                {accessToken: "", idToken: "" }
                            }).then((response) => {
                                //here...
                            }).catch(function(error){
                                console.log("error happened during request, ", error)
                });
      },
      
      onSendData() {
        // eslint-disable-next-line
        const self = this
        const data = this.getData()
        this.loading = true
        
        /*
          You can use Fetch API to send the data to your server, eg.:
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        */
        setTimeout(() => {
          self.loading = false
        }, 1500)
      },
      getData() {
        var data = {
          questions: [],
          answers: []
        }
    
        this.questions.forEach(question => {
          switch (question.model) {
            case "almost_always":
              this.finalScore += 2;
              break;
            case "sometimes":
              this.finalScore += 1;
              break;
            case "very_seldom":
              this.finalScore += 0;
              break;
            default:
              //nothing!
              break;
          }
          if (question.title) {
            let answer = question.model
            if (Array.isArray(answer)) {
              answer = answer.join(', ')
            }
            // eslint-disable-next-line
            //data.questions.push(question.title)
            // eslint-disable-next-line
            //data.answers.push(answer)
          }
        })
        localStorage.setItem("stats_emotionalstate_atleast_once", "true")
    
        return data
      },
    },
    mounted() {
        // eslint-disable-next-line
        const parent_this = this

        var quiz_id = this.$route.query.quiz_id

        axios.get(globaldata.api.hostname + "questions/" + quiz_id, { params:
                                {accessToken: "", idToken: "" }
                            }).then((response) => {
                                const a = response.data
                                for (var i = 0; i < a.length; i++){
                                    console.log(a[i])
                                    this.questions.push({
                                        type: 'multiplechoice',
                                        id: 'id' + a[i].id,
                                        tagline: 'Ответьте на этот вопрос',
                                        title: a[i].question,
                                        multiple: false,
                                        required: true,
                                        helpTextShow: false,
                                        model: '',
                                            options: [{
                                            label: a[i].variant1,
                                            value: 'a'
                                        },
                                        {
                                            label: a[i].variant2,
                                            value: 'b'
                                        },
                                        {
                                            label: a[i].variant3,
                                            value: 'c'
                                        },
                                    ]
                                    })
                                }
                            }).catch(function(error){
                                console.log("error happened during request, ", error)
                            });
        console.log("test")
        console.log(this.questions)
    }
  });
  </script>
 
<style>
/* Import Vue Flow Form base CSS */
@import '@ditdot-dev/vue-flow-form/dist/vue-flow-form.css';
/* Import one of the Vue Flow Form CSS themes (optional) */
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css'; */
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-green.css'; */
@import '../assets/quiz-flow.css';
</style>
  