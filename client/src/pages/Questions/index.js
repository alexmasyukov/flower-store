import React from "react"
import PageLayout from "layouts/Page"
import ContentContainer from "containers/content"

const QuestionsPage = () => (
  <PageLayout>
      <div className="container">
          <ContentContainer h1="Вопросы и ответы" contentId="3"/>
      </div>
  </PageLayout>
)

export default QuestionsPage