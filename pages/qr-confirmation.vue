<template lang="pug">
    main
        header.header
            a.back(href="javascript:history.go(-1)")
            img.logo(src="/logo-white.svg", alt="Adyou")
        div.container
        h1.title Payment Details
        div.payment
            dt Total
            dd.value € 123
            dt Shipping Details
            dd.shipping
                p.name
                p.address Oakstraat 123
                p.zip 1090 AM Amsterdam
                p.country The Netherlands
            dt Prefered payment method
            dd.payment Credit Card
            dt
                img(src="/")
            dd.cc **** **** **** 1234
        button.submit Confirm Payment
</template>

<script>
export default {
    layout: 'qr',
    components: {
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
        }
    },
    methods: {
    }
}
</script>

<style scoped>

@font-face {
    font-family: 'Fakt Blond' ;
    src: url('/font/Fakt-Blond.woff2-Thin.woff2') format('woff2'),
        url('/font/Fakt-Blond.woff2-Thin.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
}
@font-face {
    font-family: 'Fakt Semi-Bold' ;
    src: url('/font/FaktPro-SemiBold.woff') format('woff'),
        url('/font/FaktPro-SemiBold.ttf') format('truetype');
    font-weight: 700;
    font-style: bold;
    font-stretch: normal;
}
    *{ box-sizing: border-box;}
    main{}
    .header{ background: linear-gradient(270deg, #43DFCE 14.82%, #15C56B 73.86%); display: block; text-align: center; width: 100%; height: 110px;}
    .back{}
    .logo{ margin: 27px 0; width: 172px; height: 56px;}
    .container{}
    .title{}
    .payment{}
    .payment dt{}
    .payment dd{}
    .payment dd.payment-type{}
    .payment dd.cc{}
    .submit{}

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
