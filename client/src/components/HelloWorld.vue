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
        v-for="menuSection in menuSections"
        :key="menuSection.key"
        sm10 offset-sm1
        xs12 offset-xs0
        >
        <h1>{{ menuSection.name }}</h1>
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
        <v-flex class="item" v-for="item in menuSection" v-if="item.name" :key="item.name">
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
            <v-btn dark fab small color="blue" v-on:click="addItem(menuSection)">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
      <v-flex xs>
        <v-btn v-show="isAdmin" dark fab small color="blue" v-on:click="addSection">
          <v-icon>add</v-icon>hi
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
    logger({ stateMenu: state.menu });
    logger({ stateMenuSections: state.menuSections });
    logger({ stateRestaurant: state.restaurant });
    return {
      isAdmin: true,
      restaurant: state.restaurant,
      showAddSection: false,
      menu: state.menu,
      menuSections: state.menuSections,
      restaurantDocRef: null,
    };
  },
  mounted() {
    this.restaurantDocRef = firestore.collection('restaurants').doc('test_restaurant');
    this.restaurantDocRef.get()
      .then((restaurantSnap) => {
        const restaurant = restaurantSnap.data();
        // console.log({restaurant })
        this.restaurant = restaurant;
      });
  },

  methods: {
    createTestRestaurant() {
      firestore.collection('restaurants').doc('test_restaurant').set({
        name: 'test restaurant',
        address: '',
        admins: ['admin1@test.com', 'admin2@test.com', 'admin3@test.com'],
        owner: 'admin1@test.com',
      });
    },

    addMenu() {
      firestore.collection('menus').doc('test_restaurant').set({
        restaurant: 'test_restaurant',
        sections: [],
      });
    },
    addSection() {
      console.log('adding new menuSection', this.menu[0]['.key'], this.restaurantDocRef.id);

      firestore.collection('menuSections').add({
        menuItems: [],
        menu: this.menu[0]['.key'],
        restaurant: this.restaurantDocRef.id,
        name: 'Chicken',
      });
    },
    addItem(menuSection) {
      console.log({menuSection});
      console.log(menuSection['.key']);
      
      firestore.collection('menuItems').add({
        restaurant: this.restaurantDocRef.id,
        menu: this.menu[0]['.key'],
        menuSection: menuSection['.key'],
        name: '',
        price: {
          small: 20,
          large: 20,
        },
        ingredients: [''],
      }).then((menuItemSnap) => {});
    },
    updateMenuItem() {
    },
    toggleAddSection() {
      this.showAddSection = !this.showAddSection;
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
