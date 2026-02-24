import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import type { Configuration } from 'webpack'

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig = {
  webpack(config: Configuration) {
    config.module!.rules!.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

export default withVanillaExtract(nextConfig)