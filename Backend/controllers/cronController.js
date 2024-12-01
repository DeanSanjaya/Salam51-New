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
	// console.log("Cron job berjalan!");
	try {
		// Ambil semua barang yang memiliki tanggal pertama kali masuk lebih dari 7 hari
		const items = await itemsModel.find({});

		// Iterasi untuk setiap barang
		for (let item of items) {
			// Ambil tanggal barang pertama kali masuk
			const tanggalMasuk = new Date(item.detail[0].tanggal);
			const tanggalSekarang = new Date();

			// Hitung selisih hari antara tanggal masuk dan sekarang
			const selisihHari = Math.ceil((tanggalSekarang - tanggalMasuk) / (1000 * 60 * 60 * 24));

			// Cek apakah barang sudah berada di sistem selama lebih dari 7 hari
			if (selisihHari >= 6) {
				// Ambil data pengeluaran selama 7 hari terakhir
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

				// Jika ada pengeluaran dalam 7 hari terakhir, hitung rerata
				if (pengeluaranDalam7Hari.length > 0) {
					const totalPengeluaran = pengeluaranDalam7Hari[0].totalPengeluaran;

					// Hitung rerata dengan membagi total pengeluaran dengan 7 (satu minggu)
					const rerata = Math.ceil(totalPengeluaran / 6);

					// Update rerata dengan nilai yang baru (menggantikan rerata yang lama)
					await itemsModel.updateOne(
						{ _id: item._id },
						{ $set: { rerata: rerata } } // Hanya menyimpan rerata terbaru
					);

					console.log(`Rerata untuk ${item.nama} telah diperbarui: ${rerata}`);

					// Perhitungan ROP berdasarkan rerata, lead time, dan safety stock
					
					const rop = calculateROP(item.leadTime, item.satuanWaktu, rerata, item.safetyStock);

					// Update ROP setelah perhitungan
					await itemsModel.updateOne({ _id: item._id }, { $set: { ROP: rop } });
					console.log(`ROP untuk ${item.nama} telah diperbarui: ${rop}`);
				} else {
					await itemsModel.updateOne({ _id: item._id }, { $set: { rerata: 0, ROP: item.safetyStock } });
					console.log(`Tidak ada pengeluaran dalam 7 hari untuk ${item.nama}, nilai rop adalah ${item.ROP}`);
				}
			} else {
				console.log(`${item.nama} belum berada di sistem selama 7 hari`);
			}
		}
	} catch (error) {
		console.error("Error updating rerata dan ROP:", error);
	}
});

module.exports = updateRerataCronJob;
