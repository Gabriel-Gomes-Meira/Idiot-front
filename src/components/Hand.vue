<template>

    <div >
        <div class="linha_mao" id="hand">
            <div  v-for="(card, index) in cards" :key="index" @click="InteractHand">
                <div id="card" >
                    <img class="custom_border" id="card_img" :src="'http://localhost:8000/' + card.image" alt="">
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    updated(){
        this.moldar(this.handcards.length);
    },

    props:{
        cards:[],
        player:Number
    },

    data(){
        return{
            handcards:this.cards,
            playern:this.player
        }
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
        
        InteractHand() {
            this.$emit('InteractHand', this.cards[this.handcards.length-1])
            this.handcards.splice(this.handcards.length-1, 1)
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