import AddressInput from '@/Components/AddressInput';
import Head from 'next/head';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Address Validator</title>
        <link href='https://unpkg.com/maplibre-gl@3.1.0/dist/maplibre-gl.css' rel='stylesheet' />
      </Head>
      <AddressInput />
    </Fragment>
  )
}
