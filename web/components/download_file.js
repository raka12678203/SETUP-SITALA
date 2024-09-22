"use client";

// components/Download.js

import React from "react";
import axios from "axios";
import { useState } from "react";

const btnLink = [
	{
		id: 1,
		label: "Data Penggunaan Lahan",
		endpoint: "PenggunaanLahans",
	},
	{
		id: 2,
		label: "Data Pola Ruang",
		endpoint: "PolaRuangs",
	},
	{
		id: 3,
		label: "Data Wilayah",
		endpoint: "Wilayahs",
	},
	{
		id: 4,
		label: "Data ZNT",
		endpoint: "ZNTs",
	},
];

const Download = () => {
	const _url = "https://sitala-api.jurnalpendidikan.online:9000/api/locations/all/datas?filter=";
	const [isLoading, setIsLoading] = useState(false);
	const handleDownload = async (endpoint) => {
		setIsLoading(true);
		try {
			const response = await axios.get(_url + endpoint);
			const data = response.data;

			const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "Data_" + endpoint + ".json";
			document.body.appendChild(a);
			a.click();
			a.remove();
		} catch (error) {
			console.error("Failed to fetch data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div
				className="pt-20 lg:pt-40"
				style={{
					backgroundImage: "url('https://wallpaperaccess.com/full/2865574.jpg')",
					minHeight: "93.2vh",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="text-center">
					<h1 className="text-6xl font-bold">Selamat Datang</h1>
					<h1 className="text-2xl">Di Pusat Data SITALA.</h1>
				</div>
				<div className="mt-20 container flex flex-wrap gap-2 justify-center text-white mx-auto">
					{btnLink.map(({ id, label, endpoint }) => (
						<div key={id}>
							<div className="card backdrop-blur-sm bg-base-100/30 w-80 h-50 shadow-xl">
								<div className="card-body">
									<h2 className="card-title font-bold">Download</h2>
									<p>{label}</p>
								</div>
								<div className="card-actions justify-end p-5">
									<button onClick={() => handleDownload(endpoint)} className="btn btn-primary">
										{isLoading ? <span className="loading loading-spinner loading-md text-white"></span> : "Download"}
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Download;
