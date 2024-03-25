<template>
  <div class="card border-0 shadow position-relative">
    <img src="../../bostorek/images/b1.jpg" class="card-img-top" alt="" />
    <div class="card-body">
      <div class="aut-box">
        <span
          style="background-color: var(--primary-color)"
          class="py-1 px-3 text-white rounded-pill"
          >{{ book.author }}</span
        >
      </div>
      <h5 class="card-title mt-3 fw-semibold">{{ book.title }}</h5>
      <p class="card-text">
        {{ truncatedText }}
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <a href="#" class="card-link">Read More</a>
        <p style="background-color: var(--primary-color)" class="py-1 px-2 text-white badge mb-0">
          {{ formattedDate }}
        </p>
      </div>
    </div>
    <span
      :class="ratingBageClass"
      class="position-absolute top-0 start-100 translate-middle p-2 text-light rounded-circle border border-2 border-light"
    >
      {{ book.raiting }}
    </span>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useFormattedDate } from '@/composable/useFormattedDate';
export default {
  name: 'BookItem',
  props: {
    book: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  setup(props) {
    const book = ref(props.book);

    const ratingBageClass = computed(() => {
      if (book.value.raiting > 7) {
        return 'bg-success';
      } else if (book.value.raiting > 4) {
        return 'bg-warning';
      } else {
        return 'bg-danger';
      }
    });

    const truncatedText = computed(() => {
      if (book.value.description.length > 80) {
        return book.value.description.slice(0, 80) + '...';
      }
      return book.value.description;
    });

    const updateTime = book.value.updatedAt;
    const { formattedDate } = useFormattedDate(updateTime);
    // // Tarih saat
    // const updateTime = book.value.updatedAt
    // const date = new Date(updateTime)

    // const formattedDate = new Intl.DateTimeFormat('tr-TR', {
    //   year: 'numeric',
    //   month: 'short',
    //   day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit'
    // }).format(date)

    // "4 Mar 2024, 01:36"

    return { ratingBageClass, truncatedText, formattedDate };
  }
};
</script>

<style scoped>
.card-text {
  min-height: 70px;
}
</style>
