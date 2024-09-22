const redisTempDatas = [];
const Validator = require("../../tools/Validator");

const { SetObject } = new Validator();

class RepositoryService {
	constructor(model, name) {
		this.model = model;
		this.name = name;
	}

	GetName() {
		return this.name;
	}

	GetTempDatas() {
		return redisTempDatas[this.name];
	}

	async SetTempSavesDatas() {
		console.log(`Setup Temporary Datas ${this.name} is Starting...`);
		setTimeout(async () => {
			const datas = await this.model.find().exec();
			redisTempDatas[this.name] = SetObject({}, { datas });
			// console.log(redisTempDatas[this.name])
			console.log(`Save to temporary ${this.name}`);
		}, 1000);
	}

	async Create(data) {
		return await this.model.create(data);
	}

	async FindUsingAggregate($Pipeline) {
		return await this.model.aggregate([$Pipeline]);
	}

	async Find(filter) {
		// console.log(filter);
		// console.log(redisTempDatas[filter]);
		redisTempDatas[filter] = redisTempDatas[filter] ? redisTempDatas[filter] : await this.model.find().exec();
		return redisTempDatas[filter].datas;
	}

	async FindById(id) {
		return redisTempDatas[this.name] ? redisTempDatas[this.name].filter((list) => list._id === id) : await this.model.findById(id).exec();
	}

	async FindByFilter(filter) {
		const { page, document } = filter;

		if (page && document) {
			return await this.model.aggregate([{ $match: filter }, { $skip: (parseInt(page) - 1) * parseInt(document) }, { $limit: parseInt(document) }]);
		}

		return await this.model.findOne(filter).exec();
	}

	async FindByIdAndUpdate(id, data) {
		return await this.model.findByIdAndUpdate(id, data).exec();
	}

	async FindOneAndUpdate(req, data) {
		const filter = SetParams(req) || SetRequest(req);
		return await this.model.findOneAndUpdate(filter, data).exec();
	}

	async FindByIdAndRemove(id) {
		return await this.model.findByIdAndRemove(id).exec();
	}

	async FindOneAndRemove(req) {
		const filter = SetParams(req) || SetRequest(req);
		return await this.model.findOneAndRemove(filter).exec();
	}
}

module.exports = RepositoryService;
