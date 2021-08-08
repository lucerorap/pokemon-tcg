<template>
    <div style="margin-top: 30px">
        <b-table
            striped hover outlined
            :items="list.data"
            :fields="fields"
        >
            <template #cell(types)="item">
                <span v-for="type in item.value" :key="type" :class="type.toLowerCase()" class="type-tag">
                   {{ type.toUpperCase() }}
                </span>
            </template>
            <template #cell(actions)>
                <b-button variant="primary" size="sm" @click="viewPokemon">View</b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
  name: 'PokemonListView',
  props: {
    list: Object,
    fields: Array
  },
  data () {
    return {
      allowedittags: false,
      tags: []
    }
  },
  methods: {
    viewPokemon () {
      console.log('view pokemon!')
    },
    joinString (value) {
      return value ? value.join(',') : ''
    }
  }
}
</script>

<style scoped>
.type-tag {
    padding: 7px;
    border-radius: 100px;
    font-size: 10px;
    font-weight: bold;
}

.darkness {
    color: white;
    background: #000;
}

.colorless {
    color: white;
    background: #424242;
}

.grass {
    color: white;
    background: #2e7d32;
}

.water {
    color: white;
    background: #1565c0;
}

.metal {
    color: white;
    background: #37474f;
}

.psychic {
    color: white;
    background: #4527a0;
}

.lightning {
    color: white;
    background: #ffeb3b;
}

.fire {
    color: white;
    background: #d50000;
}

.dragon {
    color: white;
    background: #00bfa5;
}

.fighting {
    color: white;
    background: #ff5722;
}

.fairy {
    color: white;
    background: #ad1457;
}
</style>
