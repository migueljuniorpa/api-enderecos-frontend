<template>
  <q-page padding>
    <q-table
      title="Endereços"
      :data="data"
      :columns="columns"
      :loading="this.loadings.table"
      row-key="id"
      loading-label="Espere um momento, estamos encontrando seus dados..."
      no-data-label="Nenhum resultado encontrado..."
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

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <div>
            <q-btn
              size="sm"
              class="q-mr-sm"
              color="primary"
              icon="edit"
              @click="editAddress(props.row)"
              round
            />
            <q-btn
              size="sm"
              class="q-mr-sm"
              color="negative"
              icon="delete"
              :id="props.row.id"
              @click="openDialogDeleteAddress(props.row)"
              round
            />
          </div>
        </q-td>
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
      v-model="dialog"
      transition-show="scale"
      transition-hide="scale"
      persistent
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

    <q-dialog
      v-model="dialogDeleteAddress"
      transition-show="scale"
      transition-hide="scale"
      class="rounded-borders"
      persistent
    >
      <q-card style="width: 310px">
        <q-card-section class="bg-warning text-white">
          <div class="text-h6 q-mb-md">
            <span class="text-weight-bold">{{ textAddress }}</span>
          </div>
          <div class="text-center">
            <q-icon size="xl" name="warning" />
          </div>
        </q-card-section>

        <q-card-section class="">
          Tem certeza que deseja deletar o endereço ?
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn color="primary"  label="Sim" @click="deleteAddress" :loading="loadings.btn" />
          <q-btn color="negative" label="Não" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import addressesService from 'src/service/AddressesService'
import Form from "components/template/Form"
import { success, error } from "src/utils/toastAlert";

export default {
  name: 'List',
  components: {
    Form
  },
  data () {
    return {
      address: {},
      textAddress: '',
      addressToDelete: '',
      title: 'Cadastrar endereço',
      dialog: false,
      dialogDeleteAddress: false,
      loadings: {
        table: false,
        btn: false
      },
      columns: [
        { name: 'zipcode',      label: 'CEP',        field: 'zipcode',      align: 'left', sortable: true },
        { name: 'state',        label: 'Estado',     field: 'state',        align: 'left', sortable: true },
        { name: 'city',         label: 'Cidade',     field: 'city',         align: 'left', sortable: true },
        { name: 'neighborhood', label: 'Bairro',     field: 'neighborhood', align: 'left', sortable: true },
        { name: 'street',       label: 'Logradouro', field: 'street',       align: 'left', sortable: true },
        { name: 'id',           label: 'Ações',      field: 'id',           align: 'left', },
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
    editAddress(row) {
      this.address = row
      this.title = 'Atualizar endereço'
      this.dialog = true
    },

    getAll() {
      this.loadings.table = true

      addressesService.getAll()
        .then(response => {
          this.data = response.data.data;
        })
        .catch(err => {
          error(err.response.data.message);
        })
        .finally(() => {
          this.loadings.table = false
        })
    },

    openDialogDeleteAddress(address) {
      this.textAddress = `${address.street} - ${address.neighborhood} - ${address.city} ${address.state}, ${address.zipcode}`
      this.dialogDeleteAddress = true
      this.addressToDelete = address.id
    },

    deleteAddress() {
      this.loadings.btn = true

      addressesService.delete(this.addressToDelete)
        .then(response => {
          success(response.data.message)
          this.getAll()
        })
        .catch(err => {
          error(err.response.data.message);
        })
        .finally(() => {
          this.loadings.btn = false
          this.closeModal()
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
      this.dialogDeleteAddress = false
    },
  }
}
</script>
<style scoped>
</style>
