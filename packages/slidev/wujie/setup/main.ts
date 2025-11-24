import { defineAppSetup } from '@slidev/types'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default defineAppSetup(({ app }) => {
  app.use(ElementPlus) 
})

console.log('test')