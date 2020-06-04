<template>
  <div class="text-right">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn fab dark small class="info" v-on="on">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primavry-title>
          Edit the current project
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              label="Title"
              v-model="title"
              prepend-icon="folder"
              :rules="inputRules"
              
            ></v-text-field>
            <v-textarea
              label="Information"
              v-model="content"
              prepend-icon="edit"
              :rules="inputRules"
            ></v-textarea>
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formattedDate"
                  label="Due Date"
                  prepend-icon="mdi-calendar-range"
                  v-on="on"
                  :rules="inputRules"
                ></v-text-field>
              </template>
              <v-date-picker v-model="due"></v-date-picker>
            </v-menu>
            <v-btn text class="success mx-0" @click="submit" :loading="loading"
              >Add project</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import format from 'data-fns/format'
import db from "@/fb";
import firebase from "firebase";
//import Projects from '../views/Projects'
export default {
  data() {
    return {
      dialog: false,
      title: "",
      content: "",
      due: "",
      inputRules: [(v) => v.length >= 3 || "Minimum length is 3 characters"],
      loading: false,
      projects: []
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        console.log(this.title, this.content);
        const project = {
          title: this.title,
          content: this.content,
          due: this.due,
          person: firebase.auth().currentUser.email,
          status: "ongoing", //Change to pick date
        };

        db.collection("projects")
          .add(project)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            this.$emit("projectAdded");
            console.log("added to db");
          });
      }
    },
  },
  computed: {
    formattedDate() {
      return this.due ? new Date(this.due).toUTCString().substring(0, 16) : "";
    },
  },
  created() {
      db.collection('projects').get().then((snapshot)=>{
          console.log(snapshot.docs);
          snapshot.docs.forEach(doc => {
              console.log(doc.data())
              this.projects.push(doc.data().title)
              console.log('projects'+ this.projects[0])
          });
      })
  }
};
</script>
