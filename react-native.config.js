module.exports = {
  dependencies: {
    'react-native-video': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-video/android-exoplayer',
        },
      },
    },
  },
  project: {
    iso: {},
    android: {},
  },
  assets: ['./assets/fonts'],
};
