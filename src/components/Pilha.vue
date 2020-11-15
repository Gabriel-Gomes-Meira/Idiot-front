<template>
    <div id="pilha">
        <div  v-for="(card, index) in cards" :key="index" @click="InteractPilha" id="baralho">
            <div id="card">
                <img class="custom_border" id="card_img" :src="'http://localhost:8000/' + card.image" alt="">
            </div>
        </div>
    </div>
    
</template>

<script>
export default {

    props:{
        cards:[]
    },
    methods:{
        InteractPilha() {
            this.$emit('InteractPilha', this.cards[this.cards.length-1])
            this.cards.splice(this.cards.length-1, 1)
        }
    }
            

}
</script>