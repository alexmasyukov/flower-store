import React from "react"
import PageLayout from "layouts/Page"
import ContentContainer from "containers/content"

const RecomendationsPage = () => (
  <PageLayout>
      <div className="container">
          <ContentContainer h1="Рекомендации по уходу" contentId="2"/>
      </div>
  </PageLayout>
)

export default RecomendationsPage