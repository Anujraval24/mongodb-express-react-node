import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, FC } from 'react';

const Popup: FC<{
	isOpen: boolean;
	toggleModal: () => void;
	formField: { firstName: string; lastName: string; email: string; password: string; isEdit: boolean };
	handleChange: any;
	onSubmit: any;
	error: any;
}> = ({ isOpen, toggleModal, formField, handleChange, onSubmit, error }) => {
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
								<form
									className="bg-white  rounded px-8 pt-6 pb-8 mb-4"
									method="post"
									onSubmit={onSubmit}
								>
									<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
										<input
											className="shadow appearance-none border focus:border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
											type="text"
											name="firstName"
											placeholder="First name"
											onChange={handleChange}
											value={formField.firstName}
										/>
										{error?.firstNameError != '' ? (
											<p className="text-red-500 text-xs italic">{error?.firstNameError}</p>
										) : (
											''
										)}
									</div>
									<div className="mb-6">
										<label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
										<input
											className="shadow appearance-none border focus:border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
											type="text"
											name="lastName"
											placeholder="last Name"
											onChange={handleChange}
											value={formField.lastName}
										/>
										{error?.lastNameError != '' ? (
											<p className="text-red-500 text-xs italic">{error?.lastNameError}</p>
										) : (
											''
										)}
									</div>
									<div className="mb-6">
										<label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
										<input
											className="shadow appearance-none border focus:border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
											type="email"
											name="email"
											placeholder="Email Address"
											onChange={handleChange}
											value={formField.email}
										/>
										{error?.emailError != '' ? (
											<p className="text-red-500 text-xs italic">{error?.emailError}</p>
										) : (
											''
										)}
									</div>
									{formField?.isEdit === true ? (
										''
									) : (
										<div className="mb-6">
											<label className="block text-gray-700 text-sm font-bold mb-2">
												password
											</label>
											<input
												className="shadow appearance-none border focus:border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
												type="password"
												name="password"
												placeholder="password"
												onChange={handleChange}
												value={formField.password}
											/>
											{error?.passwordError != '' ? (
												<p className="text-red-500 text-xs italic">{error?.passwordError}</p>
											) : (
												''
											)}
										</div>
									)}
									<div className="flex items-center justify-between">
										<button
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
											type="submit"
										>
											{formField?.isEdit === true ? 'Edit' : 'Add'}
										</button>
									</div>
								</form>
								{/* <button onSubmit={toggleModal}>cancle</button> */}
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default Popup;
