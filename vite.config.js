import reactRefresh from '@vitejs/plugin-react-refresh'
const webpack = require("webpack")

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
  plugins: [
    reactRefresh(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443,
    }
  }
}
