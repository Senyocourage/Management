module.exports = [
  'strapi::errors',
  'strapi::security',
{name:'strapi::cors',config:{headers:'*',origin:['*','http://localhost:5173']}},
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
