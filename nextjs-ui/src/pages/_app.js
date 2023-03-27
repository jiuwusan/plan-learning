import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  console.log('入口');
  return <Component {...pageProps} />
}
