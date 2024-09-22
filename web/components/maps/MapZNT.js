"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, LayersControl, LayerGroup, ZoomControl, Marker, Popup, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-search/dist/leaflet-search.src.css";
import "leaflet-search/dist/leaflet-search.src";
import "@/components/maps/MapBidangtanah.css";
import L from "leaflet";

// import images
import placeHolder from "@/public/placeholder.png";

// Import Data asets

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

const MapZNT = (props) => {
	const center = [-8.046229306245607, 110.81319196357789];

	const { selectPosition } = props;
	const locationSelection = [selectPosition?.lat, selectPosition?.lon];

	const [geoJsonData, setGeoJsonData] = useState(null);

	// const url = "http://localhost:3001/api/locations/all/datas?filter=ZNTs";
	// const url = "http://localhost:3001/api/locations/znt/all/datas";
	const url = "https://sitala-api.jurnalpendidikan.online:9000/api/locations/all/datas?filter=ZNTs";

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

	let first = null;
	let second = null;
	let third = null;
	let fourth = null;
	let fifth = null;
	let sixth = null;
	let seventh = null;
	let eighth = null;

	if (geoJsonData) {
		first = geoJsonData.features.filter((list) => list.properties.ZNTB <= 25000);
		// console.log(first);
	}
	if (geoJsonData) {
		second = geoJsonData.features.filter((list) => list.properties.ZNTB > 25000 && list.properties.ZNTB <= 75000);
		// console.log(second);
	}
	if (geoJsonData) {
		third = geoJsonData.features.filter((list) => list.properties.ZNTB > 75000 && list.properties.ZNTB <= 125000);
		// console.log(third);
	}
	if (geoJsonData) {
		fourth = geoJsonData.features.filter((list) => list.properties.ZNTB > 125000 && list.properties.ZNTB <= 350000);
		// console.log(fourth);
	}
	if (geoJsonData) {
		fifth = geoJsonData.features.filter((list) => list.properties.ZNTB > 350000 && list.properties.ZNTB <= 585000);
		// console.log(fifth);
	}
	if (geoJsonData) {
		sixth = geoJsonData.features.filter((list) => list.properties.ZNTB > 585000 && list.properties.ZNTB <= 720000);
		// console.log(sixth);
	}
	if (geoJsonData) {
		seventh = geoJsonData.features.filter((list) => list.properties.ZNTB > 720000 && list.properties.ZNTB <= 1100000);
		// console.log(seventh);
	}
	if (geoJsonData) {
		eighth = geoJsonData.features.filter((list) => list.properties.ZNTB > 1100000);
		// console.log(eighth);
	}

	return (
		<>
			{/* Page content here */}
			<MapContainer center={center} zoom={13} style={{ height: "93.2dvh", width: "100%" }} zoomControl={false}>
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
					<LayersControl.Overlay checked name="0-25000">
						<LayerGroup>{first && <GeoJSON data={first} style={{ weight: 2, color: "#f7d550" }} />}</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="25000-75000">
						<LayerGroup>{second && <GeoJSON data={second} style={{ weight: 2, color: "#f9c61b" }} />}</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="75000-125000">
						<LayerGroup>{third && <GeoJSON data={third} style={{ weight: 2, color: "#f07808" }} />}</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="125000-350000">
						<LayerGroup>{fourth && <GeoJSON data={fourth} style={{ weight: 2, color: "#e53e0a" }} />}</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="350000-585000">
						<LayerGroup>{fifth && <GeoJSON data={fifth} style={{ weight: 2, color: "#e20606" }} />}</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="585000-720000">
						<LayerGroup>{sixth && <GeoJSON data={sixth} style={{ weight: 2, color: "#9e100e" }} />}</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="720000-1100000">
						<LayerGroup>{seventh && <GeoJSON data={seventh} style={{ weight: 2, color: "#91100b" }} />}</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="1100000+">
						<LayerGroup>{eighth && <GeoJSON data={eighth} style={{ weight: 2, color: "#630a02" }} />}</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="Map Label">
						<TileLayer url="http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
					</LayersControl.Overlay>
				</LayersControl>

				<div className="absolute top-20 right-0 w-full z-[10000] p-3">{/* <div className="flex">{geoJsonData && geoJsonLayerRef.current && <SearchControl geoJsonLayer={geoJsonLayerRef.current} />}</div> */}</div>

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
		</>
	);
};

export default MapZNT;
