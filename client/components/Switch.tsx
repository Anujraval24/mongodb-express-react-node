import { FC } from 'react';

import { Switch } from '@headlessui/react';

const ToggelSwitch: FC<{
	isenable: boolean;
	toggleChange: (event: any) => void;
	id: string;
}> = ({ isenable, toggleChange, id }) => {
	return (
		<Switch.Group>
			<div className="flex items-center">
				<Switch
					checked={isenable}
					onChange={() => toggleChange({id,isenable})}
					className={`${
						isenable ? 'bg-green-500 focus:ring-green-500' : 'bg-red-500 focus:ring-red-500'
					} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 `}
				>
					<span
						className={`${
							isenable ? 'translate-x-6' : 'translate-x-1'
						} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
					/>
				</Switch>
			</div>
		</Switch.Group>
	);
};

export default ToggelSwitch;
