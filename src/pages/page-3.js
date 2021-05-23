import * as React from "react"

import { Link } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/layout"

const ThirdPage = () => (
  <Layout>
    <Seo title="Page three" />
    <h1>Hi from the third page</h1>
    <p>Welcome to page 3</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default ThirdPage
