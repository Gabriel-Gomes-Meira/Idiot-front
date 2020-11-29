<template >

    <v-container style="heigth:1000px">
        
        <v-row
        :align-content="alignments[0]"
        :justify="alignments[0]">
        <v-spacer></v-spacer>
            <v-col
            cols="12"
            lg="6"
            >
                <hand v-if="cardshand.length>0" 
                @InteractHand="giveCardpilha" 
                :cards="cardshand" 
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
                <deck @InteractMain="takeCard"></deck>
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
                <hand v-if="cardshand.length>0"
                :cards="cardshand"
                @InteractHand="giveCardpilha"
                :player="1"></hand>
            </v-col>
        <v-spacer></v-spacer>
        </v-row>
    </v-container>
    

</template>

<script>

import Pilha from '../components/Pilha';
import Deck from '../components/Deck.vue';
import Hand from '../components/Hand.vue';

import io from "socket.io-client"

export default {

    components:{
        Deck,
        Pilha,
        Hand
    },

    data(){
        return{
            cardspilha:[],
            cardshand:[],
            alignments:['center', 'space-around', 'center','end']
        }
    },

    mounted(){
        this.teste();
        this.socket.on("receive-mensage", data =>{
            console.log(data);
        })
    },
    
    created(){
        this.socket = io.connect('http://localhost:3000');
        this.socket.emit('new-user-conect', this.$store.state.user.user)
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