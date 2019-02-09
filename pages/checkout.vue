<template lang="pug">
    main
        el-col(:span="12", :offset="6")
            el-row()
                el-col(:span="24")
                    el-row
                        el-col(:span="24")
                            h3 Enter your shipment details
                    el-row(:style="{ margin: '10px'}")
                        el-col(:span="24")
                            el-form
                                .el-form-item
                                    el-input(type="text", placeholder="Adress")
                                .el-form-item
                                    el-input(type="text", placeholder="Country")
                                el-row
                                    el-col(:span="8")
                                        el-input(type="text", placeholder="Postal code")
                                    el-col(:span="16")
                                        el-input(type="text", placeholder="City")
                    el-row
                        el-col
                            button.btn.btn-success(
                                @click="submitShippingDetails"
                                :disabled="shippingSubmitted"
                            ) Submit
            template(v-if="shippingSubmitted")
                el-row
                    el-col(:span="24")
                        h3 Select your payment method
                el-row(:gutter="20")
                    el-col(
                        :span="8"
                        v-for="method in defaultMethods"
                        :key="method.id"
                    )
                        el-badge(:is-dot="selectedPaymentMethod && selectedPaymentMethod.id === method.id")
                        el-card.card(
                            @click.native="selectPaymentMethod(method)"
                            :class="{ 'cursor-pointer': !paymentSubmitted }"
                        )
                            img.image(
                                :src="`/${method.image}`"
                            )
                            div(:style="{ padding: '14px' }")
                                | {{method.name}}
                el-row(v-if="selectedPaymentMethod && selectedPaymentMethod.type === 'scheme'")
                    el-col(:span="24")
                        app-credit-card-data
                el-row(v-if="selectedPaymentMethod && selectedPaymentMethod.type === 'ideal'")
                    el-col(:span="24")
                        app-ideal-data
            el-row
                el-col(:span="24")
                    div(v-if="authorizingPayment")
                        el-card.card(
                            :class="{ 'cursor-pointer': false }"
                        )
                            app-loader(v-loading="authorizingPayment")
                            p Authorizing your payment
</template>

<script>
import AppCreditCardData from '@/components/AppCreditCardData'
import AppIdealData from '@/components/AppIdealData'
import AppLoader from '@/components/AppLoader.vue'

export default {
    components: {
        AppCreditCardData,
        AppIdealData,
        AppLoader
    },
    filters: {
        usdollar: function (value) {
            return `$${value}`
        }
    },
    data() {
        const defaultMethods = [
            {
                id: 1,
                type: 'scheme',
                name: 'Mastercard',
                groupType: 'mc',
                fields: [],
                image: 'mastercard.jpg'
            },
            {
                id: 2,
                type: 'scheme',
                name: 'Visa',
                groupType: 'visa',
                fields: [],
                image: 'visa.png'
            },
            {
                id: 3,
                type: 'ideal',
                name: 'iDeal',
                fields: [],
                image: 'ideal.png'
            }
        ]
        return {
            success: false,
            paymentMethodsContainer: {},
            defaultMethods
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
        },
        shippingSubmitted() {
            return this.$store.state.shippingSubmitted
        }
    },
    async created() {
        await this.populateMethods()
    },
    methods: {
        async populateMethods() {
            const paymentMethodsRes = await this.$axios
                .post(
                    'https://team5-adyen-azure2.azurewebsites.net/api/adyen/payment-methods?code=KUYN3Rho6VX5uFCbxm59l/5qhp7EKua9Wly58/UyW0OTKI6DhtQNng==',
                    {
                        merchantAccount: 'TeamFive',
                        countryCode: 'NL',
                        amount: {
                            currency: 'EUR',
                            amount: Math.floor(this.total * 100)
                        }
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
            this.paymentMethodsContainer = paymentMethodsRes.data
            this.updatePaymentMethodFields()
        },
        updatePaymentMethodFields() {
            this.defaultMethods.forEach((defaultMethod, index) => {
                const creditCards = this.paymentMethodsContainer.groups.find(g => g.name === 'Credit Card')
                const isCardAllowed = !defaultMethod.groupType || (creditCards && creditCards.types.includes(defaultMethod.groupType))
                const foundMethod = this.paymentMethodsContainer.paymentMethods.find(pm => pm.type === defaultMethod.type)
                const foundFields = isCardAllowed ? !!foundMethod && (foundMethod.details || []) : []
                defaultMethod.fields = foundFields
            })
        },
        selectPaymentMethod(method) {
            if (!this.paymentSubmitted) {
                this.$store.commit('addSelectedPaymentMethod', method)
            }
        },
        submitShippingDetails() {
            this.$store.commit('setShippingSubmitted', true)
        }
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
</style>
