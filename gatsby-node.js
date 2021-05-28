//Implement Gatsby's Node APIs in this file.
//See: https://www.gatsbyjs.com/docs/node-apis/

const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({node, getNode, actions }) =>{
    const { createNodeField } = actions
    console.log('node.internal.type', node.internal.type)
    console.log('getNode',getNode)
    console.log('actions', actions)
    if(node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode })

        createNodeField({
            node,
            name: `slug`,
            value: slug
        })
    }
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    return graphql(`
    {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/blog-post.js`),
                context: {
                    slug: node.fields.slug
                }
            })
        })
    })
}