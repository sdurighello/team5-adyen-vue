<template lang="pug">
    main.app-checkout-data
        el-row
            el-col(:span="24")
                h3 Select your bank
        el-row(:gutter="10")
            el-col(
                :span="8"
                v-for="bank in defaultBanks"
                :key="bank.id"
            )
                el-badge(:is-dot="selectedBank && selectedBank.id === bank.id")
                el-card.card(
                    @click.native="selectBank(bank)"
                    :class="{ 'cursor-pointer': !bankHasBeenSelected }"
                )
                    img.image(
                        :src="`/${bank.image}`"
                    )
                    div(:style="{ padding: '14px' }")
                        | {{bank.name}}
</template>

<script>

export default {
    components: {
    },
    filters: {
        usdollar: function (value) {
            return `$${value}`
        }
    },
    data() {
        const defaultBanks = [
            {
                id: 1,
                name: 'Rabobank',
                image: 'rabo.jpg',
                issuer: 1121
            },
            {
                id: 2,
                name: 'Abn Amro',
                image: 'abnamro.jpg',
                issuer: 1154
            },
            {
                id: 3,
                name: 'SNS',
                image: 'sns.jpg',
                issuer: 1160
            }
        ]

        return {
            success: false,
            defaultBanks
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
        bankHasBeenSelected() {
            return this.$store.state.bankHasBeenSelected
        },
        selectedBank() {
            return this.$store.state.selectedBank
        },
        authorizingBank() {
            return this.$store.state.authorizingBank
        },
        selectedPaymentMethod() {
            return this.$store.state.selectedPaymentMethod
        }
    },
    methods: {
        async selectBank(bank) {
            this.$store.commit('setBankHasBeenSelected', true)
            this.$store.commit('setSelectedBank', bank)
            this.$store.commit('setAuthorizingBank', true)
            const paymentMethod = {
                type: this.selectedPaymentMethod.type,
                issuer: this.selectedBank.issuer
            }
            const bankRes = await this.$axios
                .post(
                    'Azure URL: https://team5-adyen-azure2.azurewebsites.net/api/adyen/payments?code=XVu7OQumsmPwD4Yj91Cj/H7UOw3D4NevOaUon/sCnuTPvyWxXFjYFg==',
                    {
                        merchantAccount: 'TaoportfolioCOM',
                        amount: {
                            currency: 'EUR',
                            value: Math.floor(this.total * 100)
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
            console.log('bankRes', bankRes)
            const authorizationResult = {
                redirect: bankRes.data.redirect,
                resultCode: bankRes.data.resultCode
            }
            this.$store.commit('setBankAuthorizationResult', authorizationResult)
            this.$store.commit('setAuthorizingBank', false)
            window.location = authorizationResult.redirect.url
            // window.location = `${authorizationResult.redirect.url}&redirectUrl=http://localhost:3000/checkout-results/?payload=true`
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
.card {
    height: 300px;
}

.cursor-pointer {
    cursor: pointer;
}
</style>
