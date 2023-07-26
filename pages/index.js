import AddressInput from '@/Components/AddressInput';
import Head from 'next/head';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
        <title>Address Validator</title>
      </Head>
      <AddressInput />
    </Fragment>
  )
}
