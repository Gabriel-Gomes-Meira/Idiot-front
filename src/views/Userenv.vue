<template>
    
    <v-card 
    class="mx-auto overflow-hidden"
    height="800"
    id="card-main-color"
    color="red-darken-1"
    >
        <v-app-bar
        id="app-bar-color"
        >
            <v-app-bar-nav-icon @click="drawer = true" ></v-app-bar-nav-icon>

            <v-toolbar-title><span style="color:#E57373;font-weight:bolder;"> Idiot - Online</span></v-toolbar-title>

        </v-app-bar>

        <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        id="nav-color"
        v-if="!this.$store.state.gaming"
        >
            <v-list
                nav
                dense  
            >

            
                <v-list-item-group>
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title
                                class="d-flex justify-content-center">
                                    <v-icon
                                    size="72">
                                        mdi-account
                                    </v-icon>
                            </v-list-item-title>
                            <v-list-item-subtitle
                            class="d-flex justify-content-center">
                                {{ this.$store.state.user.user.name }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>

                <br>

                <v-list-item-group
                v-model="group"
                id="list-item-group-color"
                >
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-book-open-blank-variant</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title
                        class="d-flex justify-content-center"> Salas Abertas</v-list-item-title>   
                        <v-icon :right='true'>mdi-monitor-eye</v-icon>
                    </v-list-item>
                    <br>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-chess-rook</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title
                        class="d-flex justify-content-center">Criar Sala </v-list-item-title>
                        <v-icon :right='true'>mdi-plus-circle-outline</v-icon>
                    </v-list-item>
                    <br>
                    <v-list-item v-if="this.$store.state.atualRoom">
                        <v-list-item-icon>
                            <v-icon>mdi-gamepad-square</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title
                        class="d-flex justify-content-center"> Atual Game </v-list-item-title>
                        <v-icon :right='true'>mdi-access-point</v-icon>
                    </v-list-item>

                </v-list-item-group>
            </v-list>

        </v-navigation-drawer>

        
        <v-container id="ListRooms" v-if="group==0" >
            
            <div v-if="!RoomEntry">
                <v-row v-for="(Room, index) in Rooms" :key="index">
                    <v-col
                    cols="12"
                    lg="9"
                    md="9"
                    sm="9">
                        <v-card>
                            <v-card-text
                            id="input-color">
                                <h3 class="">
                                    {{Room.id}}
                                </h3>
                            </v-card-text>
                        </v-card>  
                    </v-col>

                    <v-col
                    cols="12"
                    lg="3"
                    md="3"
                    sm="3"
                    :align-self="align"
                    >
                        <button
                        class="btn btn-success btn-block text-light"
                        @click="RoomEntry = Room"
                        >
                            Entrar
                        </button>
                    </v-col>
                </v-row>
            
            </div>
            
            <v-container v-else
            >
                <v-row
                >
                    <v-col
                    cols="12"
                    sm="12">   
                        <p class="display-4 text-white text-center">{{RoomEntry.id}}</p>
                    </v-col>
                </v-row>

                <form v-on:submit.prevent="Enteroom(RoomEntry)">
                <v-row>
                    <v-spacer></v-spacer>

                    <v-col
                    cols="12"
                    md="6"
                    lg="6"
                    sm="6"
                    >
                        <v-card>
                            <v-card-text
                            id="input-color">
                                <v-text-field
                                v-model="RoomEntry.password"
                                label="Senha*"
                                required
                                name="password"
                                ></v-text-field> 
                            </v-card-text>  
                        </v-card>
                        <v-alert
                            v-if="error"
                            id="warning-color"
                            type="warning"
                            >
                                Senha inválida ou sala ocupada!
                        </v-alert>
                    </v-col>
                    
                    <v-spacer>
                    </v-spacer>
                </v-row>

                <v-row>
                    <v-spacer></v-spacer>
                    <v-col
                    cols="12"
                    md="3"
                    lg="3"
                    sm="3"
                    >
                        <button
                            class="btn btn-warning btn-block btn-lg text-white"
                            @click="RoomEntry = undefined"
                            >
                                <v-icon class="text-white"> mdi-keyboard-backspace </v-icon>
                        </button>
                    </v-col>

                    <v-col
                    cols="12"
                    md="3"
                    lg="3"
                    sm="3"
                    >
                        <button
                            class="btn btn-success btn-block btn-lg text-white"
                            type="submit"
                            >
                                Entrar
                        </button>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
                </form>

            </v-container>

            <v-row v-if="Rooms.length==0">
                <v-col>
                    <v-card>
                        <v-card-text
                        id="alert-color">
                            Não há salas disponíveis
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

        </v-container>

        <v-container style="heigth:1000px;" v-if="group==1">
            <v-row >
                <v-col
                class="d-flex justify-content-center">
                    <p class="display-4 text-light">Criar Sala</p>
                </v-col>  
            </v-row>
            
            <form v-on:submit.prevent="addRoom(NewRoom)" >
            <v-row>
                <v-col
                cols="12"
                lg="6">
                    <v-card
                    >
                        <v-card-text
                        id="input-color">
                            <v-text-field
                            label="Nome da Sala"
                            name="name"
                            v-model="NewRoom.name"
                            >
                            </v-text-field>
                        </v-card-text>
                    </v-card>  
                </v-col>
                <v-col
                lg="3">
                    <v-card>
                        <v-card-text
                        id="input-color">
                            <v-text-field
                            label="Senha da Sala"
                            name="password"
                            v-model="NewRoom.password"
                            >
                            </v-text-field>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col
                lg="3"
                :align-self="align">
                    
                    <button type="submit" class="btn btn-success btn-lg btn-block">
                        Criar
                    </button>

                </v-col>

            </v-row>
            </form>
        </v-container>

        
        <room v-if="this.$store.state.atualRoom && group == 2" 
            @disconectRoom="disconectRoom"
            :socket="socket"></room>
        
        
        
        

    </v-card>

</template>


<script>
import room from './Room'
import axios from 'axios'
const server = "http://localhost:8000/api/room";

import io from "socket.io-client"

export default {
    
    data: () => ({
        drawer: false,
        group: null,
        align:'center',
        Rooms:[],
        NewRoom:{ name: '', password: ''},
        error:false,
        RoomEntry:undefined, 
        socket:{}
    }),

    mounted(){
        this.getRooms();
        this.socket = io.connect('http://localhost:3000');
        this.socket.emit("new-user-connect", this.$store.state.user.user);
    },

    components:{
        room
    },

    methods:{

        async addRoom(data) {

            if (!this.NewRoom.name) {
                alert('Informe o nome');
            } else if (!this.NewRoom.password) {
                alert('Verifique a senha!');
            } else {

                data["player1"] = this.$store.state.user.user.id;
                let algo = await axios.post(`${server}`+'/create', data);
                this.disconectRoom();
                this.RoomEntry = undefined;
                this.group = 2;
                this.$store.dispatch('gaming', algo.data.created);
            }

        },

        async Enteroom(data){
            if (!this.RoomEntry.password) {
                alert('Verifique a senha!');
            } else {
                
                data["player2"] = this.$store.state.user.user.id;
               console.log(this.RoomEntry);
                var validate = await axios.post(`${server}`+'/enter/'+data.id, data);
                console.log(validate);
                if(validate.data.confirm == '0'){
                    this.disconectRoom();
                    this.group = 2;
                    this.$store.dispatch('gaming', this.RoomEntry);
                    this.RoomEntry = undefined;
                }
                else{
                    this.error = true;
                }
            }
        },

        getRooms(){
            axios.get(server).then(Response=>{
                console.log(Response.data.rooms);
                    this.Rooms = Response.data.rooms    
                })
                .catch(error=>{
                    console.log(error.Response.data.message)
                })
        },

        disconectRoom(){
            this.socket.emit("exit-room", this.$store.state.atualRoom);
            this.$store.dispatch('gameout');
        }

    }

}

</script>


<style>

    .v-sheet.v-card {
        border-radius: 0px; 
    }

    #app-bar-color{
        background-color:#1D6852;
    }

    #card-main-color{
        background-color: #06433d;
    }

    #list-item-group-color{
        background-color: #75B367;
    }

    #nav-color{
        background-color: #438D5F;
    }

    #input-color{
        background-color: #F9F871;
    }

    #alert-color{
        background-color: #f97171;
        color: #f7e2e2;
    }

    #ListRooms{
        overflow-y: auto;
        height: 700px;
    }
    #ListRooms::-webkit-scrollbar{
        width: 20px;
        margin-top:20px!important;
    }
    #ListRooms::-webkit-scrollbar-track{
        background-color: #0e302d77;
        border-radius: 10px;
    }
    #ListRooms::-webkit-scrollbar-thumb{
        background: #10433ee4;
        border: solid #123430e4;
        border-radius: 10px;
    }
    #warning-color{
        background: #F44336;
        color: whitesmoke;
    }

</style>