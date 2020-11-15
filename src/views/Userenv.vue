<template>

        <v-card
        class="mx-auto overflow-hidden"
        height="800"
        id="card-main-color"
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
            >
                <v-list
                    nav
                    dense
                    
                >
                    <v-list-item-group
                    v-model="group"
                    id="list-item-group-color"
                    >
                        <v-list-item
                        >
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

                    </v-list-item-group>
                </v-list>

            </v-navigation-drawer>

            <v-container style="heigth:1000px" v-if="group==1">
                <v-row >
                    <v-col
                    class="d-flex justify-content-center">
                        <p class="display-4 text-light">Criar Sala</p>
                    </v-col>  
                </v-row>
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
                                >
                                </v-text-field>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col
                    lg="3"
                    :align-self="align">
                        
                        <button class="btn btn-success btn-lg btn-block">
                            Criar
                        </button>

                    </v-col>
                </v-row>
            </v-container>

            <v-container style="heigth:1000px" v-if="group==0">
                <room></room>
            </v-container>
        </v-card>

</template>

<script>
import room from './Room'

export default {
    data: () => ({
      drawer: false,
      group: null,
      align:'center'
    }),

    components:{
        room
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
</style>