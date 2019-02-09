<template lang="pug">
    main.app-checkout-data
        el-row
            el-col(:span="24")
                h3 Enter your credit card details
        el-row
            el-col(:span="24")
                .cards-div
                    .js-chckt-pm__pm-holder
                        input(
                            type="hidden"
                            name="txvariant"
                            value="card"
                        )
                        label Card Number
                        span(data-cse="encryptedCardNumber")
                        label Expiry Month
                        span(data-cse="encryptedExpiryMonth")
                        label Expiry Year
                        span(data-cse="encryptedExpiryYear")
                        label Security Code (CVC)
                        span(data-cse="encryptedSecurityCode")
        el-row
            el-col
                button.btn.btn-success(
                    @click="submitEncryptedValues"
                    :disabled="paymentSubmitted"
                ) Submit
</template>

<script>
import SecureFields from '../services/secure-fields'

export default {
    components: {
    },
    filters: {
        usdollar: function (value) {
            return `$${value}`
        }
    },
    data() {
        return {
            encryptedFields: [
                { name: 'encryptedCardNumber', value: null },
                { name: 'encryptedExpiryMonth', value: null },
                { name: 'encryptedExpiryYear', value: null },
                { name: 'encryptedSecurityCode', value: null }
            ]
        }
    },
    computed: {
        cart() {
            return this.$store.state.cart
        },
        total() {
            return Object.values(this.cart)
                .reduce((acc, el) => acc + (el.count * el.price), 0)
        },
        areAllValuesEncrypted() {
            return this.encryptedFields.reduce((acc, f) => (acc = acc && !!f.value), true)
        },
        paymentSubmitted() {
            return this.$store.state.paymentSubmitted
        },
        selectedPaymentMethod() {
            return this.$store.state.selectedPaymentMethod
        }
    },
    mounted() {
        const script = document.createElement('script')
        script.innerHTML = `${SecureFields()}`
        document.head.appendChild(script)
    },
    methods: {
        setEncryptedValues() {
            this.encryptedFields.forEach((field) => {
                const el = document.getElementById(`card-encrypted-${field.name}`)
                if (el) {
                    field.value = el.value
                }
            })
        },
        async submitEncryptedValues() {
            this.setEncryptedValues()
            if (this.areAllValuesEncrypted) {
                this.$store.commit('setPaymentSubmitted', true)
                this.$store.commit('setAuthorizingPayment', true)
                const encryptedMap = this.encryptedFields.reduce((acc, f) => {
                    acc[f.name] = f.value
                    return acc
                }, {})
                const paymentMethod = {
                    type: this.selectedPaymentMethod.type,
                    ...encryptedMap
                }
                this.encryptedFields.forEach(f => (paymentMethod[f.name] = f.value))
                const paymentRes = await this.$axios
                    .post(
                        'https://team5-adyen-azure2.azurewebsites.net/api/adyen/payments?code=XVu7OQumsmPwD4Yj91Cj/H7UOw3D4NevOaUon/sCnuTPvyWxXFjYFg==',
                        {
                            merchantAccount: 'Checkathon',
                            amount: {
                                currency: 'EUR',
                                amount: Math.floor(this.total * 100)
                            },
                            reference: 'reference_123456',
                            paymentMethod,
                            returnUrl: 'http://localhost:3000/checkout-results'
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                console.log('paymentRes', paymentRes)
                const paymentResult = {
                    pspReference: paymentRes.data.pspReference,
                    resultCode: paymentRes.data.resultCode
                }
                this.$store.commit('setPaymentResult', paymentResult)
                this.$store.commit('setAuthorizingPayment', false)
                this.$router.push({
                    path: '/checkout-results'
                })
            }
        }
    }
}
</script>

<style scoped>
.total {
  margin: 20px 0;
}
.app-checkout-data {
    background-color: white;
    margin-top: 20px;
    padding: 20px;
}
</style>
