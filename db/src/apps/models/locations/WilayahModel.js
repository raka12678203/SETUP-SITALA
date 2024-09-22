const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const { mongoose } = require("../../database/Connect.js");
const { Schema, model: Model } = mongoose;

const $getDataSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
	},
	{ timestamps: true },
	{
		writeConcern: {
			w: "majority",
			j: true,
			wtimeout: 1000,
		},
	}
);

class WilayahModel {
	constructor(name) {
		this.name = name;
	}

	GetMongoose = mongoose;

	GetDataFormat = {
		name: { type: "String", required: true, unique: true },
	};

	GetGraphQLModel() {
		return new GraphQLObjectType({
			name: "Wilayah",
			fields: {
				id: { type: GraphQLString },
				name: { type: GraphQLString },
			},
		});
	}

	GetDataModel = new Model("wilayah", $getDataSchema);
}

module.exports = WilayahModel;
