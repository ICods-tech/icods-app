const config = {
  screens: {
    Register: "register",
    Scanner: {
      path: 'scanner/:id',
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