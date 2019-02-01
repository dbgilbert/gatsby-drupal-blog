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
              content: featuredImage.src
            },
            {
              property: 'og:image:height',
              content: featuredImage.height
            },
            {
              property: 'og:image:width',
              content: featuredImage.width
            }
          ]}
       />
      <div dangerouslySetInnerHTML={{ __html: article.fields.markdownBody.childMarkdownRemark.html }} />
      <Bio />
    </Layout>
  ) 
}

// TODO: augment query with image and excerpt
export const blogPostQuery = graphql`
  query GetBlogPostBySlug($slug: String!) {
    article: nodeArticle(fields:{slug:{eq:$slug}}) {
      title
      fields {
        markdownBody {
          childMarkdownRemark {
            html
            excerpt(pruneLength: 160)
          }
        }
      }
      relationships {
        field_image {
          relationships {
            field_media_image {
              localFile {
                childImageSharp {
                  featuredImage: resize(width: 1200) {
                    src # this is an absolute path to the image
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`