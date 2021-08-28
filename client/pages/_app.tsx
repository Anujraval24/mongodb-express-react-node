import type { AppProps } from 'next/app';

import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { css } from '@emotion/react';
import { Toaster } from 'react-hot-toast';

export const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
			<Component {...pageProps} />
		</>
	);
}
export default MyApp;
