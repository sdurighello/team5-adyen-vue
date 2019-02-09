<template lang="pug">
    main
        div(v-if="!paymentSubmitted")
            header.header
                nuxt-link.back(exact to="/cart") Back
                img.logo(src="/logo-white.svg", alt="Adyou")
            div.container
                h1.title Payment Details
                div.payment
                    dt Total
                    dd.value € {{total}}
                    dt Shipping Details
                    dd.shipping
                        p.name
                        p.address Oakstraat 123
                        p.zip 1090 AM Amsterdam
                        p.country The Netherlands
                    dt Prefered payment method
                    dd.payment Credit Card
                    dt
                        img(src="/mastercard.png")
                    dd.cc **** **** **** 1234
                button.submit(
                    @click="submitEncryptedValues"
                    :disabled="paymentSubmitted"
                ) Confirm Payment
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
import AppLoader from '@/components/AppLoader.vue'

export default {
    layout: 'qr',
    components: {
        AppLoader
    },
    data() {
        return {
            selectedPaymentMethod: {
                id: 1,
                type: 'scheme',
                name: 'Mastercard',
                groupType: 'mc',
                fields: [],
                image: 'mastercard.jpg'
            },
            encryptedFields: [
                {
                    name: 'encryptedCardNumber',
                    value: 'adyenjs_0_1_24$EmjrpB5kMkKZSioctnbnmSp6zwvz7ehcWGmVATrlAmC4DDcGBPyfSWK86VRGGtXV/gTDrYwPefx3vtdOFuryRSG7ZZBGRH6vN6PVIbxgVwomFxypahEC6vn6gYvU6xEPddiZqKToFkhN0AegHxbEzSOLNcO+tX5CB9bLFD9bkeXd014xBIqquVmXITvD7af1qZMSnNn+zO6zMlrwki7pTzSPuWkCZ8259bnOG6wTeNJRY8Ha5nCFDPSphK+rE0CE5mRaQxpluXAPhGnHWxaFVIZru0ycpjlHgRgfDF/7drcu51dCFmMHC81OArLcunCndN46Y8cazEk2g6Ffo7Zwzg==$cqcie8/BsEBZBAjNIgbQArw1KYvpEIeXOg77EtZn98VImn3MUdsMMOekSkK+RKFa2lJIwOfIEOmYZvArxmzdd+SR3N07rtz/TdkaBXajw54Wjrob1aKx4xPR6515YC6Au4gj4LmcC1dPu1RF1fucUyEKakQiNxRYRx4vOo7rwbNC7luHd2j1PQgCgbC7ja1CDGPppYe5BkP0Gp7A4d1R/TxxhLQUJly/y5mS4C3/5hVmttFrcRJSOB81FFEn/Ksvw7nEuCxIKE0x0v07VHNAhCa1xpxGZXQ2TvyrahCfwgP7wOaNZi69TU+jnXQrHv7R641x7RP+/7XNNgUJT8mXG+fQZ0L8U6xZr/FBZS+qA79aymSo1iazklwFw817rdxS4jSXE8meOWUAriIvDeMdo+0B+CHELvLTIo8jPU0QlQ0/AHiS9n/TopBALhBEGn5N3p3JB9udFJK0VtcI2dTuEkfJm+WWrm3+r30/osj4hvkNhAzULfS33iDaylMwzBBIC44LHLus3rZ6u86Xw/7ijxpMuIeBGqxCHmc0FgreI38B4/c7Z8DsDyuIRfdiH3cXT4RR42OHS4alDioVWiehLZRwqfVD9HtmPNfEXJhQiGAl/jtk4454eoTJ+fBZHYqMjxU1S3yhPusHil7QOOW45u67y0OH8VdOyDhR+bvzoXk8Bz/2uR9s7P+rtOLcSRn+/X+66Z8uVxn8dJKuD9405rVKGjRFlQappgfVyPGkmHI2DCYTll5RN61YvkhAFOQyHPBM/Xjp3fzz9U8rlZCoch5oGQkZm5G/b6qBOEmbVPbI+/IAdyyMtk9LwRaRRlH0N4LpV7xSzICnlG/OH3x0CQ0DfHdsRsCr81QvsXBYAn1nhQFQCi6CtslBSV4m+cHUx1eMIBrnWNg7vkepNny1HTXVyX0J6/ldCM1NJJRVRl/WXimqELzCRsL2zspSz12XI85Bg5rkazWOtVdUUMKIsUPuTB43wiI+GG8XsWFG3EiqdHsgWA3K6sAMP1OkCG1ldp11yiUhJwuwTO2OSm69I6l9gA8xEpz9XSV50sI5X0P3iU0wByiSklbo2LwDJosKqK+qwwMQZhwt0g19LEW9F98Bm0tLR4Ixf18ymA+Ob2RHGF2Da+V1qdGJWLFwFJAXFkCtYEUBQk4yYhQU96T4kbRSh93Z1pCfaGVfSrGvtrjTtHkfpNTYQUg5Hl1zabWvLeLuACcJTUg/ezhjMhnKt7fIhevXrexNfiO3mrOWs4T1G+XcpoIhYh/+YaYwMBWheAlH4AKDx0Wp5HqTwkDe4mn5queuEMW0ONM0ajpMu6nQ+OC7uP95jOMpukYWNVnYdw=='
                },
                {
                    name: 'encryptedExpiryMonth',
                    value: 'adyenjs_0_1_24$18rg1BubW2+gvwWtB6FHcxXT/DZwm/1FsXwOcpOI0vDE17axa/b69zZkj0xEbG28HIAH1XHXZXMr6GB/M35fi61ZSwMwCzfPNCKL5YPe3o/O4lBdXGLAaDyQzg4FPLtIjZ8th1hKuP8oqcepLkvjxB+Ex3chgJvXPfzMWr7qlTbf8trHdjjd4H/RzbuqwXiy+x0Cy4M2Y+3xiRsJpI5RAYlrOUFh/iOlHP0OEoAUk4XrRgucPo3/XDSqAqxKRAn7GcRS2FMfRkQN2ce6nuiMwVRuzT7kfeyTY1y+CHhm80EkNa3GNnbCZjRxnHzO8tU691IckfGphvLmabAf1HneOw==$ZnnqCM20bAPWdWHlitQJPm6hdCWWE/kdzX91WSzGQw3/IRupZQbnQmpjubZfUCPKiAwP8GMuuGv6W7nB5DrI7wvSF1oEypgd/RTf+mbAibLT0uE2llx9tnSVPObJub8lfA9XPPy591UvjgweMk63/55ysv4g075fzfp7nRCx3YUaZBLnpZEqtKwTpZeLhrZvmvbkhltIKK7PlI72Vm2B5Z9CSrcuLFSB743VaIXCvm23yDQMfNlgT30W83cUWvnZYjRuKgvCuvBgg6GMQSPNPKpOjTHDQaKc8gLo1iuqjTieT1pPUJRGrjAp3ckiPcRmQvpPnr6RmEBVg7XXcAoedBr2fZv4Qao/fsQ7WsHKGDgIDuLgW1EPYTRtJUHuN+32Ntl3/PSKt9/+dmoH6+d1MET+IDo1T2F0OXsEW9cMyaTPxJRhWt/tmZy+lRVy0h9p/1vy2GiuQEcn3fQguYTteOpVy7A='
                },
                {
                    name: 'encryptedExpiryYear',
                    value: 'adyenjs_0_1_24$QL+EsY7Ff5XCLiH0gexzvC6lAFLm7ofKZbbtW2oY10g67Yfdse5fLlnNn7L+zxziWEq+4t9e29XFUSme3QZwgXRDQO0zTDTuLhf41lS8CO0LFtdtd+ifB2vUcIMSEInw5dt8mI17dlkU63p94hZyfUUtfhE9orf5H2jBBxgdVh1P9YdVbENcrw9CPWCUndcKDQZ6WwASkFoaj3isSzFE7lJT+Zws89i2kSBjW2ipVLkh44J5O3k5iF6UyWVxSzRm41clcVxTLjsOQZJ67n8/1PhCtU/ywgggRzPyzdXchMgzH84GhK3hw+oqN3ODpv76mOrX8gyih6Cf8FPqmbbNcw==$WHw6VG4X7m1YpJ4y6oXPCHQkdGgSvFBo66Nx6dBCHKm7TE/FIuDq/VQ49BVIjaMT/CJD/JARAf4OMEUS7/HJMznPP5r3xkpuKpIAOX4d90jG+minV7c5LDQyGP5ClSFV32sZaoWdroLjSaTuVjO+3qjnEAp0xG7OBOy/NOZasW+uglOPBEicCU2GE/roivB/bOYhbK9p0s1stcdsG9cL/3FHdxeIQzFnOS/Xw6mWH0YuMhgsir1yKLZW87rPi4CSrDk+g/D2UEGIyD60/eQcptuj/1c462LF+6oKn/CKOBi7kttmNgOWF/ROvrX1vIvgvrePXA7FnbSJyMl+qouTtJq514t39a1LKqxoUuLtxzOyYx6OShvoI6hLtGoSWKarzJQwWiwZTNG1BdrwKqs9aK19CIUcjnwRZAuBtpQF9qqa7OlWlZGUrDE4CxUA1HfvzBPzUQ=='
                },
                {
                    name: 'encryptedSecurityCode',
                    value: 'adyenjs_0_1_24$Q8rm1oNUhSPsztq5C8ZKWDta05iOscOdW6adpThHi5fmiqrkWdNsjhRcokJJPLeheUJyLGKfumP8nXCCeom03KW+cVB4AMhxuoHAIAabg9tkNfx8EEKigu2O61K9sVfYFoy/AHiAKe18fXqM72OVzhHrPScRZAotYF7A0wwLugfVoHYHCs0osJvqvyGOpUA3U9ui/FrZj4DQxp06CIB35P+uyPPCAkAxuCT1dbFq7aA5mriMcYk8YXqJy84ijzXHW/MVHmno+kHmE6x4iYepN0m3XzMacOoDogHid1C4YweAD5zUpKyI62sOi1z8GrUGgUnPsZ6CsVRfhnRrFUtDVg==$9wNYi9AHhl29mybCI7rCxF+N94GuKxaX77O4AT6jO9JffobDom9RQYcZhHObsa5Iw+vxUUEl5POxJRzoBUAg2BFpIaL56ICURNw692uvp5eLQW5z/FOtXlL133wnsEnxzxHQi8Kop48f2Jr4OjCDwaJMgQxPjJK83/2bWN85bauI4VSz+LkHbwdm7RCZnuphyDH4DixcX2HnVAaSuPHPla6CLM6/we25etot38fVvKdZ20ygZGD+XmX0vfSdwKnDnnHAz/1Pl/lPSQZQjZVJ1gxKKUaX6soqHwOuMhgYAiURZij1tnB9JPU79nNspt99yZoLdd+alQyQzhaL02nR3GbAI8iYX9Fu1obHbyYO7x8z6N9kmXttWg+4lyt8Y3+4wHhvYv8MaMaf0ijCgdBS3vky2h9P5NHUdp7NgxXUOO7WbcNibimoTqhfFkFpErCIPSIJqZQsdZuZ9MK7kQ=='
                }
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
                .toFixed(2)
        },
        paymentSubmitted() {
            return this.$store.state.paymentSubmitted
        },
        authorizingPayment() {
            return this.$store.state.authorizingPayment
        }
    },
    methods: {
        async submitEncryptedValues() {
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
                        merchantAccount: 'TeamFive',
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
</script>

<style scoped>
    *{ box-sizing: border-box; font-family: "FaktBlond", Arial, sans-serif; line-height: 140%;}
    .wrapper{ background: white; }
    .header{ background: linear-gradient(270deg, #43DFCE 14.82%, #15C56B 73.86%); display: block; text-align: center; width: 100%; height: 110px;}
    .back{}
    .logo{ margin: 27px 0 0; width: 172px; height: 56px;}
    .container{ margin: 0 auto; text-align: center; width: 800px;}
    .title{ color: rgb(0,17,44); font-size: 30px; font-weight: 400; letter-spacing: 0.01em; margin: 64px auto 42px; text-align: center;}
    .payment{ display: flex; flex-wrap: wrap;}
    .payment dt,
    .payment dd{ flex: 0 50%; font-size: 20px; padding: 10px;}
    .payment dd p{ line-height:  }
    .payment dt{ text-align: right; font-weight: 100;}
    .payment dt:after{ clear: both; content: ""; display: block; flex: 1; }
    .payment dd{ color: rgba(0,0,0,.9); font-weight: 600; text-align: left;}
    .payment dd.payment-type{}
    .payment dd.cc{}
    .submit{ background: #00112C; border: none; border-radius: 4px; color: white; line-height: 30px; font-size: 20px; margin: 30px auto 0; padding: 15px 60px; text-transform: none;}
    .submit:before{ background-image: url('/icon-lock.svg'); background-repeat: no-repeat; content: "";  display: inline-block; float: left; margin-right: 12px; width: 26px; height: 26px;}

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

.card {
    height: 300px;
}

.cursor-pointer {
    cursor: pointer;
}
</style>
