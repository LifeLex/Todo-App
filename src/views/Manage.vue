<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">Team Members</h1>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel
          class="brown-text"
          v-for="user in users"
          :key="user.name"
        >
          <v-expansion-panel-header>
            {{ user.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="">
            <!-- <div class="font-weight-bold">due by {{ user.name }}</div> -->
            <div>Department: {{ user.department }}</div>
            <div>Position: {{ user.position }}</div>
            <v-expansion-panel-content class="text-right">
              <!-- Abosulte right is another way inside btn -->
              <!-- <v-container>
                <v-row justify="center">
                  <template>
                    <v-col>
                      <v-btn fab dark small color="red">
                        <v-icon @click="del">mdi-delete-alert</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col>
                      <v-btn fab dark small color="primary">
                        <v-icon
                          @click="
                            edit(user.name, user.department, user.position)
                          "
                          >mdi-pencil</v-icon
                        >
                      </v-btn>
                    </v-col>
                    <v-responsive
                      v-if="n === 2"
                      :key="`width-${n}`"
                      width="100%"
                    ></v-responsive>
                  </template>
                </v-row>
              </v-container> -->
              <v-btn fab dark small color="primary">
                <v-icon @click="edit(user.name, user.department, user.position)"
                  >mdi-pencil</v-icon
                >
              </v-btn>

              <!-- <v-btn fab dark small color="red">
                <v-icon @click="del">mdi-delete-alert</v-icon>
              </v-btn> -->
              <!-- <Test v-if="clicked" :prjct="projects" /> -->
            </v-expansion-panel-content>
            <div v-if="clicked">
              <v-text-field v-model="updatedName"></v-text-field>
              <v-text-field v-model="updatedDepartment"></v-text-field>
              <v-text-field v-model="updatedPosition"></v-text-field>
              <div class="text-right">
                <v-btn fab dark small color="error">
                  <v-icon
                    @click="
                      update(user.name, user.department, user.position, user.id)
                    "
                    >mdi-content-save</v-icon
                  >
                </v-btn>
              </div>
            </div>

            <!-- <v-btn fab dark small  color="primary">
              <v-icon dark>mdi-pencil</v-icon>
              </v-btn> -->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import db from "@/fb";
import firebase from "firebase";

export default {
  components: {
    //Test,
  },
  data() {
    return {
      users: [],
      clicked: false,
      updatedName: "",
      updatedDepartment: "",
      updatedPosition: "",
    };
  },

  methods: {
    edit(name, department, position) {
      this.clicked = !this.clicked;
      this.updatedName = name;
      this.updatedDepartment = department;
      this.updatedPosition = position;
      console.log("Usuarios" + this.users);
    },
    update(name, department, position, id) {
      console.log(name, department, position, id);
      db.collection("users")
        .doc(id)
        .update({
          name: this.updatedName,
          content: this.updatedDepartment,
          due: this.updatedPosition,
        })
        .then(() => {
          console.log(this.updatedname, this.updatedContent);
          this.$router.go(0);
        });
    },
    del() {
      var user = firebase.auth().currentUser;
      console.log(user);
      
    },
  },
  computed: {},
  created() {
    db.collection("users")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.users.push({
            name: doc.data().name,
            department: doc.data().department,
            position: doc.data().position,
            user_id: doc.data().user_id,
            id: doc.id,
          });
          //console.log(doc.data())
          console.log(this.users);
        });
      });
  },
};
</script>
