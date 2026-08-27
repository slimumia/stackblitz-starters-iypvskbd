import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'src/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development', // 建議開發模式先關閉快取避免干擾，測試離線時再開啟
});

export default withSerwist({
  reactStrictMode: true,
  // 🟢 保持之前設定，強制關閉快取以避開 StackBlitz 檔案系統鎖死問題
  webpack: (config) => {
    config.cache = false;
    return config;
  },
});
