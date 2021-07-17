<template>
    <div>
        <b-pagination
        v-model="currentPage"
        :total-rows="list"
        :per-page="20"
        aria-controls="my-table"
        ></b-pagination>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Pagination',
  computed: {
    ...mapGetters({
      list: 'pokemontcg/list'
    })
  }
}
</script>
