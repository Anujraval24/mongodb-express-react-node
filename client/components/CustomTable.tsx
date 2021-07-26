import Image from 'next/image';
import { FC } from 'react';

const CustomTable: FC<{
	isOpen: boolean;
	data: any;
	editRecord: any;
}> = ({ data, editRecord }) => {
	return (
		<div className="flex flex-col p-10">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
									>
										First Name
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
									>
										Last Name
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
									>
										Role
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
									>
										Email
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
									>
										IsActive
									</th>
									<th scope="col" className="relative px-6 py-3">
										<span className="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{data?.length > 0 &&
									data?.map((person: any) => (
										<tr key={person.email}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-10 w-10">
														<Image
															width={50}
															height={50}
															className="h-10 w-10 rounded-full"
															src={
																'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61'
															}
															alt=""
														/>
													</div>
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{person.firstName}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm font-medium text-gray-900">
													{person.lastName}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap font-mono uppercase">
												{person.role}
											</td>
											<td>
												<div className="text-sm text-gray-500">{person.email}</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
													{person.isActive ? 'Active' : 'InActive'}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<button
													className="text-green-500 hover:text-green-700"
													onClick={() => {
														editRecord(person);
													}}
												>
													Edit
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomTable;
