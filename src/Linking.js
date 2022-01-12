const config = {
  screens: {
    Register: "register",
    Scanner: {
      path: 'scanner/:id',
      parse: {
        id: (id) => `${id}`
      }
    }
  }
}

export const linking = {
  prefixes: ['icodsMobile://app'],
  config
}