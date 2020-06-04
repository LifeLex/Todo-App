<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">Projects</h1>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel
          class="brown-text"
          v-for="project in myProjects"
          :key="project.title"
        >
          <v-expansion-panel-header>
            {{ project.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="">
            <div class="font-weight-bold">due by {{ project.due }}</div>
            <div>{{ project.content }}</div>
            <v-expansion-panel-content class="text-right">
              <!-- Abosulte right is another way inside btn -->
              <v-btn fab dark small color="primary">
                <v-icon @click="edit(project.title,
                        project.content,
                        project.due,
                        )">mdi-pencil</v-icon>
              </v-btn>
              <!-- <Test v-if="clicked" :prjct="projects" /> -->
            </v-expansion-panel-content>
            <div v-if="clicked">
              <v-text-field  v-model="updatedTitle"></v-text-field>
              <v-textarea  v-model="updatedContent"></v-textarea>
              <v-menu>
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="updatedDueDate"
                    label="Due Date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="updatedDueDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menu.save(date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
              <div class="text-right">
                <v-btn fab dark small color="error">
                  <v-icon
                    @click="
                      update(
                        project.title,
                        project.content,
                        project.due,
                        project.id
                      )
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
//import EditPopup from '../components/EditPopup'
//import Test from "../components/Test";

export default {
  components: {
    //Test,
  },
  data() {
    return {
      projects: [
        // { title: 'Design a new website', person: 'The Net Ninja', due: '1st Jan 2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        // { title: 'Code up the homepage', person: 'Chun Li', due: '10th Jan 2019', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        // { title: 'Design video thumbnails', person: 'Ryu', due: '20th Dec 2018', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        // { title: 'Create a community forum', person: 'Gouken', due: '20th Oct 2018', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        // { title: 'Test a new website', person: 'The Net Ninja', due: '1st Jan 2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'}
      ],
      clicked: false,
      updatedTitle: "",
      updatedContent: "",
      updatedDueDate: "",
    };
  },

  methods: {
    edit(title, content, due) {
      this.clicked = !this.clicked;
      this.updatedTitle=title
      this.updatedContent=content
      this.updatedDueDate=due
      console.log("proyectos" + this.projects);
    },
    update(title, content, due, id) {
      console.log(title, content, due, id);
      db.collection('projects').doc(id).update({
        title: this.updatedTitle,
        content: this.updatedContent,
        due: this.updatedDueDate
        
      }).then(()=>{
        console.log(this.updatedTitle, this.updatedContent)
        this.$router.go(0);
      })
      
    },
  },
  computed: {
    myProjects() {
      return this.projects.filter((project) => {
        return project.person === firebase.auth().currentUser.email;
      });
    },
    formattedDate() {
      return this.due ? new Date(this.due).toUTCString().substring(0, 16) : "";
    },
  },
  created() {
    db.collection("projects").onSnapshot((res) => {
      const changes = res.docChanges();

      changes.forEach((change) => {
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        }
      });
    });
  },
};
</script>
