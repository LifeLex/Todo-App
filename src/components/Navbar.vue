<template>
    <nav>
        <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
            <span>Awesome you added a new project</span>
            <v-btn text color="white" @click="snackbar=false">Close</v-btn>
        </v-snackbar>
       <v-app-bar flat app>
           <v-app-bar-nav-icon class="grey-text" @click="drawer=!drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
              <span class="font-weight-light">
                   Todo
              </span>
              <span>
                  app
              </span>
            </v-toolbar-title> 
            <v-spacer></v-spacer>

            <!-- Dropdown menu -->
            <v-menu offset-y>
                <template v-slot:activator="{on}">
                    <v-btn text v-on="on" color="grey">
                        <v-icon left>expand_more</v-icon>
                        <span>Menu</span>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="link in links" :key="link.text" :to="link.route">
                        <v-list-item-title>{{link.text}}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-btn text color="grey" v-on:click="logout">
                <span>sign out</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
       </v-app-bar>
       <v-navigation-drawer v-model="drawer" app class="primary">
           <v-row>
               <v-col class="mt-5" align="center">
                   <v-avatar size="100">
                       <img src="/avatar-1.png" alt="">
                   </v-avatar>
                   <p class="white--text subheading mt-1">Alejandro</p>
               </v-col>
           </v-row>
           <v-row>
               <v-col>
                   <Popup @projectAdded="snackbar=true"/>
               </v-col>
           </v-row>
           <v-list>
               <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                   <v-list-item-action>
                       <v-icon class="white--text">{{link.icon}}</v-icon>
                   </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
                  </v-list-item-content>
               </v-list-item>
           </v-list>
           
        </v-navigation-drawer> 

    </nav>
</template>
<script>
import Popup from './Popup.vue'
import firebase from 'firebase'
export default {
    components:{
        Popup
    },
    data(){
        return {
            drawer: false,
            links: [
                { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
                { icon: 'folder', text: 'My Projects', route: '/projects' },
                { icon: 'person', text: 'Team', route: '/team' },
            ],
            snackbar: false,
            isLoggedIn: false,
            currentUser:false
        }
    },
    methods:{
        logout: function () {
            firebase.auth().signOut().then(()=>{
                this.$router.push('/login')
            });
        }
    }
    
}
</script>