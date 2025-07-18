import { mergeConfig } from 'vite'
import oxlint from 'vite-plugin-oxlint'
import baseConfig from './vite.config'

// Development config with oxlint
export default mergeConfig(baseConfig, {
  plugins: [oxlint()],
})