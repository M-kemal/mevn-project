<template>
  <div>
    <SectionHeader :title="title" text="Contact us text" />
  </div>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue'

export default {
  setup() {
    const title = 'İletişim Bilgileri'

    return { title }
  },
  components: { SectionHeader }
}
</script>

<style lang="scss" scoped></style>
