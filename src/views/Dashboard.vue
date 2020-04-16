<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>


    <v-container class="my-5">

      <v-row class="mb-3 pl-1">
        <v-tooltip top>
          <template v-slot:activator="{on}">
          <v-btn small text color="grey" @click="sortBy('title')" v-on="on">
          <v-icon left small>folder</v-icon>
          <span class="caption text-lowercase">By project name</span>
        </v-btn>
        </template>
          <span>Sort projects by project name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{on}">
          <v-btn small text color="grey" @click="sortBy('person')" v-on="on">
            <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">By person</span>
          </v-btn>
          </template>
        <span>Sort projects by person</span>
        </v-tooltip>
       
      </v-row>

       <v-card flat tile class="px-3" v-for="project in projects" :key="project.title">
         <!-- <v-row row wrap :class="`pl-3 project ${project.status}`"> -->
           <v-row row wrap>
           <v-col cols="12" md="6" :class="`pl-3 project ${project.status}`">
           <!-- <v-col cols="12" md="6" > -->
             <div class="caption grey--text">Project Title</div>
             <div>{{project.title}}</div>
           </v-col>
           <v-col xs="2">
             <div class="caption grey--text">Person</div>
             <div>{{project.person}}</div>
           </v-col>
           <v-col xs="2">
             <div class="caption grey--text">Due by</div>
             <div>{{project.due}}</div>
           </v-col>
           <v-col xs="2">
             <!-- <div class="caption grey--text">Status</div>
             <div>{{project.status}}</div> -->
             <!-- <div align="right"> -->
             <div align="center">
               <v-chip small :color="`${project.status}`" :class="`v-chip--active white--text caption my-2`">{{project.status}}</v-chip>
             </div>
           </v-col>
         </v-row>
         <v-row cols="12">
           <v-divider></v-divider>
         </v-row>
         
       </v-card>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import db from '@/fb'

export default {
  data(){
    return{
      projects: [
        // { title: 'Design a new website', person: 'The Net Ninja', due: '1st Jan 2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        // { title: 'Code up the homepage', person: 'Chun Li', due: '10th Jan 2019', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        // { title: 'Design video thumbnails', person: 'Ryu', due: '20th Dec 2018', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        // { title: 'Create a community forum', person: 'Gouken', due: '20th Oct 2018', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      ]
    }
  },
  methods:{
    sortBy(sortAttribute){
      this.projects.sort((a,b)=> a[sortAttribute] < b[sortAttribute] ? -1: 1)
    }
  },
  created(){
    db.collection('projects').onSnapshot(res =>{
      const changes = res.docChanges()

      changes.forEach(change => {
        if(change.type === 'added'){
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      });
    })
  }
}
</script>

<style >
.project.complete{
  border-left: 4px solid #3cd1c2
}
.project.ongoing{
  border-left: 4px solid orange
}
.project.overdue{
  border-left: 4px solid tomato
}
.v-chip.complete{
  background: #3cd1c2 
}
.v-chip.ongoing{
  background: #ffaa2c 
}
.v-chip.overdue{
  background: #f83e70 
}
</style>