<template>
  <q-page padding>
    <q-table
      title="Endereços"
      :data="data"
      :columns="columns"
      :loading="this.loading"
      row-key="id"
      loading-label="Espere um momento, estamos encontrando seus dados..."
      no-data-label="Nenhum resultado encontrado..."
      @row-click="clickRow"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          label="Novo Endereço"
          style="min-width: 155px"
          @click="showModal"
          rounded
        />
      </template>

      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-blue-10 q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>
            {{ message }}
          </span>
        </div>
      </template>
    </q-table>

    <q-dialog
      ref="dialogFormAddress"
      v-model="dialog"
    >
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <Form
            :item="address ? address : {}"
            @update-table="updateTable"
            @close-modal="closeModal"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import addressesService from 'src/service/AddressesService'
import Form from "components/template/Form"

export default {
  name: 'List',
  components: {
    Form
  },
  data () {
    return {
      address: {},
      title: 'Cadastrar endereço',
      dialog: false,
      loading: true,
      columns: [
        { name: 'zipcode',      label: 'CEP',        field: 'zipcode',      align: 'left', sortable: true },
        { name: 'state',        label: 'Estado',     field: 'state',        align: 'left', sortable: true },
        { name: 'city',         label: 'Cidade',     field: 'city',         align: 'left', sortable: true },
        { name: 'neighborhood', label: 'Bairro',     field: 'neighborhood', align: 'left', sortable: true },
        { name: 'street',       label: 'Logradouro', field: 'street',       align: 'left', sortable: true },
      ],
      data: []
    }
  },
  created() {
    this.getAll()
  },
  computed: {
  },
  methods: {
    clickRow(event, row) {
      this.address = row
      this.title = 'Atualizar endereço'
      this.dialog = true
    },

    getAll() {
      this.loading = true

      addressesService.getAll()
        .then(response => {
          this.data = response.data.data;
        })
        .catch(error => {
          error(error.response.data.message);
        })
        .finally(() => {
          this.loading = false
        })
    },

    updateTable(newAddress) {
      this.data.push(newAddress)
    },

    showModal() {
      this.address = {}
      this.title = 'Cadastrar endereço'
      this.dialog = true
    },

    closeModal() {
      this.dialog = false
    },
  }
}
</script>
<style scoped>
</style>
