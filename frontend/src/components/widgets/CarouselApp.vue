<template>
  <div class="costum-carousel position-relative w-100">
    <!-- <div v-for="(item, index) in items" :key="index" class="costum-carousel-items">
      <transition name="fade">
        <div v-if="currentItemIndex === index" class="position-relative costum-carousel-item">
          <img :src="item.imageUrl" alt="" class="w-100" :style="{ objectFit: 'cover' }" />
          <div
            class="costum-carousel-caption position-absolute top-0 start-0 bottom-0 end-0 d-flex justify-content-center text-light p-4 align-items-center"
          >
            <div class="container">
              <h6 class="fw-bold text-uppercase" style="color: var(--secondary-color)">
                {{ item.subtitle }}
              </h6>
              <h1 class="display-4">{{ item.title }}</h1>
              <p class="lead">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </transition>
    </div> -->
    <!-- ! Transition Efekti ile Güncellenen Template -->

    <transition name="fade" mode="out-in">
      <div :key="selectedItem.imageUrl" class="position-relative costum-carousel-item">
        <img
          :src="selectedItem.imageUrl"
          alt=""
          class="w-100"
          :style="{ height: height, objectFit: 'cover' }"
        />
        <div
          class="costum-carousel-caption position-absolute top-0 start-0 bottom-0 end-0 d-flex justify-content-center text-light p-4 align-items-center"
        >
          <div class="container">
            <h6 class="fw-bold text-uppercase" style="color: var(--secondary-color)">
              {{ selectedItem.subtitle }}
            </h6>
            <h1 class="display-4">{{ selectedItem.title }}</h1>
            <p class="lead">{{ selectedItem.description }}</p>
          </div>
        </div>
      </div>
    </transition>

    <div class="costum-carousel-controls d-flex gap-1 position-absolute">
      <button
        @click="prevItem"
        class="border-0 rounded-circle d-flex justify-content-center align-items-center"
      >
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button
        @click="nextItem"
        class="border-0 rounded-circle d-flex justify-content-center align-items-center"
      >
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue'

export default {
  name: 'CarouselApp',
  props: {
    items: {
      type: Array,
      required: true
    },
    height: {
      type: String,
      default: '100%'
    },
    autoPlayInterval: {
      type: Number,
      default: '3000'
    }
  },
  setup(props) {
    const currentItemIndex = ref(0)

    const selectedItem = computed(() => {
      return props.items[currentItemIndex.value]
    })

    const nextItem = () => {
      currentItemIndex.value = (currentItemIndex.value + 1) % props.items.length
    }
    const prevItem = () => {
      currentItemIndex.value =
        (currentItemIndex.value - 1 + props.items.length) % props.items.length
    }

    let autoPlayTimer = null

    const startAutoPlay = () => {
      // Zaten zamanlayıcı varsa durdur
      if (autoPlayTimer) clearInterval(autoPlayTimer)
      autoPlayTimer = setInterval(() => {
        nextItem()
      }, props.autoPlayInterval)
    }

    onMounted(() => {
      startAutoPlay()
    })

    onUnmounted(() => {
      if (autoPlayTimer) clearInterval(autoPlayTimer)
      //Component yok edildiğinde zamanlayıcıyı durdur
    })

    return { currentItemIndex, nextItem, prevItem, selectedItem }
  }
}
</script>

<style scoped>
.costum-carousel-caption {
  background: rgba(0, 0, 0, 0.7);
}
.costum-carousel-controls {
  bottom: -22.5px;
}

.costum-carousel-controls button {
  background: var(--secondary-color);
  width: 50px;
  height: 50px;
  transition: all 0.3s ease;
}

.costum-carousel-controls button:hover {
  background: var(--primary-color);
  transform: scale(1.1);
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 1rem;
  height: 1rem;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: all 1s ease;
}
</style>
