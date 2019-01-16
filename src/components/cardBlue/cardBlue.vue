<template>
    <div class="cardBlue">
        <dl>
            <dt >{{title}}</dt>
            <slot></slot>
        </dl>
    </div>
</template>

<script>
    export default {
        props:['title']
    }
</script>

<style lang='scss' scoped>
@import '@/assets/style/base/index.scss';
    .cardBlue {
        dl {
            border: solid 1px #154b70;
            border-radius: 8px;
            padding: 10px;
            background-image: linear-gradient(0, #19345d 0%, #173560 100%);
            dt {
                @extend %text;
                font-size: 14px;
                color: rgba(255, 255, 255, .85);
            }
        }
    }
</style>
