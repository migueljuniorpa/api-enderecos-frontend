<template>
  <q-form
    @submit.prevent="onSubmit()"
  >
    <div class="row">
      <div class="col-6">
        <q-input
          label="* CEP"
          class="q-pa-md"
          v-model="form.zipcode"
          mask="#####-###"
          :error="$v.form.zipcode.$error"
          :error-message="validationsErrorsMessage($v.form.zipcode)"
          @blur="$v.form.zipcode.$touch"
          @input="getAddress"
          :loading="loadings.getAddress"
          fill-mask
          unmasked-value
          outlined
        />
      </div>
      <div class="col-6">
        <q-input
          label="* Estado"
          class="q-pa-md"
          mask="SS"
          v-model="form.state"
          :error="$v.form.state.$error"
          :error-message="validationsErrorsMessage($v.form.state)"
          @blur="$v.form.state.$touch"
          :loading="loadings.getAddress"
          fill-mask
          unmasked-value
          outlined
        />
      </div>
      <div class="col-6">
        <q-input
          label="* Cidade"
          class="q-pa-md"
          v-model="form.city"
          :error="$v.form.city.$error"
          :error-message="validationsErrorsMessage($v.form.city)"
          @blur="$v.form.city.$touch"
          :loading="loadings.getAddress"
          outlined
        />
      </div>
      <div class="col-6">
        <q-input
          label="Bairro"
          class="q-pa-md"
          v-model="form.neighborhood"
          :loading="loadings.getAddress"
          outlined
        />
      </div>
      <div class="col-12">
        <q-input
          label="Logradouro"
          class="q-pa-md"
          v-model="form.street"
          :loading="loadings.getAddress"
          outlined
        />
      </div>
      <div class="col-12 q-mt-lg text-center">
        <q-btn
          label="Salvar"
          class="q-mr-sm"
          color="primary"
          style="min-width: 155px"
          :loading="loadings.createAddress"
          @click="onSubmit()"
          rounded
        />
        <q-btn
          label="Cancelar"
          class="q-mr-sm"
          color="negative"
          style="min-width: 155px"
          v-close-popup
          rounded
        />
      </div>
    </div>
  </q-form>
</template>

<script>
import {required, maxLength, minLength, numeric} from "vuelidate/lib/validators"
import { validationMessage } from "vuelidate-messages"
import { success, error } from "src/utils/toastAlert"
import addressesService from "src/service/AddressesService"

export default {
  name: 'Form',
  props: [
    'item'
  ],
  validations: {
    form: {
      zipcode: {
        required,
        numeric,
        minLength:minLength(8),
        maxLength:maxLength(8)
      },
      state: {
        required,
        minLength:minLength(2),
        maxLength:maxLength(2)
      },
      city: {
        required
      }
    }
  },
  watch: {
    item: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if(Object.keys(newValue).length !== 0) {
          this.form = newValue
        }
      }
    }
  },
  data () {
    return {
      dialog: false,
      loadings: {
        createAddress: false,
        getAddress: false
      },
      form: {
        id: '',
        zipcode: '',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
      },
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    validationsErrorsMessage: validationMessage({
      required:  ()          => 'Campo obrigatório.',
      numeric:   ()          => `O campo deve conter um valor numérico.`,
      maxLength: ({$params}) => `O campo deve ter no maxímo ${$params.maxLength.max} caracteres.`,
      minLength: ({$params}) => `O campo deve ter no mínimo ${$params.minLength.min} caracteres.`,
    }),

    onSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.loadings.createAddress = true

        if (typeof this.form.id === 'undefined') {
          this.createAddress()
        } else {
          this.updateAddress()
        }
      }
    },

    createAddress() {
      addressesService.create(this.form)
        .then(response => {
          success(response.data.message)
          this.$emit('update-table', response.data.data)
        })
        .catch(err => {
          error(err.response.data.message)
        })
        .finally(() => {
          this.loadings.createAddress = false
          this.$emit('close-modal')
        })
    },

    updateAddress() {
      addressesService.update(this.form)
        .then(response => {
          success(response.data.message)
        })
        .catch(err => {
          error(err.response.data.message)
        })
        .finally(() => {
          this.loadings.createAddress = false
          this.$emit('close-modal')
        })
    },

    getAddress() {
      let zip_code = this.form.zipcode

      if(zip_code.length === 8) {
        this.loadings.getAddress = true

        addressesService.getAddressByZipcode(zip_code)
          .then(response => {
            let { state, city, neighborhood, street } = response.data.data

            this.form.state = state
            this.form.city = city
            this.form.neighborhood = neighborhood
            this.form.street = street
          })
          .catch(err => {
            error(err.response.data.message);
          })
          .finally(() => {
            this.loadings.getAddress = false
          })
      }
    },
  }
}
</script>

<style scoped>

</style>
