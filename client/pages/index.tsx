import { FC, useState } from 'react';
import axios from 'axios';

import CustomTable from '../components/CustomTable';

const Home: FC<{ data: string[] }> = ({ data }) => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className="App">
			<header className="text-center">
				<h1 className="px-10 py-10 bg-green-400 font-semibold font-mono text-white">
					Hello from React + Tailwind + Typscript
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

export async function getServerSideProps(context) {
	const { data } = await axios.get(`${process.env.API_URL}/users`);

	return {
		props: { data: data?.data, revalidate: 15 }, // will be passed to the page component as props
	};
}
export default Home;
