<template>
  <q-page padding>
    <div class="row q-mr-sm q-pl-sm">
      <h5 class="">Endereços</h5>
    </div>

    <div class="row q-ma-sm q-">
      <div class="col-sm-4 col-md-2 col-xl-2 col-lg-2">
        <q-select
          class="q-mr-sm"
          label="* Tipo"
          v-model="searchType"
          :options="options.searchTypes"
          emit-value
          map-options
          outlined
        />
      </div>
    </div>

    <div class="row q-ma-sm">
      <div class="col-sm-8 col-md-3 col-xl-3 col-lg-3">
        <q-input
          v-if="this.searchType === 1"
          label="* CEP"
          class="q-mr-sm"
          v-model="form.zipcode"
          :error="$v.form.zipcode.$error"
          :error-message="validationsErrorsMessage($v.form.zipcode)"
          @blur="$v.form.zipcode.$touch"
          @input="getAddress"
          :loading="loadings.getAddress"
          mask="#####-###"
          fill-mask
          unmasked-value
          outlined
        />
      </div>
    </div>

    <div class="row q-ma-sm">
      <div class="col-sm-8 col-md-3 col-xl-3 col-lg-3">
        <q-input
          v-if="this.searchType === 2"
          label="Fuzzy"
          class="q-mr-sm"
          v-model="form.word"
          :error="$v.form.word.$error"
          :error-message="validationsErrorsMessage($v.form.word)"
          @blur="$v.form.word.$touch"
          outlined
        />
      </div>
      <div class="col-sm-4 col-md-3 col-xl-3 col-lg-3">
        <q-btn
          v-if="this.searchType === 2"
          label="Buscar"
          color="blue-5"
          :loading="loadings.getAddress"
          @click="getAddressByFuzzy"
          rounded
          fab
        />
      </div>
    </div>

    <div class="row q-ma-sm">
      <div class="col-12">
        <template>
          <div>
            <q-table
              v-if="this.data.length !== 0"
              class="q-mr-sm q-pa-none"
              :data="data"
              :columns="columns"
              row-key="zipcode"
              hide-header
              grid
            >
            </q-table>
          </div>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script>
import { required, numeric, maxLength, minLength  } from "vuelidate/lib/validators"
import { validationMessage } from "vuelidate-messages"
import {success, error, warning} from "src/utils/toastAlert"
import addressesService from "src/service/AddressesService"

export default {
  name: 'Search',
  data() {
    return {
      searchType: '',
      form: {
        zipcode: '',
        word: '',
      },
      columns: [
        {name: 'zipcode', label: 'CEP', field: 'zipcode', align: 'left', sortable: true},
        {name: 'state', label: 'Estado', field: 'state', align: 'left', sortable: true},
        {name: 'city', label: 'Cidade', field: 'city', align: 'left', sortable: true},
        {name: 'neighborhood', label: 'Bairro', field: 'neighborhood', align: 'left', sortable: true},
        {name: 'street', label: 'Logradouro', field: 'street', align: 'left', sortable: true},
      ],
      data: [],
      loadings: {
        getAddress: false
      },
      options: {
        searchTypes: []
      }
    }
  },
  validations: {
    form: {
      zipcode: {
        numeric,
        minLength: minLength(8),
        maxLength: maxLength(8)
      },
      word: {
        required
      }
    }
  },
  created() {
    this.getSearchTypes()
  },
  methods: {
    validationsErrorsMessage: validationMessage({
      required: () => 'Campo obrigatório.',
      numeric: () => `O campo deve conter um valor numérico.`,
      maxLength: ({$params}) => `O campo deve ter no maxímo ${$params.maxLength.max} caracteres.`,
      minLength: ({$params}) => `O campo deve ter no mínimo ${$params.minLength.min} caracteres.`,
    }),

    getAddress() {
      let zip_code = this.form.zipcode

      if(zip_code.length === 8) {
        this.data = []
        this.loadings.getAddress = true

        addressesService.getAddressByZipcode(zip_code)
          .then(response => {
            this.data.push(response.data.data)

            success(response.data.message)
          })
          .catch(err => {
            error(err.response.data.message)
          })
          .finally(() => {
            this.loadings.getAddress = false
          })
      }
    },

    getAddressByFuzzy() {
      let zip_code = this.form.word

      if(zip_code.length > 0) {
        this.loadings.getAddress = true

        addressesService.getAddressByFuzzy(zip_code)
          .then(response => {
            response.data.data.forEach(address => {
              this.data.push(address)
            })

            if(response.data.status === 'warning') {
              warning(response.data.message)
            } else {
              success(response.data.message)
            }
          })
          .catch(err => {
            error(err.response.data.message)
          })
          .finally(() => {
            this.loadings.getAddress = false
          })
      }
    },

    getSearchTypes() {
      this.options.searchTypes = [
        { label: 'CEP',   value: 1 },
        { label: 'FUZZY', value: 2 }
      ]
    }
  }

}
</script>

<style scoped>

</style>
