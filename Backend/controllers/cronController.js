const cron = require("node-cron");
const itemsModel = require("../models/items");
const transactionModel = require("../models/transactions");

const convertLeadTimeToDays = (leadTime, satuanWaktu) => {
	switch (satuanWaktu) {
		case "Jam":
			return leadTime / 24;
		case "Bulan":
			return leadTime * 30;
		default:
			return leadTime;
	}
};

const calculateROP = (leadTime, satuanWaktu, rerata, safetyStock) => {
	const leadTimeInDays = convertLeadTimeToDays(parseInt(leadTime, 10), satuanWaktu);
	return Math.ceil(leadTimeInDays * parseFloat(rerata) + parseInt(safetyStock, 10));
};

const updateRerataCronJob = cron.schedule("0 16 * * 6", async () => {
	console.log("Cron job berjalan!\n");
	try {
		// Ambil semua barang
		const items = await itemsModel.find({});
		console.log(`Jumlah barang ditemukan: ${items.length}\n`);

		// Iterasi untuk setiap barang
		for (let item of items) {
			// Ambil tanggal barang pertama kali masuk
			const tanggalMasuk = new Date(item.detail[0].tanggal);
			const tanggalSekarang = new Date();

			// Format tanggal ke dalam bentuk lokal
			const formattedTanggalMasuk = tanggalMasuk.toLocaleDateString("id-ID");
			const formattedTanggalSekarang = tanggalSekarang.toLocaleDateString("id-ID");

			console.log(`Barang: ${item.nama}`);
			console.log(`Tanggal pertama masuk: ${formattedTanggalMasuk}`);
			console.log(`Tanggal saat ini: ${formattedTanggalSekarang}`);

			// Hitung selisih hari
			const selisihHari = Math.ceil((tanggalSekarang - tanggalMasuk) / (1000 * 60 * 60 * 24));
			console.log(`Selisih hari sejak masuk: ${selisihHari} hari\n`);

			// Tampilkan semua tanggal pengeluaran barang beserta jumlahnya
			const transaksiPengeluaran = await transactionModel.find({
				namaBarang: item.nama,
				"pengeluaran.tanggalTransaksi": { $exists: true },
			});

			if (transaksiPengeluaran.length > 0) {
				console.log(`Barang ${item.nama} telah dikeluarkan pada:`);
				transaksiPengeluaran.forEach((transaksi) => {
					transaksi.pengeluaran.forEach((pengeluaran) => {
						const tanggalPengeluaran = new Date(pengeluaran.tanggalTransaksi).toLocaleDateString("id-ID");
						console.log(`- ${tanggalPengeluaran} = ${pengeluaran.jumlah}`);
					});
				});
			} else {
				console.log(`Barang ${item.nama} belum memiliki transaksi pengeluaran.\n`);
			}

			// Cek apakah barang sudah 7 hari atau lebih
			if (selisihHari >= 6) {
				const pengeluaranDalam7Hari = await transactionModel.aggregate([
					{
						$match: {
							namaBarang: item.nama,
							"pengeluaran.tanggalTransaksi": {
								$gte: new Date(new Date().setDate(new Date().getDate() - 6)),
							},
						},
					},
					{ $unwind: "$pengeluaran" },
					{
						$match: {
							"pengeluaran.tanggalTransaksi": {
								$gte: new Date(new Date().setDate(new Date().getDate() - 6)),
							},
						},
					},
					{
						$group: {
							_id: "$namaBarang",
							totalPengeluaran: { $sum: "$pengeluaran.jumlah" },
						},
					},
				]);

				if (pengeluaranDalam7Hari.length > 0) {
					const totalPengeluaran = pengeluaranDalam7Hari[0].totalPengeluaran;
					const rerata = Math.ceil(totalPengeluaran / 6);
					console.log(`Rerata penggunaan barang ${item.nama}: ${rerata}`);

					await itemsModel.updateOne({ _id: item._id }, { $set: { rerata: rerata } });

					const rop = calculateROP(item.leadTime, item.satuanWaktu, rerata, item.safetyStock);
					console.log(`ROP untuk barang ${item.nama}: ${rop}\n`);

					await itemsModel.updateOne({ _id: item._id }, { $set: { ROP: rop } });
				} else {
					await itemsModel.updateOne({ _id: item._id }, { $set: { rerata: 0, ROP: item.safetyStock } });
					console.log(`Tidak ada pengeluaran dalam 7 hari terakhir untuk ${item.nama}. Rerata diatur menjadi 0, ROP diatur menjadi ${item.safetyStock}\n`);
				}
			} else {
				console.log(`Barang ${item.nama} belum berada di sistem selama 7 hari.\n`);
			}
		}
	} catch (error) {
		console.error("Error updating rerata dan ROP:", error);
	}
});

module.exports = updateRerataCronJob;
