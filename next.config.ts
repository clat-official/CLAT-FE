import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import type { Configuration } from 'webpack'

const withVanillaExtract = createVanillaExtractPlugin()

const allowedDevOrigins = process.env.ALLOWED_DEV_ORIGINS
  ? process.env.ALLOWED_DEV_ORIGINS.split(',').map((s) => s.trim())
  : []

const nextConfig = {
  ...(allowedDevOrigins.length > 0 && { allowedDevOrigins }),
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ]
  },
  webpack(config: Configuration) {
    config.module!.rules!.push({
      test: /\.svg$/,
      exclude: /logo/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeDimensions',
                },
              ],
            },
          },
        },
      ],
    })

    // 로고 별도 처리
    config.module!.rules!.push({
      test: /\.svg$/,
      include: /logo/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeDimensions',
                },
              ],
            },
          },
        },
      ],
    })
    return config
  },
}

export default withVanillaExtract(nextConfig)
