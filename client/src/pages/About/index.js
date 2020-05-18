import React from "react"
import PageLayout from "layouts/Page"
import ContentContainer from "containers/content"
import TeamListContainer from "containers/teamList"

const AboutPage = () => (
  <PageLayout>
      <div className="container">
          <ContentContainer h1="Наша команда" contentId="5"/>
          <h2>Сотрудники</h2>
          <TeamListContainer/>
      </div>
  </PageLayout>
)

export default AboutPage