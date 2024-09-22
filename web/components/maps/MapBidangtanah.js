import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, LayersControl, LayerGroup, ZoomControl, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-search/dist/leaflet-search.src.css";
import "leaflet-search/dist/leaflet-search.src";
// import "@/components/maps/MapBidangtanah.css";

// import images

// import Data

// Ensure leaflet-search is properly imported
import L from "leaflet";

function ResetCenterView(props) {
	const { selectPosition } = props;
	const map = useMap();

	useEffect(() => {
		if (selectPosition) {
			map.setView(L.latLng(selectPosition?.lat, selectPosition?.lon), map.getZoom(), {
				animate: true,
			});
		}
	}, [selectPosition]);

	return null;
}

const SearchControl = ({ geoJsonLayer }) => {
	const map = useMap();
	const searchControlRef = useRef(null);

	useEffect(() => {
		if (map && geoJsonLayer && !searchControlRef.current) {
			searchControlRef.current = new L.Control.Search({
				layer: geoJsonLayer,
				propertyName: "NOMOR_HAK",
				zoom: 18,
				collapsed: true,
				textPlaceholder: "Cari Nama..",
				position: "topright",
				textErr: "Pemilik tidak sesuai.",
			});
			map.addControl(searchControlRef.current);
		}
	}, [map, geoJsonLayer]);

	return null;
};

const MapBidangtanah = (props) => {
	const center = [-8.046229306245607, 110.81319196357789];

	const { selectPosition } = props;
	const locationSelection = [selectPosition?.lat, selectPosition?.lon];

	const [geoJsonData, setGeoJsonData] = useState(null);
	const geoJsonLayerRef = useRef(null);

	const url = "https://sitala-api.jurnalpendidikan.online:9000/api/locations/all/datas?filter=BidangTanahs";
	// const url = "http://localhost:3001/api/locations/all/datas?filter=BidangTanahs";

	const fetchGeoJSONData = async () => {
		try {
			const response = await fetch(url);
			const { datas } = await response.json();
			setGeoJsonData(datas);
			// console.log(datas);
		} catch (error) {
			console.error("Error fetching GeoJSON data:", error);
		}
	};

	useEffect(() => {
		fetchGeoJSONData();
	}, []);

	const [batasADM, setbatasADM] = useState(null);

	const _url = "https://sitala-api.jurnalpendidikan.online:9000/api/locations/all/datas?filter=BatasWilayahs";
	// const _url = "http://localhost:3001/api/locations/all/datas?filter=BatasWilayahs";

	const fetchBatasADMData = async () => {
		try {
			const response = await fetch(_url);
			const { datas } = await response.json();
			setbatasADM(datas);
			// console.log(datas);
		} catch (error) {
			console.error("Error fetching GeoJSON data:", error);
		}
	};

	useEffect(() => {
		fetchBatasADMData();
	}, []);

	const onEachData = (feature, layer) => {
		const pemilik = feature.properties.PEMILIK;
		const kecamatan = feature.properties.KECAMATAN;
		const kelurahan = feature.properties.KELURAHAN;
		const rtrw = feature.properties.RTRW;
		const coordinates = feature.properties.KOORDINAT;
		const _layer = feature.properties.LAYER;

		if ((_layer, pemilik)) {
			layer.bindPopup(
				`<strong>KECAMATAN :</strong> ${kecamatan}</br><strong>KELURAHAN: </strong>${kelurahan} <br/> <strong> PEMILIK : </strong> ${pemilik}<br/><strong>RTRW :</strong> ${rtrw}</br><strong>KOORDINAT :</strong> ${coordinates}<br/>${_layer}`
			);
		}
	};

	let BelumSertifikat = null;
	let BidangBersertifikat = null;
	let PemerintahPusat = null;
	let PemerintahKELURAHAN = null;
	let PemerintahDesa = null;

	if (geoJsonData) {
		BelumSertifikat = geoJsonData.features.filter((list) => {
			if (list.properties.LAYER.toLowerCase() === "tanah bersertifikat") {
				return list;
			}
		});
		// console.log(BelumSertifikat);
	}
	if (geoJsonData) {
		PemerintahKELURAHAN = geoJsonData.features.filter((list) => list.properties.LAYER === "Milik Pemerintah Kelurahan");
		// console.log(PemerintahKELURAHAN);
	}
	if (geoJsonData) {
		PemerintahDesa = geoJsonData.features.filter((list) => list.properties.LAYER === "Milik Pemerintah Desa");
		// console.log(PemerintahDesa);
	}
	if (geoJsonData) {
		PemerintahPusat = geoJsonData.features.filter((list) => list.properties.LAYER === "Milik Pemerintah Pusat");
		// console.log(PemerintahPusat);
	}
	if (geoJsonData) {
		BidangBersertifikat = geoJsonData.features.filter((list) => list.properties.LAYER === "Tanah Bersertifikat");
		// console.log(BidangBersertifikat);
	}

	return (
		<>
			{/* Page content here */}
			<MapContainer center={center} zoom={14} style={{ height: "93.2dvh", width: "100%" }} zoomControl={false}>
				<div className="z-[10000] flex justify-center items-center h-full">
					{geoJsonData === null && (
						<div className="flex justify-center items-center h-full w-full z-[10000] text-6xl backdrop-blur-sm bg-slate-600/30">
							<span className="loading loading-spinner loading-lg text-primary"></span>
						</div>
					)}
				</div>
				<ZoomControl position="bottomright" />
				<LayersControl position="bottomleft" collapsed={false}>
					<LayersControl.BaseLayer name="Base">
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="Dark">
						<TileLayer
							url="http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="Satellite" checked={true}>
						<TileLayer url="http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
					</LayersControl.BaseLayer>

					{/* ALL DATA FOR SEARCH */}

					<LayerGroup>{geoJsonData && <GeoJSON data={geoJsonData} style={{ weight: 0.5, color: "gray" }} ref={geoJsonLayerRef} onEachFeature={onEachData} />}</LayerGroup>

					{/* ALL DATA FOR SEARCH */}

					{/* batas adm */}
					<LayerGroup>{batasADM && <GeoJSON data={batasADM} style={{ weight: 2, color: "gray" }} />}</LayerGroup>

					<LayersControl.Overlay checked name="Belum Bersertifikat">
						<LayerGroup>{BelumSertifikat && <GeoJSON data={BelumSertifikat} style={{ weight: 1, color: "#42454a" }} onEachFeature={onEachData} />}</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="Milik Pemerintah Pusat">
						<LayerGroup>{PemerintahPusat && <GeoJSON data={PemerintahPusat} style={{ weight: 2, color: "#231782" }} onEachFeature={onEachData} />}</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="Milik Pemerintah Desa">
						<LayerGroup>{PemerintahDesa && <GeoJSON data={PemerintahDesa} style={{ weight: 2, color: "#337d1c" }} onEachFeature={onEachData} />}</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="Tanah Bersertifikat">
						<LayerGroup>{BidangBersertifikat && <GeoJSON data={BidangBersertifikat} style={{ weight: 2, color: "#777d1c" }} onEachFeature={onEachData} />}</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="Milik Pemerintah Kelurahan">
						<LayerGroup>{PemerintahKELURAHAN && <GeoJSON data={PemerintahKELURAHAN} style={{ weight: 2, color: "#7a1a1c" }} onEachFeature={onEachData} />}</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="Map Label">
						<TileLayer url="http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
					</LayersControl.Overlay>
				</LayersControl>
				{selectPosition && (
					<Marker
						position={locationSelection}
						icon={L.divIcon({
							iconSize: [38, 38],
							className: "pi pi-map-marker text-4xl text-red-600",
						})}
					>
						<Popup>Anda disini.</Popup>
					</Marker>
				)}
				<ResetCenterView selectPosition={selectPosition} />
				<div className="flex">{geoJsonData && geoJsonLayerRef.current && <SearchControl geoJsonLayer={geoJsonLayerRef.current} />}</div>
			</MapContainer>
		</>
	);
};

export default MapBidangtanah;
