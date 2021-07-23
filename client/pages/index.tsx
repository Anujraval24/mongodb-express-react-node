import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { GoMarkGithub } from 'react-icons/go';

import CustomTable from '../components/CustomTable';
import Popup from '../components/Popup';
import Link from 'next/link';

const Home: FC<{ data: string[] }> = ({ data }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isPopup, setisPopup] = useState(false);
	const [formField, setFormField] = useState({
		firstName: '',
		lastName: '',
		email: '',
	});

	const [formError, setformError] = useState({
		firstName: '',
		lastName: '',
		email: '',
	});
	useEffect(() => {
		data && data ? setIsLoading(false) : setIsLoading(true);
	}, [data]);

	const togglePopup = () => {
		setisPopup((prevState) => !prevState);
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		event.preventDefault();
		const { value, name } = event?.target;
		setFormField((prevState) => ({ ...prevState, [name]: value }));
	};
	const onSubmit = (event: any) => {
		
		const { firstName, lastName, email } = formField;
		firstName === ''
			? setformError((prevState) => ({ ...prevState, [firstName]: 'firstName is required' }))
			: firstName;
		lastName === ''
			? setformError((prevState) => ({ ...prevState, [lastName]: 'lastName is required' }))
			: lastName;
		email === '' ? setformError((prevState) => ({ ...prevState, [email]: 'email is required' })) : email;
		setFormField((prevState) => ({ ...prevState, [email]: email }));
		event.preventDefault();
		console.log('form submit :>> ');
	};

	return (
		<div className="App">
			<Head>
				<title>Home Page</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<header className="text-center animate-pulse bg-green-400">
				<h1 className="px-10 py-10  font-semibold font-mono text-white">
					Hello from React + Tailwind + Typscript
				</h1>
			</header>
			<div>
				<button
					type="button"
					onClick={togglePopup}
					className="py-2 px-4 hover:animate-pulse bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg float-right m-3 "
				>
					Add
				</button>
				<div
					style={{ position: 'absolute', top: '30px', right: '50px' }}
					className="hover:stroke-current  cursor-pointer hover:fill-current hover:text-gray-700/60"
				>
					<Link href="http://www.google.com" passHref>
						<a target="_blank">
							<GoMarkGithub size="2em" />
						</a>
					</Link>
				</div>
			</div>
			<div className={isPopup ? 'filter grayscale blur-md contrast-200' : ''}>
				{isLoading ? (
					<div className="text-center p-10 bg-gray-400 text-white ">Loading...</div>
				) : (
					<CustomTable data={data} />
				)}
			</div>
			<Popup isOpen={isPopup} toggleModal={togglePopup} formField={formField} handleChange={handleChange} onSubmit={onSubmit} error={formError} />
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
