<template>
    
    <v-container>
        <div class="row align-items-center justify-content-center" style="height: 90vh;">
            <v-card>
                <v-card-text>
                    <v-form 
                    v-on:submit.prevent="LoginUser(User)">    
                        <v-col
                        cols="12"
                        sm="9"
                        md="9" lg="12">
                            <v-text-field
                            v-model="User.email"
                            :rules="emailRules"
                            label="E-mail"
                            required>
                            </v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        sm="9"
                        md="9"
                        lg="12">
                            <v-text-field
                            v-model="User.password"
                            :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showpass ? 'text' : 'password'"
                            placeholder="Digite a Senha"
                            required
                            @click:append="showpass = !showpass">
                            </v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        sm="9"
                        md="9"
                        lg="12">
                            <button
                            type="submit"
                            class="btn btn-primary btn-block text-light">
                            Logar
                            </button>
                        </v-col>
                    </v-form>

                </v-card-text>

            </v-card>

        </div>

    </v-container>


</template>

<script>

export default {
    data(){
        return{
            User:{email:'',password:''},
            showpass:false,
            emailRules: [
                v => !!v || 'E-mail é necessário',
                v => /.+@.+/.test(v) || 'E-mail deve ser válido',
            ]
        }
    },
    methods:{
        LoginUser(data)
        {
            if (!data.email) {
                alert('Informe o email');
            } else if (!data.password) {
                alert('Verifique a senha!');
            } else {

            this.$store.dispatch('login', {
                email: this.User.email,
                password: this.User.password
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
}
</script>

<style>
    body{
        overflow: hidden;
        background-color: aquamarine;
    }
</style>