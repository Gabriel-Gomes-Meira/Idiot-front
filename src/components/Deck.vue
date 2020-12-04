<template >
    <div v-if="showable">
        <div id="deck">
            <div v-for="(card, index) in cards" :key="index" id="baralho" @click="InteractMain">
                <div id="card" >
                    <img class="custom_border" id="card_img" :src="'http://localhost:8000/' + card.image" alt="">
                </div>
            </div>
        </div>        
    </div>

</template>

<script>
    
    export default {

        mounted(){
            this.showable = true;
        },

        data(){
            return{
                cards:this.deck,
                showable:false
            }
        },

        props:{
            deck:[]
        },

        methods:{

            InteractMain() {
                this.$emit('InteractMain', this.cards[this.cards.length-1])
                this.cards.splice(this.cards.length-1, 1) 
            }

        }
    }
</script>

