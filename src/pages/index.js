import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from 'styled-components'

import Layout from "../components/layout"
import Seo from "../components/seo"

import useWindowDimensions from '../customHooks/useWindowWidth';

const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: blue;
`

const IndexPage =  ({ data }) => {
  console.log(data)
  const { width } = useWindowDimensions();
  return (
  <Layout>
    <Seo title="Home" />
    <h1>Ilya's blog</h1> 
    <h4>{ data.allMarkdownRemark.totalCount+100 }</h4>
    {
      data.allMarkdownRemark.edges.map(({node})=>(
        <div key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>{node.frontmatter.title} - {node.frontmatter.date}</BlogTitle>
          </BlogLink>
          <p>{node.excerpt}</p>
        </div>
      ))
    }
    {'-'.repeat(width<1110?width/10:width/15)}
    <br></br>
    {width}



    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/page-3/">Go to page 3</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p>
  </Layout>
)}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            description
            date
          }
          fields {
            slug
          }
          html
          excerpt
        }
      }
    }
  }
`