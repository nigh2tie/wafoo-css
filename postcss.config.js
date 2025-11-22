module.exports = {
  plugins: {
    // ベンダープレフィックス自動追加
    // ブラウザターゲットは .browserslistrc を参照
    autoprefixer: {},
    // CSS圧縮最適化
    cssnano: {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }]
    }
  }
}
