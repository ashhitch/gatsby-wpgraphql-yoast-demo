import React from "react"
import { graphql } from "gatsby"
import { Row, Col, Divider } from "antd"
import SiteLayout from "../components/SiteLayout"
import CategoriesWidget from "../components/CategoriesWidget"
import RecentCommentsWidget from "../components/RecentCommentsWidget"
import RecentPostsWidget from "../components/RecentPostsWidget"
import Seo from "../components/Seo"

const Page = props => {
  const {
    location,
    data: {
      wpgraphql: { page },
    },
  } = props
  const { title, content } = page
  return (
    <SiteLayout location={location}>
      <Seo title={`${page.seo.title}`} description={`${page.seo.metaDesc}`} />
      <Row type="flex" gutter={24}>
        <Col xs={24} md={16}>
          <h1>{title}</h1>
          <Divider />
          <Row type="flex" justify="space-around" gutter={24}>
            <Col xs={24}>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={8}>
          <RecentPostsWidget />
          <CategoriesWidget />
          <RecentCommentsWidget />
        </Col>
      </Row>
    </SiteLayout>
  )
}

export default Page

export const pageQuery = graphql`
  query GET_PAGE($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        uri
        seo {
          title
          metaDesc
          focuskw
          metaKeywords
          metaRobotsNoindex
          metaRobotsNofollow
          opengraphTitle
          opengraphDescription
          opengraphImage {
            altText
            sourceUrl
            srcSet
          }
          twitterTitle
          twitterDescription
          twitterImage {
            altText
            sourceUrl
            srcSet
          }
        }
      }
    }
  }
`
