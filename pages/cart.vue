<template>
    <div class="capsule cart">
        <div v-if="cartTotal > 0">
            <div class="shopping">
                <h2>Cart</h2>
                <div
                    v-for="item in cart"
                    :key="item.name"
                    class="cartitems"
                >
                    <div class="carttext">
                        <h4>{{ item.name }}</h4>
                        <p>{{ item.price | usdollar }} x {{ item.count }}</p>
                        <p>Total for this item: <strong>{{ item.price * item.count }}</strong></p>
                    </div>
                    <img class="cartimg" :src="`/${item.img}`" :alt="`Image of ${item.name}`">
                </div>
                <div class="total">
                    <h3>Total: {{ total | usdollar }}</h3>
                </div>
            </div>
            <div class="checkout">
                <h2>Checkout</h2>
                <nuxt-link exact to="/qr-confirmation">
                    <img class="qr" src="/qr-group.png" />
                </nuxt-link>
                <span class="or">or</span>
                <nuxt-link exact to="/checkout">
                    <button type="button" class="btn btn-primarys">
                        Very Long Checkout
                    </button>
                </nuxt-link>
            </div>
        </div>

        <div v-else-if="cartTotal === 0 && success === false" class="empty">
            <h1>Cart</h1>
            <h3>Your cart is empty.</h3>
            <nuxt-link exact to="/">
                <button>Fill er up!</button>
            </nuxt-link>
        </div>

    <!-- <div v-else>
      <app-success @restartCart="success = false"/>
      <h2>Success!</h2>
      <p>Your order has been processed, it will be delivered shortly.</p>
    </div> -->
    </div>
</template>

<script>
// import AppCheckout from './../components/AppCheckout.vue'
// import AppSuccess from './../components/AppSuccess.vue'

export default {
    components: {
        // AppCheckout,
        // AppSuccess
    },
    filters: {
        usdollar: function (value) {
            return `$${value}`
        }
    },
    data() {
        return {
            success: false
        }
    },
    computed: {
        cart() {
            return this.$store.state.cart
        },
        cartTotal() {
            return this.$store.state.cartTotal
        },
        total() {
            return Object.values(this.cart)
                .reduce((acc, el) => acc + (el.count * el.price), 0)
                .toFixed(2)
        }
    }
}
</script>

<style scoped>
.cart > div {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: start;
  align-items: start;
  padding: 50px;
  background: white;
  border-radius: 3px;
  margin-top: 10px;
  padding-bottom: 80px;
}

.cart.empty h1,
.cart.empty h3 {
  margin-bottom: 15px;
}

.cartitems {
  padding: 30px;
  width: 500px;
}

.carttext {
  width: 250px;
  float: left;
}

.carttext p,
.carttext h4 {
  padding: 5px;
}

.cartimg {
  width: 100px;
  border: 1px solid #ccc;
  float: right;
}

.total {
  margin: 20px 0;
}

.shopping{ width: 60%;}
.checkout{ width: 30%; text-align: center; padding: 0 40px;}
.qr{ margin: 40px auto; width: 302px; height: 114px;}
.or{ position: relative; z-index: 3; display: block; font-size: 16px; font-weight: bold; margin: 30px 0 60px; text-align: center;}
.or:before{ position: absolute; z-index: 1; left: -100px; top: 50%; content: ""; border-bottom: 1px solid rgba(0,0,0,.8); display: inline-block; width: 170px;}
.or:after{ position: absolute; z-index: 1; right: -100px; top: 50%; content: ""; border-bottom: 1px solid rgba(0,0,0,.8); display: inline-block; width: 170px;}
</style>
