import React, { useState, useEffect } from "react"
import LandingBio from "../components/landing-bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import sanityClient from '@sanity/client';
import BlockContent from '@sanity/block-content-to-react';
import "./index.css"

const client = sanityClient({
  projectId: 'tdhcph14',
  dataset: 'production',
  apiVersion: '2019-01-29', // use current UTC date - see "specifying API version"!
  token: '',
   // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})


const IndexPage = () => {
    const [data, setData] = useState([
        {
           title: 'Hello',
           body: []
        }, 
        {
            title: 'World',
            body: []
        }
    ])

    useEffect(() => {

    client.fetch("*[_type == 'post']").then(documents => {
        console.log("sanity document: ", documents)
        setData(documents)
    }).catch(e => console.log("e: ",e))


    }, [])

    return (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <LandingBio />
    {data.map((item, index) => {
        return(
            <div className="block">
                <h1>{item.title}</h1>
                <BlockContent blocks={item.body} />
            </div>
        )
    })}
    <h1>HuSCII + WICS</h1>
  </Layout>
)
    }

export default IndexPage