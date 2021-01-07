const jsItems = [
  { text: 'Frameworks', items: [{text: 'Vue', link: 'javascript/vue/'}, { text: 'React', link: 'javascript/react/' }] },
];

const pyItems = [
  { text: 'Frameworks', items: [{text: 'flask', link: 'python/flask/'}] },
];

const aspnetLink = {
  text: 'ASP.Net',
  items: [
    { text: 'Libraries', items: [] },
    { text: 'SignalR', items: [] },
  ]
};

const javascriptLink = { text: 'Javascript', link: 'javascript/', items: jsItems };
const pythonLink = { text: 'Python', link: 'python/', items: pyItems };

module.exports = {
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'gl-ES', // this will be set as the lang attribute on <html>
      title: 'mandrewcito',
      description: 'Blog no que mandrewcito fai as súas trapalladas'
    },
    '/es/': {
      lang: 'es-ES',
      title: 'mandrewcito',
      description: 'Blog de mandrewcito'
    },
    '/en/': {
      lang: 'en-US',
      title: 'mandrewcito',
      description: 'mandrewcito\'s blog'
    }
  },
  themeConfig: {
    logo: '/assets/img/arya.jpg',
    navbar: true,
    locales: {
      '/': {
        lang: 'gl-ES', // this will be set as the lang attribute on <html>
        title: 'mandrewcito - galego',
        selectText: 'Languages',
        label: 'Galego',
        ariaLabel: 'Languages',
        algolia: {},
        description: 'Blog no que mandrewcito fai as súas trapalladas',
        nav: [
          { text: 'Inicio', link: '/' },
          aspnetLink,
          javascriptLink,
          pythonLink
        ]
      },
      '/en/': {
        lang: 'en-US', 
        title: 'mandrewcito - english',
        selectText: 'Languages',
        label: 'English',
        algolia: {},
        description: 'Blog de ',
        nav: [
          { text: 'Home', link: '/en/' },
          aspnetLink,
          javascriptLink,
          pythonLink
        ]
      },
      '/es/': {
        lang: 'es-ES',
        title: 'mandrewcito - español',
        selectText: 'Languages',
        label: 'Español',
        algolia: {},
        description: 'Blog de mandrewcito',
        nav: [
          { text: 'Inicio', link: '/es/' },
          aspnetLink,
          javascriptLink,
          pythonLink
        ]
      }
    }
  }
}