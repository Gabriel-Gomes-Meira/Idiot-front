<template>

    <div>

        <div class="container-fluid" v-if="!isLogged">
            <div class="row align-items-center justify-content-center" style="height: 90vh;">
                <v-card lg="12" >
                <v-card-text>
                <form v-on:submit.prevent="addUser(NewUser)" v-if="!isLogged">
                    <v-col cols="12" sm="9" md="9" lg="12">
                        <v-text-field  
                        id="name"
                        name="name"
                        label="Nome"
                        :rules="nameRules"
                        required
                        v-model="NewUser.name">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="9" md="9" lg="12">
                        <v-text-field  
                        name="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        v-model="NewUser.email">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="9" md="9" lg="12">
                        <v-text-field  
                        id="password" :value="password"
                        v-model="NewUser.password"
                        :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showpass ? 'text' : 'password'"
                        placeholder="Digite a Senha"
                        required
                        @click:append="showpass = !showpass">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="9" md="9" lg="12">
                        <v-text-field 
                        v-model="confirmpass"
                        :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showpass ? 'text' : 'password'"
                        placeholder="Digite a Senha"
                        @click:append="showpass = !showpass">
                        </v-text-field>
                    </v-col>
                    <div class="">
                        <button type="submit" class="btn btn-success btn-block text-light"> Registrar</button>
                    </div>
                </form>
                </v-card-text>
                </v-card>
            </div>        
        </div>

        <home v-else></home>

    </div>
        
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
const server = "http://localhost:8000/api/users/add";
import Home from './Home.vue';

export default {
    components:{
        Home
    },

    computed: {
    ...mapGetters([
      'isLogged'
    ])},
    
    data(){
        return{
            NewUser:{name:'',email:'',password:''},
            confirmpass:'',
            showpass:false,
            nameRules: [
            v => !!v || 'Name é necessário'
            ],
            emailRules: [
                v => !!v || 'E-mail é necessário',
                v => /.+@.+/.test(v) || 'E-mail deve ser válido',
            ]
        }
    },
    methods:{
        async addUser(data) {

            if (!data.name) {
                alert('Informe o nome');
            } else if (!data.email) {
                alert('Informe o email');
            } else if (!data.password || this.confirmpass != data.password) {
                alert('Verifique a senha!');
            } else {

                await axios.post(`${server}`, data)
                this.LoginUser();
            }
        },

        LoginUser()
        {
            this.$store.dispatch('login', {
            email: this.NewUser.email,
            password: this.NewUser.password
            })
            .then(() => {
            this.$router.push({ name: 'Userenv' })
            })
            .catch(err => {
            console.log(err)
            })
        }
    }
}
</script>

<style>
    body{
        overflow: hidden;
        background-color: aquamarine;
    }
</style>
