import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig = {
  turbopack: {},
}

export default withVanillaExtract(nextConfig)