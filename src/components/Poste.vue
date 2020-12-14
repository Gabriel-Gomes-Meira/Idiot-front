<template>

    <v-row>
        <v-col id="poste" v-for="(card, index) in cardS" :key="index"
        cols="12"
        sm="3"
        md="3"
        lg="3">
            <div id="card" @click="InteractSet(index)" v-if="card=='card'">
                <img class="custom_border" id="card_img" src="http://localhost:8000/card_back.png" alt="">
            </div>

            <v-spacer v-else></v-spacer>
            
            <div id="card" @click="InteractRevel(index)">
                <img class="custom_border" id="card_img" :src="'http://localhost:8000/' + cardR[index].image" alt="">
            </div>  
        </v-col>
    </v-row>
    
</template>

<script>
export default {
    
    props:{
        cardR:[],
        cardS:[],
        playable:Boolean
    },

    methods:{
        InteractRevel(ind) {
            if(this.playable === true){
                this.$emit('InteractRevel', this.cardR[ind]);
                this.cardR.splice(ind, 1);
            }
        },

        InteractSet(ind){
            if(this.playable === true){
                this.$emit('InteractSet', ind);
            }
        }

    }

}
</script>