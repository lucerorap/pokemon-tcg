<template>
    <b-row>
        <b-col md="6" class="my-1" v-if="list !== null">
            <b-pagination
                @change="onPageChanged"
                :total-rows="list.totalCount"
                :per-page="list.pageSize"
                v-model="list.page"
                class="my-0"
                v-if="list.count > 0"
            />
        </b-col>
    </b-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Pagination',
  methods: {
    onPageChanged () {
      //
    }
  },
  computed: {
    ...mapGetters({
      list: 'pokemontcg/list'
    })
  }
}
</script>
