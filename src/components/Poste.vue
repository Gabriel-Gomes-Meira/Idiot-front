<template>

    <div id="pre-poste">
        <div id="poste" v-for="(card, index) in cardS" :key="index">
            <div id="facedown" @click="InteractSet(index)" v-if="card=='card'">
                <img class="custom_border" id="facedown_img" src="http://localhost:8000/card_back.png" alt="">
            </div>

            <v-spacer v-else></v-spacer>
            
            <div id="card" @click="InteractRevel(index)">
                <img class="custom_border" id="card_img" :src="'http://localhost:8000/storage/cards/' + cardR[index].image" alt="">
            </div>  
        </div>
    </div>
    
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

<style>
    #poste #card {      width: 70px!important;      }

    #poste #facedown {  height: 103px!important;    }

    #pre-poste {
        display: grid;
        grid-auto-flow: row;
        /* grid-auto-columns: 70px;  */
        grid-auto-rows: 108px;
        
    }

    #poste .custom_border{
        border-width: 2px;
        border-top-left-radius: 10px;
        border-top-right-radius: 12px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    #poste {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 70px;   
    }

    @media (max-width: 768px){
        #poste #card {      width: 50px!important;      }

        #poste #facedown {  height: 73px!important;    }

        #pre-poste {
            display: grid;
            grid-auto-flow: row;
            /* grid-auto-columns: 70px;  */
            grid-auto-rows: 75px;
            
        }

        #poste .custom_border{
            border-width: 2px;
            border-top-left-radius: 6px;
            border-top-right-radius: 8px;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
        }

        #poste {
            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: 54px;   
        }
    }

</style>