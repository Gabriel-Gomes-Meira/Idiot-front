<template >
    <div v-if="showable">
        <div id="deck">
            <div v-for="(card, index) in cards" :key="index" id="baralho" @click="InteractMain">
                <div id="card" >
                    <img class="custom_border" id="card_img" src="http://localhost:8000/card_back.png" alt="">
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
            deck:[],
            playable:Boolean
        },

        methods:{

            InteractMain() {
                if(this.playable === true){
                    this.$emit('InteractMain')
                }
            }

        }
    }
</script>

