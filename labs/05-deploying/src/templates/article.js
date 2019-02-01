import React from 'react'
import { graphql } from 'gatsby'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default function BlogPost({ data }) {
  const { article } = data
  const { featuredImage } = article.relationships.field_image.relationships.field_media_image.localFile.childImageSharp
  return (
    <Layout>
      <SEO 
        title={article.title}
        description={article.fields.markdownBody.childMarkdownRemark.excerpt}
        meta={
          [
            {
              property: 'og:image',
              content: `${data.site.siteMetadata.siteUrl}${featuredImage.src}` // TODO: prefix with siteUrl
            },
            {
              property: 'og:image:height',
              content: featuredImage.height
            },
            {
              property: 'og:image:width',
              content: featuredImage.width
            }
          ]
        }
      />
      <div dangerouslySetInnerHTML={{ __html: article.fields.markdownBody.childMarkdownRemark.html }} />
      <Bio />
    </Layout>
  ) 
}

export const blogPostQuery = graphql`
  query GetBlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }

    article: nodeArticle(fields:{slug:{eq:$slug}}) {
      relationships {
        field_image {
          relationships {
            field_media_image {
              localFile {
                childImageSharp {
                  featuredImage: resize(width: 1200) {
                    height
                    width
                    src
                  }
                }
              }
            }
          }
        }
      }
      title
      fields {
        markdownBody {
          childMarkdownRemark {
            excerpt(pruneLength: 160)
            html
          }
        }
      }
    }
  }
`