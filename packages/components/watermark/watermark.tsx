import { defineComponent } from 'vue'
import { watermarkProps } from './type'
import { prefix } from 'constants/config'

const Watermark = defineComponent({
  name: prefix + '-watermark',
  props: watermarkProps,
  setup(props) {
    console.log(props)
    return () => {
      return <div>watermark</div>
    }
  }
})

export default Watermark
