<template lang="pug">
    main
        header.header
            a.back(href="javascript:history.go(-1)")
            img(src="/logo.svg", alt="Adyou")
        div.container
        h1 Payment Details
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
