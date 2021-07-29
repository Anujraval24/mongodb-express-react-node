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
	const [isPopup, setisPopup] = useState(false);
	let [loading, setLoading] = useState(true);
	const [formField, setFormField] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		_id: '',
		isEdit: false,
	});
	useEffect(() => {
		data && data ? setLoading(false) : setLoading(true);
	}, [data]);

	const router = useRouter();
	const RefreshData = () => {
		router.replace(router.asPath);
	};

	const togglePopup = () => {
		if (!isPopup) {
			setFormField({ firstName: '', lastName: '', email: '', password: '', isEdit: false, _id: '' });
		}
		setisPopup((prevState) => !prevState);
	};

	const onSubmit = (event: any) => {
		// event.preventDefault();
		console.log('event :>> ', event);
		if (event.password === undefined) {
			delete event.password;
			event._id = formField._id;
			updateUser(event);
		} else {
			addUser(event);
		}
	};
	const addUser = async (formField: object) => {
		try {
			await axios.post(`http://localhost:4000/api/v1/users/register`, {
				...formField,
			});
			toast.success('data adding success');
		} catch (error) {
			// error in regrestion
			toast.error('data adding failed');
		}
		setisPopup(false);
		RefreshData();
	};
	const updateUser = async (data: object) => {
		try {
			await axios.put(`http://localhost:4000/api/v1/users/update`, {
				...data,
			});
			toast.success('data update success');
		} catch (error) {
			// error in regrestion
			toast.error('data update failed');
		}
		setisPopup(false);
		RefreshData();
	};
	const editRecord = (event: any) => {
		setFormField({ ...event, isEdit: true });
		setisPopup((prevState) => !prevState);
	};
	const userActiveDeActive = (event: any) => {
		setLoading(true);
		changeStatus({ _id: event?.id, status: event?.isenable });
	};

	const changeStatus = async (data: object) => {
		try {
			await axios.put(`http://localhost:4000/api/v1/users/status`, {
				...data,
			});
			RefreshData();
		} catch (error) {
			// error in regrestion
			toast.error('status update failed');
		}
	};

	return (
		<div className="App">
			<Head>
				<title>Home Page</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<header className="text-center animate-bounce bg-green-500 duration-200">
				<h1 className="px-10 py-10  font-semibold font-mono text-white">
					Hello from React ( Next JS ) + Tailwind + Typscript
				</h1>
			</header>
			<div>
				<div
					style={{ position: 'absolute', top: '30px', right: '50px' }}
					className="hover:stroke-current  cursor-pointer hover:fill-current hover:text-gray-700/60"
				>
					<Link href="https://github.com/Anujraval24/mongodb-express-react-node" passHref>
						<a target="_blank">
							<GoMarkGithub size="2em" />
						</a>
					</Link>
				</div>
			</div>
			<div className={isPopup ? 'filter grayscale blur-md contrast-200' : ''}>
				<div className="flex items-center justify-center">
					<button
						type="button"
						onClick={togglePopup}
						className="w-2/12 m-5 py-2 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white text-center text-base font-mono shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
					>
						Add New User
					</button>
				</div>
				<CustomTable
					data={data}
					isOpen={isPopup}
					editRecord={editRecord}
					toggleSwitch={userActiveDeActive}
					isLoading={loading}
				/>
			</div>
			<Popup isOpen={isPopup} toggleModal={togglePopup} onSubmit={onSubmit} formField={formField} />
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
