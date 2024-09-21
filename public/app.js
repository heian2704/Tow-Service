import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';
import '../styles/globals.css'; // Your custom CSS

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" />
    </>
  );
}

export default MyApp;
