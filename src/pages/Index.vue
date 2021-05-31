  <template>
  <q-page padding>
<!--    <q-form class="q-gutter-md">-->
<!--      <div class="row">-->
<!--        <div class="col-6 offset-3 rounded-borders shadow-1" style="min-height: 200px">-->
<!--          <div class="row text-center">-->
<!--            <div class="col-12 q-pa-md bg-blue-8">-->
<!--              <span class="text-h5 text-white">-->
<!--                Busca endereços-->
<!--              </span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="row">-->
<!--            <div class="col-8">-->
<!--              <q-input-->
<!--                label="Buscar logradouro"-->
<!--                class="q-pa-md"-->
<!--                v-model="form.word"-->
<!--                outlined-->
<!--              />-->
<!--            </div>-->
<!--            <div class="col-4">-->
<!--              <q-input-->
<!--                label="CEP"-->
<!--                class="q-pa-md"-->
<!--                v-model="form.zipcode"-->
<!--                mask="#####-###"-->
<!--                fill-mask-->
<!--                unmasked-value-->
<!--                outlined-->
<!--              />-->
<!--            </div>-->
<!--            <div class="col-12 text-center">-->
<!--              <q-btn-->
<!--                label="Buscar"-->
<!--                class="q-ma-md"-->
<!--                size="lg"-->
<!--                style="width: 155px"-->
<!--                rounded-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </q-form>-->
  </q-page>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      form: {
        zipcode: '',
        word: ''
      },
      loadings: {
      }
    }
  },
  watch: {
  },
  computed: {
  },
  mounted () {
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
