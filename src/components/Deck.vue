<template >
    
    <div v-if="showable == true">  
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
    import axios from 'axios'
    
    export default {
        beforeUpdate(){
            this.Shuffle()
        },

        mounted(){
            this.getDeck();
            setTimeout(this.Becomeshowable,1000)
        },

        data(){
            return{
                cards:[],
                showable:false
            }
        },

        methods:{
            getDeck(){
                axios.get('http://localhost:8000/api/baralho').then(Response=>{
                    console.log(Response.data.cards);
                    this.cards = Response.data.cards
                })
                .catch(error=>{
                    console.log(error.Response.data.message)
                })
            },

            Shuffle() {
                var m = this.cards.length, t, i;

                // While there remain elements to shuffle…
                while (0 !== m) {

                    // Pick a remaining element…
                    i = Math.floor(Math.random() * m--);

                    // And swap it with the current element.
                    t = this.cards[m];
                    this.cards[m] = this.cards[i];
                    this.cards[i] = t;
                    
                }
                // alert();
                //this.showable = true;
            },

            InteractMain() {
                this.$emit('InteractMain', this.cards[this.cards.length-1])
                this.cards.splice(this.cards.length-1, 1) 
            },

            Becomeshowable(){
                this.showable = true;
            }
        }
    }
</script>

