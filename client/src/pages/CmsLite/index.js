import React from "react"
import loadable from "@loadable/component"
import PageLayout from "layouts/Page"

// import pMinDelay from 'p-min-delay' pMinDelay(,2000)

const fallback = () => (
    <div>Загрузка...</div>
)
const CMS_ProductsList = loadable(() => import('components/CmsLite/ProductsList'), {
    fallback: fallback()
})


const CmsLitePage = () => (
    <PageLayout>
        <div className="container">
            <div className="row">
                <div className="col-3">

                </div>
                <div className="col-9 pt-3">
                    <CMS_ProductsList/>
                </div>
            </div>
        </div>
    </PageLayout>
)

export default CmsLitePage