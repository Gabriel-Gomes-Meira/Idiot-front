<template>

        <div class="linha_mao" id="hand">
            <div  v-for="(card, index) in cards" :key="index">
                <div id="card">
                    <img v-if="card!=='card'" @click="InteractHand(index)" class="custom_border" id="card_img" :src="'http://localhost:8000/storage/cards/' + card.image" alt="">
                    <img v-else class="custom_border" id="card_img" src="http://localhost:8000/card_back.png" alt="">
                </div>
            </div>
        </div>
    
</template>

<script>
export default {
    updated(){
        this.moldar(this.cards.length);
    },

    props:{
        cards:[],
        playable:Boolean
    },

    methods:{
        moldar(length){
            var linha_mao = document.querySelectorAll('.linha_mao');
            var gac =  100 / ( (length-1) / 2);  
            var stilo = "grid-auto-columns: "+gac+"px;";
            if(length>3){
                linha_mao[this.playern].setAttribute("style",stilo);
            }
        },
        
        InteractHand(index) {
            if(this.playable === true){
                this.$emit('InteractHand', index)
            }
        }
    }
}
</script>

<style>

    #hand{
        width:300px!important;
        
    }
    .linha_mao{
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 100px;
    }

    
</style>