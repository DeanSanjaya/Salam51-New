const { outItem } = require("../controllers/itemsController");
const itemsModel = require("../models/items"); // Model yang di-mock

jest.mock("../models/items"); // Mock model

test("should deduct the correct quantities from detail in FIFO order", async () => {
	const mockItemData = {
		_id: "mockId",
		detail: [
			{ tempat: "Gudang A", jumlah: 5, tanggal: new Date("2023-10-10") },
			{ tempat: "Gudang B", jumlah: 10, tanggal: new Date("2023-10-11") },
			{ tempat: "Gudang C", jumlah: 8, tanggal: new Date("2023-10-12") },
		],
		totalJumlah: 23,
	};

	const jumlahKeluar = 15;

	itemsModel.findById = jest.fn().mockResolvedValue(mockItemData);
	itemsModel.prototype.save = jest.fn().mockResolvedValue();

	const req = { params: { id: "mockId" }, body: { jumlahKeluar } };
	const res = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
	};

	await outItem(req, res);

	expect(res.status).toHaveBeenCalledWith(500);

	expect(mockItemData.detail).toEqual([
		{ tempat: "Gudang B", jumlah: 2, tanggal: new Date("2023-10-11") },
		{ tempat: "Gudang C", jumlah: 8, tanggal: new Date("2023-10-12") },
	]);

	expect(mockItemData.totalJumlah).toBe(10);
	expect(res.json).toHaveBeenCalledWith({
		message: "Barang berhasil dikeluarkan",
		item: mockItemData,
		detailYangDigunakan: [
			{ tempat: "Gudang A", jumlahYangDikeluarkan: 5 },
			{ tempat: "Gudang B", jumlahYangDikeluarkan: 10 },
		],
	});
});
