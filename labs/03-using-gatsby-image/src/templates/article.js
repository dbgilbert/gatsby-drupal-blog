import React from 'react'
import { graphql } from 'gatsby'

// TODO: import Bio component
import Layout from '../components/layout'
import Bio from '../components/bio'

export default function BlogPost({ data }) {
  const { article } = data
  return (
    <Layout>
      <Bio />
      <div dangerouslySetInnerHTML={{ __html: article.fields.markdownBody.childMarkdownRemark.html }} />
    </Layout>
  ) 
}

export const blogPostQuery = graphql`
  query GetBlogPostBySlug($slug: String!) {
    article: nodeArticle(fields:{slug:{eq:$slug}}) {
      title
      fields {
        markdownBody {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`