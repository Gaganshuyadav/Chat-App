import React from 'react'
import { Helmet} from "react-helmet-async";

const Title = ( { Title="Chatapp", description="this is chatapp"}) => {
  return (
    <Helmet>
        <title>{Title}</title>
        <meta description={description} />
    </Helmet>
  )
}

export default Title