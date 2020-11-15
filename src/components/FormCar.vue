<template>
    <div>

        <div class="container">
            <div class="row justify-content-center align-items-center w-100">
                <v-col
                cols="12"
                md="6"
                lg="6"
                >
                    <form v-on:submit.prevent="addCard(NewCard)">
                        <div class="md-6">
                            <input type="text" class="form-control" name="name" id="name" placeholder="Digite o nome da Carta" v-model="NewCard.name">
                        </div>
                        <div class="md-6">
                            <input type="valor" class="form-control" name="valor" id="valor" placeholder="Digite o valor do card" v-model="NewCard.valor">
                        </div>
                        <div class="md-6">
                            <input type="file" class="form-control" name="image" id="image" @change="imageChanged">
                        </div>
                        <div class="md-6">
                            <button type="submit" class="btn btn-success"> Add Card</button>
                        </div>
                    </form>
                </v-col>
            </div>

            <v-row>
                <div v-for="(card, index) in cards" :key="index" >
                    <div id="card" >
                        <img class="custom_border" id="card_img" :src="'http://localhost:8000/' + card.image" alt="">
                    </div>
                </div>
            </v-row>

        </div>

    </div>
</template>

<script>
import axios from 'axios'
const server = "http://localhost:8000/api/baralho/card";
export default {
    created(){
        this.getDeck();
    },
    data(){
        return{
            cards:[],
            NewCard:{name:'',valor:0,image:''}
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

        imageChanged(e) {

            var fileReader = new FileReader()

            fileReader.readAsDataURL(e.target.files[0])

            fileReader.onload = (e) => {
                this.NewCard.image = e.target.result
            }

        },
        async addCard(data) {

            if (!data.name) {
                alert('Informe o nome');
            } else if (!data.valor) {
                alert('Informe o valor');
            } else {

                let results = await axios.post(`${server}`, data);

                this.cards.push({
                    name: results.data.name,
                    valor: results.data.valor,
                    image: results.data.image,
                });

            }

        }       
    }
}
</script>

<style>

</style>