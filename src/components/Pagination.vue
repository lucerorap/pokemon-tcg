<template>
    <b-row class="pull-right mt-4 mb-5">
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Pagination',
  methods: {
    ...mapActions({
      getList: 'pokemontcg/getList',
      setPaginationPage: 'pokemontcg/setPaginationPage'
    }),
    onPageChanged (page) {
      this.setPaginationPage(page).then(() => {
        this.getList()
      })
    }
  },
  computed: {
    ...mapGetters({
      list: 'pokemontcg/list'
    })
  }
}
</script>
