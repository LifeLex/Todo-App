<template>
  <div class="team">
    <h1 class="subtitle-1 grey--text">Team</h1>
    <!-- <v-container class="my-5">
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="3"
          v-for="person in team"
          :key="person.name"
        >
          <v-card flat class="text-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="person.avatar" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ person.name }}</div>
              <div class="grey--text">{{ person.role }}</div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn text color="grey" right>
                <v-icon small left>
                  message
                </v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->
    <v-container class="my-5">
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="3"
          v-for="person in users"
          :key="person.name"
        >
          <v-card flat class="text-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="person.avatar" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ person.name }}</div>
              <div class="grey--text">{{ person.position }}</div>
              <div class="grey--text">{{ person.department }}</div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn text color="grey" right>
                <v-icon small left>
                  message
                </v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  
</template>

<script>
// @ is an alias to /src
import db from "@/fb";
// /import firebase from "firebase";

export default {
  data() {
    return {
      // team: [
      //   {
      //     name: "The Net Ninja",
      //     role: "Web developer",
      //     avatar: "/avatar-1.png",
      //   },
      //   { name: "Ryu", role: "Graphic designer", avatar: "/avatar-2.png" },
      //   { name: "Chun Li", role: "Web developer", avatar: "/avatar-3.png" },
      //   {
      //     name: "Gouken",
      //     role: "Social media maverick",
      //     avatar: "/avatar-4.png",
      //   },
      //   { name: "Yoshi", role: "Sales guru", avatar: "/avatar-5.png" },
      // ],
      users: [],
    };
  },
  created() {
      db.collection('users').get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {
          this.users.push({name: doc.data().name, department: doc.data().department, position: doc.data().position, user_id: doc.data().user_id})
          //console.log(doc.data())
          console.log(this.users)
        });
      })
  },
};
</script>
