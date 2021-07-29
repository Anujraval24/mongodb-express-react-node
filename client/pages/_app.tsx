import type { AppProps } from 'next/app';

import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { css } from '@emotion/react';
export const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

import { FetchProvider } from '../context/FetchContext';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<FetchProvider>
			<Component {...pageProps} />
		</FetchProvider>
	);
}
export default MyApp;
