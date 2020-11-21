module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/game-shelf/'
    : '/',
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()

    // Remove errors that don't hurt
    config.plugins.delete('friendly-errors')
  },
}
