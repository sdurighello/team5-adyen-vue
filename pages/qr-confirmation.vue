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
                    img(src="/mastercard.png")
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
</style>
