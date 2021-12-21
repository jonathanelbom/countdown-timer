import '../styles/globals.scss'

const SafeHydrate = ({ children }) => (
  <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
  </div>
);

function MyApp({ Component, pageProps }) {
  return <SafeHydrate><Component {...pageProps} /></SafeHydrate>;
}

export default MyApp
