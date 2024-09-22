const IsSetObject = (key) => {
	return Object.keys(key).length > 0;
};

class Validator {
	IsSetObject = IsSetObject;

	SetObject(parent, append) {
		return Object.assign(parent, append);
	}

	IsSet(key) {
		if (key === "" || key === " ") {
			return false;
		}

		if (typeof key === "undefined" || key === null || key === undefined) {
			return false;
		}

		if (typeof key === "bool" || typeof key === "boolean") {
			return key;
		}

		return true;
	}

	SetRequest(req) {
		const { body } = req;
		const data = body.data ? JSON.parse(body.data) : {};
		const datas = body.datas ? JSON.parse(body.datas) : {};

		let validReq = IsSetObject(data) ? data : false;
		validReq = !validReq && IsSetObject(datas) ? datas : validReq;
		validReq = !validReq && IsSetObject(body) ? body : validReq;

		return validReq;
	}

	SetParams(req) {
		const { query, params } = req;

		let validReq = IsSetObject(query) ? query : false;
		validReq = !validReq && IsSetObject(params) ? params : validReq;

		return validReq;
	}

	IsValidString(check, value) {
		if (check === "name") {
			return /^[a-zA-Z\s]+$/.exec(value);
		}
		if (check === "username") {
			return /^[a-zA-Z0-9_]{1,21}$/.exec(value);
		}
		if (check === "email") {
			return /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.exec(value);
		}
	}

	IsValidRequest(format, syntax) {
		return IsSetObject(syntax) ? Object.keys(syntax).filter((key) => format.includes(key)) : false;
	}
}

module.exports = Validator;
