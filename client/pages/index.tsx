import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { GoMarkGithub } from 'react-icons/go';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

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
		password: '',
		isEdit: false,
	});

	const [formError, setformError] = useState({
		firstNameError: '',
		lastNameError: '',
		emailError: '',
		passwordError: '',
	});
	useEffect(() => {
		data && data ? setIsLoading(false) : setIsLoading(true);
	}, [data]);

	const router = useRouter();
	const RefreshData = () => {
		router.replace(router.asPath);
	};

	const togglePopup = () => {
		setisPopup((prevState) => !prevState);
		setFormField({ firstName: '', lastName: '', email: '', password: '', isEdit: false });
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		event.preventDefault();
		const { value, name } = event?.target;
		console.log('value,name :>> ', value, name);
		setFormField((prevState) => ({ ...prevState, [name]: value }));
	};
	const onSubmit = (event: any) => {
		console.log('event :>> ', event);
		event.preventDefault();
		const { firstName, lastName, email, password } = formField;
		if (firstName && lastName && email && password) {
			// data submit
			addUser(formField);
		} else {
			!firstName
				? setformError((prevState) => ({ ...prevState, firstNameError: 'firstName is required' }))
				: firstName;
			!lastName
				? setformError((prevState) => ({ ...prevState, lastNameError: 'lastName is required' }))
				: lastName;
			!email ? setformError((prevState) => ({ ...prevState, emailError: 'email is required' })) : email;
			!password
				? setformError((prevState) => ({ ...prevState, passwordError: 'password is required' }))
				: password;
		}
	};
	const addUser = async (formField: object) => {
		try {
			await axios.post(`http://localhost:4000/api/v1/users/register`, {
				...formField,
			});
			setisPopup(false);
			toast.success('data adding success');
			RefreshData();
		} catch (error) {
			// error in regrestion
			toast.error('data adding failed');
		}
	};
	const editRecord = (event: any) => {
		setFormField({ ...event, isEdit: true });

		setisPopup((prevState) => !prevState);
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
					<CustomTable data={data} isOpen={isPopup} editRecord={editRecord} />
				)}
			</div>
			<Popup
				isOpen={isPopup}
				toggleModal={togglePopup}
				formField={formField}
				handleChange={handleChange}
				onSubmit={onSubmit}
				error={formError}
			/>
			<Toaster />
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
