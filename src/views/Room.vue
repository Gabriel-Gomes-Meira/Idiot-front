<template >
    <div class="vld-parent">
        <loading :active.sync="ready" 
        :is-full-page="false"></loading>
        <v-container style="heigth:1000px">

            <v-row
            :align-content="alignments[0]"
            :justify="alignments[0]">
            <v-spacer></v-spacer>
                <v-col
                cols="12"
                lg="6"
                >
                    <hand v-show="player1Hand.length>0" 
                    @InteractHand="giveCardpilha" 
                    :cards="player1Hand" 
                    :player="0"></hand>
                </v-col>
            <v-spacer></v-spacer>
            </v-row>

            <v-row
            :align-content="alignments[1]"
            :justify="alignments[1]">
                <v-col
                cols="12"
                lg="3"
                >
                    <deck v-if="ready"
                    :deck="deck"
                    @InteractMain="takeCard"></deck>
                </v-col>

                <v-spacer></v-spacer>

                <v-col
                cols="12"
                lg="3"
                >
                    <pilha @InteractPilha="takeCardsPilha"
                    v-if="cardspilha.length>0"
                    :cards="cardspilha"></pilha>
                </v-col>

                <v-spacer></v-spacer>
            </v-row>

            <v-row
            :align-content="alignments[2]"
            :justify="alignments[2]"
            > 
            <v-spacer></v-spacer>
                <v-col
                cols="12"
                lg="6"
                >
                    <hand v-show="player2Hand.length>0"
                    :cards="player2Hand"
                    @InteractHand="giveCardpilha"
                    :player="1"></hand>
                </v-col>
            <v-spacer></v-spacer>
            </v-row>
        </v-container>
    </div>
    

</template>

<script>

import Pilha from '../components/Pilha';
import Deck from '../components/Deck.vue';
import Hand from '../components/Hand.vue';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import io from "socket.io-client"

export default {

    components:{
        Deck,
        Pilha,
        Hand,
        Loading
    },

    data(){
        return{
            deck:[],
            cardspilha:[],
            player1Hand:[],
            player2Hand:[],
            alignments:['center', 'space-around', 'center','end'],
            ready:false,
            socket:{}
        }
    },

    mounted(){
        this.socket.emit('new-user-conect', 
                this.$store.state.user.user, 
                this.$store.state.atualRoom)
        this.teste();
        this.socket.on("receive-mensage", data =>{
            console.log(data);
        })
        this.socket.on("shuffled", data =>{
            console.log(data);
            this.deck = data;
            this.ready = true;
        })
        this.socket.on("distribuided-hand1", data =>{
            this.player1Hand = data
        })
        this.socket.on("distribuided-hand2", data =>{
            this.player2Hand = data
        })
    },
    
    created(){
        this.socket = io.connect('http://localhost:3000');
    },

    beforeDestroy(){
        this.socket.on('disconnected', function() {
            console.log('disconnected')
        });
    },


    methods:{

        takeCard(card){
            this.cardshand.push(card)
        },

        giveCardpilha(card){
            this.cardspilha.push(card);
            this.$store.dispatch('gameout')
        },

        takeCardsPilha(card){
            this.cardshand.push(card);
        },

        teste(){
            this.socket.emit('send-mensage', "Mensagem do outro lado");
        }

    }
    
}
</script>

<style>

    /* @media screen and (max-width: 1138px) {

        #deck
        {
            margin-left: 5%!important;
            margin-top:30%!important;  
        }

        #pilha
        {
            margin-left: 5%!important;
            margin-top:45%!important;  
        }
    }

    #Room{
        position: relative;
    }

    #deck
    {
        margin-left: 10%;
        margin-top:20%;  
    }

    #pilha
    {
        margin-left: 25%;
        margin-top:20%;  
    } */

    
    #card
    {
        
        width: 100px!important;
        
    }

    #card_img
    {
        max-width: 100%;
        /* height: 405px; */
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

</style>