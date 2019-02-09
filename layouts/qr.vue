<template>
    <div>
        <div class="wrapper">
            <nuxt />
            <div class="clear" />
            <div class="push" />
        </div>
    </div>
</template>

<script>
export default {
    components: {
    }
}
</script>

<style>
@font-face {
    font-family: 'FaktBlond' ;
    src: url('/font/Fakt-Blond.woff2') format('woff2'),
        url('/font/Fakt-Blond.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
}
@font-face {
    font-family: 'FaktBold' ;
    src: url('/font/FaktPro-SemiBold.woff') format('woff'),
        url('/font/FaktPro-SemiBold.ttf') format('truetype');
    font-weight: 700;
    font-style: bold;
    font-stretch: normal;
}
html,
body {
  height: 100%;
  margin: 0;
  background: white;

}

.clear {
  clear: both;
}

/* sticky footer stuff */
.wrapper {
  min-height: 100vh;
  margin-bottom: -60px;
}

.footer,
.push {
  height: 50px;
  margin-top: 10px;
}
</style>
