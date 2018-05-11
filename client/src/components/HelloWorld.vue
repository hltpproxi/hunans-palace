<template>
  <div class="hello">
    <!-- {{restaurant.name}} -->
    <h1><b>Welcome to {{restaurant ? restaurant.name : '' }}</b></h1>
    <h2>Menu</h2>
    <v-btn v-on:click="createTestRestaurant">Create Test Restaurant</v-btn>
    <!-- {{menu}} -->
    <v-flex
      sm10 offset-sm1
      xs12 offset-xs0>
      <v-card
        class="beige"
        v-for="(menuSection, key) in menuSections"
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
        <v-flex class="item" v-for="item in menuSection.items" v-if="item" :key="item.id">
          {{item}}
          <v-layout row>
            <v-flex xs12 m6>
              <v-text-field
                v-show="isAdmin"
                name="input-1"
                v-model="item.name"
                v-on:blur="updateMenuItem(item,'name')"
                id="testing"
              ></v-text-field>
              <!-- <p class="text-xs-left item-name">{{ item.name }}</p> -->
            </v-flex>
            <v-flex xs6 m3>
              <v-btn v-show="!isAdmin" small icon v-on:click="remove($event, item, 'small')">
                <v-icon>remove</v-icon>
              </v-btn>
              <span v-show="!isAdmin" >{{ item.price.small }}</span>
              <v-text-field
                v-show="isAdmin"
                name="input-1"
                v-model="item.price.small"
                v-on:blur="updateMenuItem(item, 'price')"
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
                v-model="item.price.large"
                v-on:blur="updateMenuItem(item, 'price')"
                id="testing"
              ></v-text-field>
              <span v-show="!isAdmin" >{{ item.price.large }}</span>
              <v-btn v-show="!isAdmin" small icon v-on:click="add($event, item, 'large')">
                <v-icon>add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-layout v-show="isAdmin" row>
          <v-flex xs>
            <v-btn dark fab small color="blue" v-on:click="addItem(menuSection, key)">
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
import Promise from 'bluebird';

function logger(data) {
  const keys = Object.keys(data);
  console.log(`~!~!~!~!~ ${keys} ~!~!~!~!~\n`, data[keys[0]]);
}

function queryToArray(query) {
  const array = [];
  query.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    array.push(data);
  });
  return array;
};

function getByRestaurant(collection, restaurantId) {
  return firestore
    .collection(collection)
    .where('restaurant', '==', restaurantId)
    .get()
}

export default {
  name: 'HelloWorld',
  data() {
    const menu = { ...state.menu };
    return {
      isAdmin: true,
      restaurant: state.restaurant,
      showAddSection: false,
      menu,
      menuSections: [],
      restaurantDocRef: null,
    };
  },
  mounted() {
    this.restaurantDocRef = firestore.collection('restaurants').doc('test_restaurant');
    this.restaurantDocRef.get()
      .then((restaurantSnap) => {
        const restaurant = restaurantSnap.data();
        this.restaurant = restaurant;
      });
    const menu = getByRestaurant('menus', 'test_restaurant')
      .then(queryToArray)
      .then(data => {
        this.menu = data[0]
      })
      .then(() => {
        const sections = this.menu.sections;
        return Promise.map(this.menu.sections, sectionId =>
          firestore.doc(`menuSections/${sectionId}`).get())
          .then(sections => {
            const data = sections.map(section => {
              const sectionData = section.data()
              sectionData.id = section.id;
              return sectionData;
            });
            this.menuSections = data;
          })
      })
      .then(() => {
        return Promise.map(this.menuSections, menuSection =>
          Promise.map(menuSection.menuItems, itemId =>
            firestore.doc(`menuItems/${itemId}`).get())
            .then(items => {
              const data = items.map(item => {
                const itemData = item.data();
                itemData.id = item.id;
                return itemData;
              });
              menuSection.items = data;
              return data;
            }))
      })
      .then(data => {
        const tempSections = this.menuSections.map((menuSection, index) => {
          menuSection.items = data[index];
          return menuSection;
        })
        logger({menuSections: this.menuSections})
        logger({tempSections});
        this.menuSections = tempSections;
        // console.log(this.menuSections)
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
      firestore.collection('menuSections').add({
        menuItems: [],
        menu: this.menu.id,
        restaurant: this.restaurantDocRef.id,
        name: 'New Section',
      })
      .then(section => firestore
          .collection('menus')
          .doc(this.menu.id)
          .update({ sections: [...this.menu.sections, section.id] }));
    },
    addItem(menuSection) {
      const sectionId = menuSection.id;

      firestore.collection('menuItems').add({
        restaurant: this.restaurantDocRef.id,
        menu: this.menu.id,
        menuSection: sectionId,
        name: 'new dish',
        price: {
          small: 20,
          large: 20,
        },
        ingredients: [''],
      })
      .then((item) =>
        firestore
          .collection('menuSections')
          .doc(sectionId)
          .update({
            menuItems: [...menuSection.menuItems, item.id]
          }));
    },
    updateMenuItem(item, field) {
      logger({item})
      const data = {}
      data[field] = item[field]
      firestore.collection('menuItems').doc(item.id).update(data);
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
