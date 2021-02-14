<template >

    <div class="vld-parent">
        <loading :active="!ready" 
        :is-full-page="false"></loading>
        <v-container style="heigth:1000px">

            <div id="mesa">
                <div id="hand2">
                    <hand v-if="playerHand2.length>0 && ready" 
                    :cards="playerHand2" 
                    ></hand>
                </div>


                <div id="poste2">
                    <poste
                    :cardR="cardsrev2"
                    :cardS="cardsets2"
                    ></poste>
                </div>

                
                <div id="pdeck">
                    <deck v-if="ready"
                    :deck="deck"
                    :playable="playable"
                    @InteractMain="takeCard"></deck>
                </div>

                
                <div id="ppilha">
                    <pilha @InteractPilha="takeCardsPilha"
                    v-if="cardspilha.length>0"
                    :cards="cardspilha"
                    :playable="playable"></pilha>
                </div>

                
                <div id="poste1">
                    <poste
                    :cardR="cardsrevel"
                    :cardS="cardsets"
                    :playable="playable"
                    @InteractRevel="PlayRCard"
                    @InteractSet="PlaySCard"
                    ></poste>
                </div>

                
                <div id="hand1">
                    <hand v-if="cardshand.length>0"
                    :cards="cardshand"
                    @InteractHand="giveCardpilha"
                    :playable="playable"
                    ></hand>
                </div> 
            </div>
        </v-container>
    </div>

</template>

<script>

import Pilha from '../components/Pilha';
import Deck from '../components/Deck.vue';
import Hand from '../components/Hand.vue';
import Poste from '../components/Poste.vue';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {

    components:{
        Deck,
        Pilha,
        Hand,
        Loading,
        Poste
    },

    data(){
        return{
            deck:[],
            cardspilha:[],
            cardshand:[],
            playerHand2:[],
            cardsrevel:[],
            cardsrev2:[],
            cardsets:[],
            cardsets2:[],
            ready:false,
            playable:true
        }
    },

    props:{
        socket:{}
    },

    mounted(){
        
        this.socket.on("exited-room", (msg) =>{
            console.log(msg);
            this.$emit('disconectRoom');
        })
        
        this.socket.emit('conect-room',
                this.$store.state.atualRoom)

        this.socket.on("shuffled", data =>{
            var deckescondido = this.preenchendodevazio(data, this.deck)
            this.deck = [...deckescondido];
            this.ready = true;
        })

        this.socket.on("distribuided-hand", data =>{
            this.cardshand = [...data[0]];
            var maodop2 = this.preenchendodevazio(data[1], this.playerHand2)
            this.playerHand2 = [...maodop2];
        })

        this.socket.on("distribuided-revel", data =>{
            this.cardsrevel = data[0].slice();
            this.cardsrev2 = data[1].slice();
        })

        this.socket.on("distribuided-set", data =>{
            var sets = this.preenchendodevazio(data[0], this.cardsets);
            this.cardsets = [...sets];

            sets = this.preenchendodevazio(data[1], this.cardsets2);
            this.cardsets2 = [...sets]
        })

        this.socket.on("receive-setcard", data =>{
            this.cardsets[data[0]] = data[1];
            this.cardspilha.push(this.cardsets[data[0]]);
        })

        this.socket.on("see-setopca", card =>{
            this.cardspilha.push(card);
        })

        this.socket.on("see-pilha", data =>{
            console.log(data);
            this.cardspilha = data;
        })
    },

    beforeDestroy(){
        this.socket.emit('disconnect');
    },


    methods:{

        takeCard(){
            this.deck.pop(1,1)
            this.$emit('disconectRoom');
        },
        
        giveCardpilha(index){
            this.cardspilha.push(this.cardshand[index]);
            this.cardshand.splice(index, 1);
        },

        takeCardsPilha(){
            this.cardshand = this.cardshand.concat(this.cardspilha.slice());
            this.cardspilha = [];
        },

        PlayRCard(index){ 
            this.socket.emit('giverevtopilha', [this.cardsrevel[index],
                                                this.$store.state.atualRoom.id]);
            this.cardsrevel[index] = 'card';
        },

        PlaySCard(index){ 
            this.socket.emit('givesettopilha', [index,
                            this.$store.state.user.user.id,
                            this.$store.state.atualRoom.id])
        },

        preenchendodevazio(more, arraye){
            if(more != 0){
                arraye.push("card");
                this.preenchendodevazio(more-1, arraye)
            }

            return arraye;
        }

    }
    
}
</script>

<style>

    #card{      width: 100px!important;     }
    
    #facedown{  height: 150px!important;    }
    
    #card_img
    {
        max-width: 100%;
        object-fit:contain;
    }
    
    #facedown_img
    {
        max-height: 100%;
        object-fit:contain;
    }

    .custom_border
    {
        background-color: white;
        border:black solid;
        border-width: 3px;
        border-top-left-radius: 18px;
        border-top-right-radius: 20px;
        border-bottom-left-radius: 18px;
        border-bottom-right-radius: 18px;
    }

    #deck, #pilha {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 0px;   
    }

    #card {      position: relative;     }

    #mesa{
        display: grid;
        width:100%;
        /* grid-auto-flow: column; */
        grid-template-rows: repeat(4,10%) repeat(2, 5%) repeat(5,10%);
        grid-template-columns: 1fr 1fr 1fr 2fr 1fr 1fr 1fr;
        grid-template-areas:"poste2 .   .  hand2  .   .   .   " 
                            "poste2 .   .  hand2  .   .   .   "
                            "poste2 .   .    .    .   .   .   "
                            "poste2 .   .    .    .   .   .   "
                            "poste2 . deck   .  pilha .   .   "
                            "  .    . deck   .  pilha . poste1"
                            "  .    . deck   .  pilha . poste1"
                            "  .    . deck   .  pilha . poste1"
                            "  .    .   .  hand1  .   . poste1"
                            "  .    .   .  hand1  .   . poste1"
                            "  .    .   .  hand1  .   . poste1";
    }

    #hand2{     grid-area: hand2;       }
    #poste2{    grid-area: poste2;      }
    #pdeck{     grid-area: deck;        }
    #ppilha{    grid-area: pilha;       }
    #poste1{    grid-area: poste1;      }
    #hand1{     grid-area: hand1;       }

    #poste1 #poste {    flex-flow: row-reverse; }

    /* 768px */
    @media (max-width: 768px){
        #mesa{
            grid-template-rows: 35% 30% 35%;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-template-areas:"poste2  .   hand2 hand2 hand2   .   .   .   "
                                "  .     .   deck    .   pilha   .   .   .   "
                                "hand1 hand1 hand1   .     .     .   . poste1";
        }
    }

</style>