const menuItems = {
  items: [
    // {
    //   id: 'navigation',
    //   title: 'Navigation',
    //   type: 'group',
    //   icon: 'icon-navigation',
    //   children: [
    //     {
    //       id: 'dashboard',
    //       title: 'Dashboard',
    //       type: 'item',
    //       icon: 'feather icon-home',
    //       url: '/app/dashboard/default'
    //     }
    //   ]
    // },
    
    {
      id: 'ui-forms',
      title: 'FORMS & TABLES',
      type: 'group',
      icon: 'icon-group',
      children: [
        
        {
          id: 'table_meditation',
          title: 'Meditations',
          type: 'item',
          icon: 'feather icon-server',
          url: '/tables/meditations'
        },
        {
          id: 'table_article',
          title: 'Articles',
          type: 'item',
          icon: 'feather icon-server',
          url: '/tables/articles'
        },
        {
          id: 'menu-level',
          title: 'Sounds',
          type: 'collapse',
          icon: 'feather icon-menu',
          children: [
            {
              id: 'table_category',
              title: 'Categories',
              type: 'item',
              url: '/tables/categories'
            },
            {
              id: 'table_sound',
              title: 'Sounds',
              type: 'item',
              url: '/tables/sounds'
            }
          ]
        }
      ]
    },
 
    // {
    //   id: 'pages',
    //   title: 'Pages',
    //   type: 'group',
    //   icon: 'icon-pages',
    //   children: [
       
       
    //     {
    //       id: 'menu-level',
    //       title: 'Menu Levels',
    //       type: 'collapse',
    //       icon: 'feather icon-menu',
    //       children: [
    //         {
    //           id: 'menu-level-1.1',
    //           title: 'Menu Level 1.1',
    //           type: 'item',
    //           url: '#!'
    //         }
    //       ]
    //     },
    //     {
    //       id: 'disabled-menu',
    //       title: 'Disabled Menu',
    //       type: 'item',
    //       url: '#',
    //       classes: 'nav-item disabled',
    //       icon: 'feather icon-power'
    //     }
    //   ]
    // }
  ]
};

export default menuItems;
