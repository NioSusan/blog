<template>
    <div>
        <p>{{ header }}</p>
    </div>
</template>

<script>
export default {
    props: ['header']
}
</script>

<style scoped>
    div{
        border: 1 px solid #ccc;
        box-shadow: 1px 1px 2px black;
        padding: 30px;
        margin: 30px  auto;
        text-align: center
    }
</style>
