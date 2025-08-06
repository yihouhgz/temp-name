import { defineComponent } from 'vue'
import { watermarkProps } from './type'

const Watermark = defineComponent({
  name: 'watermark',
  props: watermarkProps,
  setup(props) {
    console.log(props)
    return () => {
      return <div>watermark</div>
    }
  }
})

export default Watermark
