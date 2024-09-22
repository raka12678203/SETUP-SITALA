const status_code = require("../apps/configs/Status.js");

class ServiceInterfaces {
	constructor(modelService) {
		this._Service = modelService;
	}

	async SetupData() {
		await this._Service.SetTempSavesDatas();
	}

	SetupRouter() {
		const { Router } = require("express");
		const router = new Router();

		router.all(/^\/control/, async (req, res, next) => {
			await this._Service.SetTempSavesDatas();
			next();
		});

		router.post("/control/create", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.CreateData(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string" || !Callback.length) {
						throw new Error(Callback);
					}

					if (typeof Callback === "object") {
						const [msg, format] = Callback;
						return res.status(status_code.NOT_FOUND).json({ status: status_code.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback.length) {
					return res.status(status_code.CREATED).json({ status: status_code.CREATED, message: Callback });
				}
				return res.status(status_code.OKE).json({ status: status_code.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(status_code.SERVER_ERROR).json({ status: status_code.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.get("/all/datas", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.GetDatas(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string") {
						throw new Error(Callback);
					}

					if (typeof Callback === "object") {
						const [msg, format] = Callback;
						return res.status(status_code.NOT_FOUND).json({ status: status_code.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback.length) {
					return res.status(status_code.OKE).json({ status: status_code.OKE, message: `Berhasil mengambil data.`, datas: { type: "FeatureCollection", features: Callback } });
				}
				return res.status(status_code.OKE).json({ status: status_code.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(status_code.SERVER_ERROR).json({ status: status_code.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.get("/details/:id", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.GetDataByID(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string") {
						throw new Error(Callback);
					}

					if (typeof Callback === "object") {
						const [msg, format] = Callback;
						return res.status(status_code.NOT_FOUND).json({ status: status_code.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback.length) {
					return res.status(status_code.OKE).json({ status: status_code.OKE, message: `Berhasil mengambil data.`, datas: { type: "FeatureCollection", features: Callback } });
				}
				return res.status(status_code.OKE).json({ status: status_code.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(status_code.SERVER_ERROR).json({ status: status_code.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.get("/filter/details", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.GetDataByFilter(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string") {
						throw new Error(Callback);
					}

					if (typeof Callback === "object") {
						const [msg, format] = Callback;
						return res.status(status_code.NOT_FOUND).json({ status: status_code.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback.length) {
					return res.status(status_code.OKE).json({ status: status_code.OKE, message: `Berhasil mengambil data.`, datas: { type: "FeatureCollection", features: Callback } });
				}
				return res.status(status_code.OKE).json({ status: status_code.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(status_code.SERVER_ERROR).json({ status: status_code.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.put("/control/update/details/:id", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.UpdateDataByID(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string") {
						throw new Error(Callback);
					}

					if (typeof Callback === "object") {
						const [msg, format] = Callback;
						return res.status(status_code.NOT_FOUND).json({ status: status_code.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback.length) {
					return res.status(status_code.CREATED).json({ status: status_code.CREATED, message: Callback });
				}
				return res.status(status_code.OKE).json({ status: status_code.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(status_code.SERVER_ERROR).json({ status: status_code.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.post("/control/update/details/:id", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.UpdateDataByID(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string") {
						throw new Error(Callback);
					}

					if (typeof Callback === "object") {
						const [msg, format] = Callback;
						return res.status(status_code.NOT_FOUND).json({ status: status_code.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback.length) {
					return res.status(status_code.CREATED).json({ status: status_code.CREATED, message: Callback });
				}
				return res.status(status_code.OKE).json({ status: status_code.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(status_code.SERVER_ERROR).json({ status: status_code.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.put("/control/update/filter/details", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.UpdateDataByFilter(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string") {
						throw new Error(Callback);
					}

					if (typeof Callback === "object") {
						const [msg, format] = Callback;
						return res.status(status_code.NOT_FOUND).json({ status: status_code.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback.length) {
					return res.status(status_code.CREATED).json({ status: status_code.CREATED, message: Callback });
				}
				return res.status(status_code.OKE).json({ status: status_code.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(status_code.SERVER_ERROR).json({ status: status_code.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.post("/control/update/filter/details", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.UpdateDataByFilter(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string") {
						throw new Error(Callback);
					}

					if (typeof Callback === "object") {
						const [msg, format] = Callback;
						return res.status(status_code.NOT_FOUND).json({ status: status_code.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback.length) {
					return res.status(status_code.CREATED).json({ status: status_code.CREATED, message: Callback });
				}
				return res.status(status_code.OKE).json({ status: status_code.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(status_code.SERVER_ERROR).json({ status: status_code.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.delete("/control/delete/details/:id", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.DeleteDataByID(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string") {
						throw new Error(Callback);
					}

					if (typeof Callback === "object") {
						const [msg, format] = Callback;
						return res.status(status_code.NOT_FOUND).json({ status: status_code.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback.length) {
					return res.status(status_code.CREATED).json({ status: status_code.CREATED, message: Callback });
				}
				return res.status(status_code.OKE).json({ status: status_code.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(status_code.SERVER_ERROR).json({ status: status_code.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.post("/control/delete/details/:id", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.DeleteDataByID(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string") {
						throw new Error(Callback);
					}

					if (typeof Callback === "object") {
						const [msg, format] = Callback;
						return res.status(status_code.NOT_FOUND).json({ status: status_code.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback.length) {
					return res.status(status_code.CREATED).json({ status: status_code.CREATED, message: Callback });
				}
				return res.status(status_code.OKE).json({ status: status_code.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(status_code.SERVER_ERROR).json({ status: status_code.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.delete("/control/delete/filter/details", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.DeleteDataByFilter(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string") {
						throw new Error(Callback);
					}

					if (typeof Callback === "object") {
						const [msg, format] = Callback;
						return res.status(status_code.NOT_FOUND).json({ status: status_code.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback.length) {
					return res.status(status_code.CREATED).json({ status: status_code.CREATED, message: Callback });
				}
				return res.status(status_code.OKE).json({ status: status_code.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(status_code.SERVER_ERROR).json({ status: status_code.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.post("/control/delete/filter/details", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.DeleteDataByFilter(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string") {
						throw new Error(Callback);
					}

					if (typeof Callback === "object") {
						const [msg, format] = Callback;
						return res.status(status_code.NOT_FOUND).json({ status: status_code.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback.length) {
					return res.status(status_code.CREATED).json({ status: status_code.CREATED, message: Callback });
				}
				return res.status(status_code.OKE).json({ status: status_code.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(status_code.SERVER_ERROR).json({ status: status_code.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		return router;
	}
}

module.exports = ServiceInterfaces;
