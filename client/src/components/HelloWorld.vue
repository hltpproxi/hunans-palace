<template>
  <div class="hello">
    <!-- {{restaurant.name}} -->
    <h1><b>Welcome to {{restaurant ? restaurant.name : '' }}</b></h1>
    <h2>Menu</h2>
    <v-btn v-on:click="createTestRestaurant">Create Test Restaurant</v-btn>
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
        <v-layout xsrow>
          <v-flex xs12 m6>
            <!-- <p class="text-xs-left">{{ item.name }}</p> -->
          </v-flex>
          <v-flex xs6 m3>
            <span><b>Small</b></span>
          </v-flex>
          <v-flex xs6 m3>
            <span><b>Large</b></span>
          </v-flex>
        </v-layout>
        <v-flex class="item" v-for="item in section" v-if="item.name" :key="item.name">
          <v-layout row>
            <v-flex xs12 m6>
              <p class="text-xs-left item-name">{{ item.name }}</p>
            </v-flex>
            <v-flex xs6 m3>
              <v-btn v-show="!isAdmin" small icon v-on:click="remove($event, item, 'small')">
                <v-icon>remove</v-icon>
              </v-btn>
              <span v-show="!isAdmin" >{{ item.price_sm }}</span>
              <v-text-field
                v-show="isAdmin"
                name="input-1"
                v-model="item.price_sm"
                v-on:blur="updateMenuItem(item, 'PRICE_SMALL')"
                id="testing"
              ></v-text-field>
              <v-btn v-show="!isAdmin" small icon v-on:click="add($event, item, 'large')">
                <v-icon>add</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs6 m3>
              <v-btn v-show="!isAdmin" small icon v-on:click="remove($event, item, 'small')">
                <v-icon>remove</v-icon>
              </v-btn>
              <v-text-field
                v-show="isAdmin"
                name="input-1"
                v-model="item.price_lg"
                v-on:blur="updateMenuItem(item, 'PRICE_LARGE')"
                id="testing"
              ></v-text-field>
              <span v-show="!isAdmin" >{{ item.price_lg }}</span>
              <v-btn v-show="!isAdmin" small icon v-on:click="add($event, item, 'large')">
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
        <v-btn v-show="isAdmin" dark fab small color="blue">
          <v-icon on:click="addMenuSection">add</v-icon>
        </v-btn>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import { firestore } from '../firebase';
import { state } from '../main';

function logger(data) {
  const keys = Object.keys(data);
  console.log(`~!~!~!~!~ ${keys} ~!~!~!~!~\n`, data[keys[0]]);
}

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: "Welcome to Hunan's Palace",
      isAdmin: true,
      restaurant: null,
      showAddSection: false,
      menu: {},
    };
  },
  mounted() {
    firestore
      .collection('restaurants')
      .doc('test_restaurant')
      .get()
      .then((restaurantSnap) => {
        const restaurant = restaurantSnap.data();
        // console.log({restaurant })
        this.restaurant = restaurant;
      });
    logger({ menu: this.menu });
  },
  methods: {
    createTestRestaurant() {
      firestore.collection('restaurants').doc('test_restaurant').set({
        name: 'test restaurant',
        address: '',
        admins: ['admin1@test.com', 'admin2@test.com', 'admin3@test.com'],
        owner: 'admin1@test.com',
      });
      firestore.collection('menus').doc('test_restaurant').set({
        restaurant: 'test_restaurant',
        sections: [],
      });
      firestore.collection('menuSections').add({
        menuItems: []
      });
      firestore.collection('menuItems').add({
        name: 'moo shoo chicken',
        price: {
          small: 9.5,
          large: 13.5,
        },
      }).then(menuItemSnap => {});
    },
    addSection() {

    },
    updateMenuItem() {

    },
    toggleAddSection() {
      this.showAddSection = !this.showAddSection;
    },
    addMenuSection() {
      this.$firestore.collection('section').doc('init').set({ init: 'init' });
      this.$firestore.collection('section').set({ items: [] });
    },
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
