<template lang="pug">
    main
        el-col(:span="12", :offset="6")
            el-row
                el-col(:span="24")
                    div(
                        v-if="paymentResult"
                    )
                        div(
                            v-if="paymentResult.resultCode === 'Authorised'"
                        )
                            app-success(@restartCart="success = false")
                            h2 Success!
                            p Your order has been processed, it will be delivered shortly.</p>
                        el-card.card(
                            :class="{ 'cursor-pointer': false }"
                        )
                            p Reference: {{paymentResult.pspReference}}
                            p Status: {{paymentResult.resultCode}}

</template>

<script>
import AppSuccess from '@/components/AppSuccess'

export default {
    components: {
        AppSuccess
    },
    data() {
        return {
        }
    },
    computed: {
        cart() {
            return this.$store.state.cart
        },
        total() {
            return Object.values(this.cart)
                .reduce((acc, el) => acc + (el.count * el.price), 0)
                .toFixed(2)
        },
        selectedPaymentMethod() {
            return this.$store.state.selectedPaymentMethod
        },
        paymentSubmitted() {
            return this.$store.state.paymentSubmitted
        },
        authorizingPayment() {
            return this.$store.state.authorizingPayment
        },
        paymentResult() {
            return this.$store.state.paymentResult
        }
    },
    async created() {
        const payload = this.$router.currentRoute.query.payload
        if (payload && !this.paymentResult) {
            const detailsRes = await this.$axios
                .post(
                    'https://team5-adyen-azure2.azurewebsites.net/api/adyen/payments/details?code=DqQsLIW7EkLPoFSRRvTDuUSGWdXaDtxLHxzTaAAzo5tHAGzXeT9wAA==',
                    {
                        details: {
                            payload
                        }
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
            const paymentResult = {
                pspReference: detailsRes.data.pspReference,
                resultCode: detailsRes.data.resultCode
            }
            this.$store.commit('setPaymentResult', paymentResult)
        }
    },
    methods: {
    }
}
</script>

<style scoped>
.card {
    height: 300px;
}

.cursor-pointer {
    cursor: pointer;
}

.bottom {
margin-top: 13px;
line-height: 12px;
}

.button {
padding: 0;
float: right;
}

.image {
width: 100%;
display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.total {
  margin: 20px 0;
}

.float_center {
  float: right;

  position: relative;
  left: -50%; /* or right 50% */
  text-align: left;
}
.float_center > .child {
  position: relative;
  left: 50%;
}
</style>
