<template >

    <v-row>
        <v-col
        cols="12"
        lg="12"
        :align-self="alignments[0]">
            <hand v-if="cardshand.length>0" 
            @InteractHand="giveCardpilha" 
            :cards="cardshand" 
            :player="0"></hand>
            <!-- style="margin-top: 5%!important;
            margin-left:30%!important;" -->
        </v-col>

        <v-col
        cols="12"
        lg="3"
        :align-self="alignments[1]">
            <deck @InteractMain="takeCard"></deck>
        </v-col>

        <v-col
        cols="12"
        lg="3"
        :align-self="alignments[2]">
            <pilha @InteractPilha="takeCardsPilha"
            v-if="cardspilha.length>0"
            :cards="cardspilha"></pilha>
        </v-col>
        
        <v-col
        cols="12"
        lg="12"
        :align-self="alignments[3]">
            <hand v-if="cardshand.length>0"
            :cards="cardshand"
            @InteractHand="giveCardpilha"
            :player="1"></hand>
            <!-- style="margin-top: 40%;
            margin-left:30%;"  -->
        </v-col>

    </v-row>

</template>

<script>

import Pilha from '../components/Pilha';
import Deck from '../components/Deck.vue';
import Hand from '../components/Hand.vue';


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
            alignments:['center', 'start', 'end', 'center']
        }
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

    body
    {
    background-color: #00a000; 
    }
    
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

    #baralho, #deck, #pilha, #hand {       position: absolute;    }

    #card {      position: relative;     }

</style>