import React from "react"
import { Button } from "antd"
import Seo from "../components/seo"

export default function TestPage() {
  return (
    <div style={{ margin: `3rem auto`, maxWidth: 600 }}>
      <h1>Hello Gatsby!</h1>
      <Button type="primary">Ant Design Button</Button>
    </div>
  )
}

export const Head = () => <Seo title="Test" />