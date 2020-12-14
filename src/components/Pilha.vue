<template>
    <div id="pilha">
        <div  v-for="(card, index) in cards" :key="index" @click="InteractPilha" >
            <div id="card">
                <img class="custom_border" id="card_img" :src="'http://localhost:8000/storage/cards/' + card.image" alt="">
            </div>
        </div>
    </div>
    
</template>

<script>
export default {

    props:{
        cards:[],
        playable:Boolean
    },
    methods:{
        InteractPilha() {
            if(this.playable === true){
                this.$emit('InteractPilha')
            }
        }
    }
            

}
</script>