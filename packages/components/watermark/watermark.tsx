import { defineComponent, onMounted } from 'vue'
import { watermarkProps } from './type'
import { prefix } from 'constants/config'

const Watermark = defineComponent({
  setup(props) {
    console.log(props)
    const initWatermark = () => {
      const canvas = document.createElement('canvas')
      //canvas
      console.log(canvas)
    }
    onMounted(() => {
      initWatermark()
    })
    return () => {
      return <div>watermark</div>
    }
  },
  name: prefix + '-watermark',
  props: watermarkProps
})

export default Watermark
