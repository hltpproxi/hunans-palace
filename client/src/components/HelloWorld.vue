<template>
  <div class="hello">
    <h1><b>{{ msg }} 明園</b></h1>
    <h2>Menu</h2>
    <v-flex
      sm10 offset-sm1
      xs12 offset-xs0>
      <v-card
        class="beige"
        v-for="section in menu"
        :key="section.id"
        sm10 offset-sm1
        xs12 offset-xs0
        >
        <h1>{{ section.name }}</h1>
        <v-layout row>
          <v-flex xs>
            <!-- <p class="text-xs-left">{{ item.name }}</p> -->
          </v-flex>
          <v-flex xs3>
            <span><b>Small</b></span>
          </v-flex>
          <v-flex xs3>
            <span><b>Large</b></span>
          </v-flex>
        </v-layout>
        <v-flex class="item" v-for="item in section" v-if="item.name" :key="item.name">
          <v-layout row>
            <v-flex xs>
              <p class="text-xs-left item-name">{{ item.name }}</p>
            </v-flex>
            <v-flex xs3>
              <v-btn small icon v-on:click="remove($event, item, 'small')">
                <v-icon>remove</v-icon>
              </v-btn>
              <span>{{ item.price_sm }}</span>
              <v-btn small icon v-on:click="add($event, item, 'large')">
                <v-icon>add</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs3>
              <v-btn small icon v-on:click="remove($event, item, 'small')">
                <v-icon>remove</v-icon>
              </v-btn>
              <span>{{ item.price_lg }}</span>
              <v-btn small icon v-on:click="add($event, item, 'large')">
                <v-icon>add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-layout v-show="isAdmin" row>
          <v-flex xs>
            <v-btn dark fab small color="blue">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
      <v-flex xs>
        <v-btn dark fab small color="blue">
          <v-icon>add</v-icon>
        </v-btn>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import { firestore } from '../firebase';

export default {
  name: 'HelloWorld',
  data() {
    return {
      menu: [{
        name: 'section_name',
        item: [{
          name: 'item_name',
          price: 'item_price',
        }],
      }],
      msg: "Welcome to Hunan's Palace",
      isAdmin: true,
    };
  },
  mounted() {
    console.log('menu', this.menu);
  },
  firestore() {
    const menu = firestore.collection('menu');
    console.log(menu);
    return {
      menu,
    };
  },
  methods: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item:hover {
  background: white;
}
.item {
  border-radius: 3px;
}
.item-name {
  margin: 3px 0;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
.beige {
  background: beige
}
.card {
  margin: 20px 0;
  padding: 20px;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
