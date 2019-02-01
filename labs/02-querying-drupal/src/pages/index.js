import React from 'react'
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout'
import SEO from '../components/seo'


// TODO: use injected data prop from query
export default function IndexPage({data}) {
  return (
    <Layout>
      <SEO title="Your Great Blog" description="All my blog posts" />
      <ul>
        {data.articles.edges.map(({node}) => (
          <li><Link to={node.path.alias}>{node.title}</Link></li>
        ))}
      </ul>
    </Layout>
  )
}

// TODO: write query
export const indexQuery = graphql`
{
  articles: allNodeArticle {
    edges {
      node {
        title
        path {
          alias
        }
      }
    }
  }
  
}
`;