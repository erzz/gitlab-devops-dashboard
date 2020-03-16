module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://gitlab.com',
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
};
