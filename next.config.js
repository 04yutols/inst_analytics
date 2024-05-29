
module.exports = {
  experimental: {
    externalDir: true
  },
    plugins: [
      '@babel/plugin-transform-modules-commonjs',
    ],
    transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table" ],
  }
