"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, LayersControl, LayerGroup, ZoomControl, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-search/dist/leaflet-search.src.css";
import "leaflet-search/dist/leaflet-search.src";
import "@/components/maps/MapBidangtanah.css";

// import components

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

const MapTataruang = (props, items) => {
	const { selectPosition } = props;
	const locationSelection = [selectPosition?.lat, selectPosition?.lon];

	const [geoJsonData, setGeoJsonData] = useState(null);

	// const url = "http://localhost:3001/api/locations/all/datas?filter=PenggunaanLahans";
	// const url = "http://localhost:3001/api/locations/penggunaan_lahan/all/datas";
	const url = "https://sitala-api.jurnalpendidikan.online:9000/api/locations/all/datas?filter=PenggunaanLahans";

	const fetchGeoJSONData = async () => {
		try {
			setTimeout(async () => {
				const response = await fetch(url);
				const { datas } = await response.json();
				setGeoJsonData(datas);
				// console.log(datas);
			}, 3000);
		} catch (error) {
			console.error("Error fetching GeoJSON data:", error);
		}
	};

	useEffect(() => {
		fetchGeoJSONData();
	}, []);

	const onEachData = (feature, layer) => {
		const kode = feature.properties.KODE;
		const kondisi = feature.properties.KONDISI;
		const lsd = feature.properties.LSD;
		const rtrw = feature.properties.RTRW;
		const luas = feature.properties.LUAS;
		const rdtr = feature.properties.RDTR;
		const kesimpulan = feature.properties.KESIMPULAN;

		if (kode) {
			layer.bindPopup(`
			<strong>KETERANGAN</strong>
			</br></br>
			<strong>LSD: </strong>${lsd}
			</br>
			<strong>RTRW: </strong>${rtrw}
			</br>
			<strong>LUAS: </strong>${luas}
			</br>
			<strong>RDTR: </strong>${rdtr}
			</br>
			<strong>KONDISI: </strong>${kondisi}
			</br></br>
			<strong>${kesimpulan}</strong>
			`);
		}
	};

	const center = [-8.046229306245607, 110.81319196357789];

	// filtering data Penggunaan lahan
	let Koreksi_pengurang = null;
	let Sepakat_dipertahankan = null;
	let Sepakat_tidak_dipertahankan = null;

	if (geoJsonData) {
		Koreksi_pengurang = geoJsonData.features.filter((list) => list.properties.KESIMPULAN === "Koreksi Pengurang");
		// console.log(Koreksi_pengurang);
	}

	if (geoJsonData) {
		Sepakat_dipertahankan = geoJsonData.features.filter((list) => list.properties.KESIMPULAN === "Sepakat Dipertahankan");
		// console.log(Sepakat_dipertahankan);
	}

	if (geoJsonData) {
		Sepakat_tidak_dipertahankan = geoJsonData.features.filter((list) => list.properties.KESIMPULAN === "Sepakat Tidak Dipertahankan");
		// console.log(Sepakat_tidak_dipertahankan);
	}

	return (
		<>
			<MapContainer center={center} zoom={13} style={{ height: "93.2dvh", width: "100%" }} zoomControl={false}>
				{/* own component */}
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
					{/* LSD */}
					<LayersControl.Overlay checked name="Koreksi Pengurang">
						{Koreksi_pengurang && <GeoJSON data={Koreksi_pengurang} style={{ weight: 2, color: "#5d80ff" }} onEachFeature={onEachData} />}
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="Seapakat Dipertahankan">
						{Sepakat_dipertahankan && <GeoJSON data={Sepakat_dipertahankan} style={{ weight: 2, color: "#3dff54" }} onEachFeature={onEachData} />}
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="Seapakat Tidak Dipertahankan">
						{Sepakat_tidak_dipertahankan && <GeoJSON data={Sepakat_tidak_dipertahankan} style={{ weight: 2, color: "#ff8001" }} onEachFeature={onEachData} />}
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="Map Label">
						<TileLayer url="http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
					</LayersControl.Overlay>

					{/* LSD */}
				</LayersControl>
				{/* {geoJsonData && geoJsonLayerRef.current && <SearchControl geoJsonLayer={geoJsonLayerRef.current} className="input input-bordered" />} */}

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
			</MapContainer>

			{/* ---------- example --------- */}
			{/* <div className="absolute bottom-5 left-0 w-full z-[10000] p-3">
				<div className="flex">
					<h1 className="z-[100000] btn btn-primary bottom-0 left-0">TEST</h1>
					<input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
				</div>
			</div> */}
		</>
	);
};

export default MapTataruang;
