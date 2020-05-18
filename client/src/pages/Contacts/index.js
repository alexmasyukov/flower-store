import React from "react"
import PageLayout from "layouts/Page"
import ContentContainer from "containers/content"


const ContactsPage = () => (
  <PageLayout>
      <div className="container">
          <ContentContainer h1="Контакты" contentId="4"/>
      </div>
  </PageLayout>
)

export default ContactsPage