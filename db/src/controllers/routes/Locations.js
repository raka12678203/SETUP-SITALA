const { Router } = require("express");
const router = new Router();

const ServiceInterfaces = require("../ServiceInterfaces.js");

const PenggunaanLahanSetup = require("../services/locations/PenggunaanLahanService.js");
const BidangTanahSetup = require("../services/locations/BidangTanahService.js");
const PolaRuangSetup = require("../services/locations/PolaRuangService.js");
const WilayahSetup = require("../services/locations/WilayahService.js");
const ZNTSetup = require("../services/locations/ZNTService.js");
const BatasWilayahSetup = require("../services/locations/BatasWilayahService.js");

const PenggunaanLahanService = new PenggunaanLahanSetup();
const BidangTanahService = new BidangTanahSetup();
const PolaRuangService = new PolaRuangSetup();
const WilayahService = new WilayahSetup();
const ZNTService = new ZNTSetup();
const BatasWilayahService = new BatasWilayahSetup();

const PenggunaanLahan = new ServiceInterfaces(PenggunaanLahanService);
const BidangTanah = new ServiceInterfaces(BidangTanahService);
const PolaRuang = new ServiceInterfaces(PolaRuangService);
const Wilayah = new ServiceInterfaces(WilayahService);
const ZNT = new ServiceInterfaces(ZNTService);
const BatasWilayah = new ServiceInterfaces(BatasWilayahService);

try {
	setTimeout(async () => {
		await PenggunaanLahan.SetupData();
		await BidangTanah.SetupData();
		await PolaRuang.SetupData();
		await Wilayah.SetupData();
		await ZNT.SetupData();
		await BatasWilayah.SetupData();

		// router.use("/penggunaan_lahan", await PenggunaanLahan.SetupRouter());
		// router.use("/bidang_tanah", await BidangTanah.SetupRouter());
		// router.use("/pola_ruang", await PolaRuang.SetupRouter());
		// router.use("/wilayah", await Wilayah.SetupRouter());
		// router.use("/znt", await ZNT.SetupRouter());

		router.use(await PenggunaanLahan.SetupRouter());

		console.log("Router Locations Ready!");
	}, 1000);
} catch (err) {
	console.log(`Endpoint catch err: ${err}`);
}

module.exports = router;
