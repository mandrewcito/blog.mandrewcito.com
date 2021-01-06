const jsFrameworkItems = [
  { text: 'Vue', link: 'javascript/vue/', items: [] },
  { text: 'React', link: 'javascript/react/' }
];

module.exports = {
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/es/': {
      lang: 'es-ES',
      title: 'VuePressES',
      description: 'Vue 驱动的静态网站生成器'
    },
    '/gl/': {
      lang: 'gl-ES',
      title: 'VuePressGL',
      description: 'Vue 驱动的静态网站生成器'
    }
  },
  themeConfig: {
    logo: '/assets/img/arya.jpg',
    navbar: true,
    locales: {
      '/': {
        lang: 'en-US', // this will be set as the lang attribute on <html>
        title: 'VuePress',
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        algolia: {},
        description: 'Vue-powered Static Site Generator',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Javascript', link: '/javascript/', items: jsFrameworkItems }
        ]
      },
      '/gl/': {
        lang: 'gl-ES', // this will be set as the lang attribute on <html>
        title: 'VuePress',
        selectText: 'Languages',
        label: 'Galego',
        algolia: {},
        description: 'Vue-powered Static Site Generator',
        nav: [
          { text: 'HomeGL', link: '/' },
          { text: 'Javascript', link: '/javascript/', items: jsFrameworkItems }

        ]
      },
      '/es/': {
        lang: 'es-ES', // this will be set as the lang attribute on <html>
        title: 'VuePress',
        selectText: 'Languages',
        label: 'Español',
        algolia: {},
        description: 'Vue-powered Static Site Generator',
        nav: [
          { text: 'casa', link: '/' },
          { text: 'Javascript', link: '/javascript/', items: jsFrameworkItems }
        ]
      }
    }
  }
}