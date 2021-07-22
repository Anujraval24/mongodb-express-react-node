import { userModel } from '../models';

const findAllQuery = async (query) => {
	let { search, _id, limit, page, role, accountType, isVerified } = query;
	let whereClause = {};
	if (search) {
		search = new RegExp(search, 'ig');
		whereClause = {
			$or: [{ email: search }, { name: search }],
		};
	}
	if (_id) {
		whereClause = { ...whereClause, _id };
	}
	if (role) {
		whereClause = { ...whereClause, role };
	}
	if (accountType) {
		whereClause = { ...whereClause, accountType };
	}
	if (isVerified) {
		whereClause = { ...whereClause, isVerified };
	}

	const users = await userModel
		.find(whereClause, { password: 0 })
		.skip(page > 0 ? +limit * (+page - 1) : 0)
		.limit(+limit || 20);
	const totalCount = await userModel.find().countDocuments();
	return { users, totalCount };
};

export default { findAllQuery };
