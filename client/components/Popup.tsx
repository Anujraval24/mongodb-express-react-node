import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
const inputStyle =
	'bg-white h-12 w-full px-5 pr-10 mt-5 rounded-full text-sm border-2 border-solid border-gray-300 focus:outline-none';
const formStyle = 'bg-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2';

const Popup: FC<{
	isOpen: boolean;
	toggleModal: () => void;
	onSubmit: any;
	formField: any;
}> = ({ isOpen, toggleModal, onSubmit, formField: { firstName, lastName, email, isEdit, _id } }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm();

	const ErrorMsg = ({ inputName }: any) => (
		<>
			{errors[inputName] && (
				<small className="text-sm text-red-400 font-medium block mt-1 px-4">
					{errors[inputName]['message']
						? errors[inputName]['message']
						: errors[inputName]['type'] === 'allowed'
						? `invalid username`
						: `${inputName} is required`}
				</small>
			)}
		</>
	);

	useEffect(() => {
		if (isEdit === true) {
			setTimeout(() => {
				setValue('firstName', firstName);
				setValue('lastName', lastName);
				setValue('email', email);
			});
		} else {
			setValue('firstName', '');
			setValue('lastName', '');
			setValue('email', '');
		}
	}, [email, firstName, isEdit, isOpen, lastName, setValue]);
	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={toggleModal}>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span className="inline-block h-screen align-middle" aria-hidden="true">
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<form className={formStyle} onSubmit={handleSubmit(onSubmit)}>
									<h3 className="text-lg text-center px-4 my-3">Add User</h3>

									<input
										className={inputStyle}
										placeholder="First Name"
										{...register('firstName', { required: true })}
									/>
									<ErrorMsg inputName="firstName" />

									<input
										className={inputStyle}
										placeholder="last Name"
										{...register('lastName', {
											required: true,
										})}
									/>
									<ErrorMsg inputName="lastName" />
									<input
										className={inputStyle}
										placeholder="Email"
										{...register('email', { required: true })}
										type="email"
									/>
									<ErrorMsg inputName="email" />

									{!isEdit && (
										<Fragment>
											<input
												className={inputStyle}
												placeholder="Password"
												{...register('password', { required: !!isEdit })}
												type="password"
											/>
											<ErrorMsg inputName="password" />
										</Fragment>
									)}
									{isEdit === false ? (
										<input
											type="submit"
											className="w-full text-md px-5 py-2 my-4 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
										/>
									) : (
										<input
											type="submit"
											className="w-full text-md px-5 py-2 my-4 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
											value="update"
										/>
									)}
								</form>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default Popup;
