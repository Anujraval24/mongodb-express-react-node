import { FC, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

import CustomTable from '../components/CustomTable';

const Home: FC<{ data: string[] }> = ({ data }) => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className="App">
			<Head>
				<title>Home Page</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<header className="text-center">
				<h1 className="px-10 py-10 bg-green-400 font-semibold font-mono text-white">
					Hello from React ( Next JS ) + Tailwind CSS + Typscript
				</h1>
			</header>

			<div>
				{isLoading ? (
					<div className="text-center p-10 bg-gray-400 text-white ">Loading...</div>
				) : (
					<CustomTable data={data} />
				)}
			</div>
		</div>
	);
};

export async function getServerSideProps() {
	const { data } = await axios.get(`${process.env.API_URL}/users`);

	return {
		props: { data: data?.data, revalidate: 15 }, // will be passed to the page component as props
	};
}
export default Home;
