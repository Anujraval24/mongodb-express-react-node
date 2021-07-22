import type { AppProps } from 'next/app';

import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

import { FetchProvider } from '../context/FetchContext';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<FetchProvider>
			<Component {...pageProps} />
		</FetchProvider>
	);
}
export default MyApp;
