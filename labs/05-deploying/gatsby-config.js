const path = require('path')
require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    // TODO: add your siteUrl
    siteUrl: `https://distracted-banach-92ad69.netlify.com`,
    title: `Gatsby Drupal Blog`,
    description: `An amazing blog built in the Gatsby + Drupal workshop at DrupalCamp 2019`,
    author: `@schaudustin`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `@weknow/gatsby-remark-drupal`,
          `@weknow/gatsby-remark-twitter`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-responsive-iframe`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              withWebp: true,
              maxWidth: 700
            }
          }
        ]
      }
    },
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: path.resolve('src/utils/typography.js')
      }
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: process.env.DRUPAL_HOST,
        apiBase: `api`,
        basicAuth: {
          username: process.env.DRUPAL_USERNAME,
          password: process.env.DRUPAL_PASSWORD
        }
      }
    }
  ],
}
