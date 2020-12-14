<template >
    <div class="vld-parent">
        <loading :active="!ready" 
        :is-full-page="false"></loading>
        <v-container style="heigth:1000px">
            
            <poste
            :cardR="cardsrev2"
            :cardS="cardsets2"
            >
            </poste>

            <v-row
            :align-content="alignments[0]"
            :justify="alignments[0]">
            <v-spacer></v-spacer>
                <v-col
                cols="12"
                lg="6"
                >
                    <hand v-if="playerHand2.length>0 && ready" 
                    :cards="playerHand2" 
                    ></hand>
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
                    :playable="playable"
                    @InteractMain="takeCard"></deck>
                </v-col>

                <v-spacer></v-spacer>

                <v-col
                cols="12"
                lg="3"
                >
                    <pilha @InteractPilha="takeCardsPilha"
                    v-if="cardspilha.length>0"
                    :cards="cardspilha"
                    :playable="playable"></pilha>
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
                    :playable="playable"
                    ></hand>
                </v-col>
            <v-spacer></v-spacer>
            </v-row>

            <poste
            :cardR="cardsrevel"
            :cardS="cardsets"
            :playable="playable"
            @InteractRevel="PlayRCard"
            @InteractSet="PlaySCard"
            >
            </poste>
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
            alignments:['center', 'space-around', 'center','end'],
            ready:false,
            playable:false
        }
    },

    props:{
        socket:{}
    },

    mounted(){
        
        this.socket.on("exited-room", (msg) =>{
            alert(msg);
            this.$emit('disconectRoom');
        })
        
        this.socket.emit('conect-room',
                this.$store.state.atualRoom)

        this.socket.on("receive-mensage", data =>{
            console.log(data);
        })

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
            this.cardsrevel = [...data[0]];
            this.cardsrev2 = [...data[1]];
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

        PlayRCard(card){ 
            // this.socket.emit('giverevtopilha', card);
            this.cardspilha.push(card);
        },

        PlaySCard(index){ 
            this.socket.emit('givesettopilha', [index,
                            this.$store.state.user.user.id,
                            this.$store.state.atualRoom.id])
        },

        preenchendodevazio(more, arraye){
            if(more != 0){
                arraye.push("card");
                more = more-1;
                this.preenchendodevazio(more, arraye)
            }

            return arraye;
        }

    }
    
}
</script>

<style>

    #card
    {
        
        width: 100px!important;
        
    }

    #card_img
    {
        max-width: 100%;
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

    #deck, #pilha, #poste {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 0px;   
    }

    #poste {
        position: fixed;
    }

    #card {      position: relative;     }

</style>