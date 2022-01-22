const config = {
  screens: {
    Deeplink: {
      path: 'deeplink/:id',
      parse: {
        deepLinkQrcodeUrl: (deepLinkQrcodeUrl) => `${deepLinkQrcodeUrl}`
      }
    }
  }
}

export const linking = {
  prefixes: ['icodsMobile://app'],
  config
}