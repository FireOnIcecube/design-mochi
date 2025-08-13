<script lang="ts">
import { flip, offset, useFloating } from '@floating-ui/vue'
import { ref } from 'vue'

const buttonRef = ref<HTMLElement>()
const menuRef = ref<HTMLElement>()

const { x, y } = useFloating(buttonRef, menuRef, {
  middleware: [offset(6), flip()],
  placement: 'bottom-start',
})
</script>
