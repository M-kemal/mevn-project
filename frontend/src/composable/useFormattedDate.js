// // useFormattedDate.js
// import { ref } from 'vue'

// export function useFormattedDate(updateTime) {
//   const formattedDate = ref('')

//   const format = (dateString) => {
//     const date = new Date(dateString)
//     const options = {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       timeZoneName: 'short'
//     }
//     formattedDate.value = new Intl.DateTimeFormat('tr-TR', options).format(date)
//   }

//   format(updateTime)

//   return { formattedDate }
// }

// useFormattedDate.js
import { ref } from 'vue';

export function useFormattedDate(updateTime) {
  const formattedDate = ref('');

  const format = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'short', // Ayın kısa ismi
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    // 'tr-TR' yerel ayarını kullanarak tarihi formatla
    formattedDate.value = new Intl.DateTimeFormat('tr-TR', options).format(date);
  };

  format(updateTime);

  return { formattedDate };
}
