import Head from 'next/head'

export const Metatags = ({
  title = 'Vinland Saga',
  description = 'A platform where chefs can write their recipes, share them, and connect with other chefs.',
  image = '/assets/hot-pot-jpg',
}) => (
  <Head>
    <title>{title}</title>
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@TAbrodi" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
  </Head>
)
