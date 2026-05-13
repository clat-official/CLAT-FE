import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import type { Configuration } from 'webpack'

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig = {
  allowedDevOrigins: ['172.21.38.30'],
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
