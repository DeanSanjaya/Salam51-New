const { addDetail } = require("../controllers/itemsController");
const itemsModel = require("../models/items");

jest.mock("../models/items");

describe("FIFO addDetail Function", () => {
	it("should add detail and sort by date in ascending order", async () => {
		const item = {
			detail: [
				{ jumlah: 10, tanggal: new Date("2023-10-10"), tempat: "Gudang A" },
				{ jumlah: 5, tanggal: new Date("2023-10-11"), tempat: "Gudang B" },
			],
			save: jest.fn(),
		};

		itemsModel.findById.mockResolvedValue(item);

		const req = {
			params: { id: "item-id" },
			body: { jumlah: "8", tanggal: "2023-10-09", tempat: "Gudang C" },
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await addDetail(req, res);

		expect(item.detail).toHaveLength(3);
		expect(item.detail[0].tanggal).toEqual(new Date("2023-10-09"));
		expect(item.detail[1].tanggal).toEqual(new Date("2023-10-10"));
		expect(item.detail[2].tanggal).toEqual(new Date("2023-10-11"));
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(item);
	});

	it("should return a 400 status for invalid data", async () => {
		itemsModel.findById.mockResolvedValue({});

		const req = {
			params: { id: "item-id" },
			body: { jumlah: "invalid", tanggal: "invalid-date" },
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await addDetail(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ message: "Data tidak valid" });
	});

	it("should calculate the correct totalJumlah after adding detail", async () => {
		const item = {
			detail: [{ jumlah: 10, tanggal: new Date("2023-10-10"), tempat: "Gudang A" }],
			save: jest.fn(),
		};

		itemsModel.findById.mockResolvedValue(item);

		const req = {
			params: { id: "item-id" },
			body: { jumlah: "5", tanggal: "2023-10-12", tempat: "Gudang B" },
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await addDetail(req, res);

		expect(item.totalJumlah).toBe(15); // 10 (existing) + 5 (new)
	});
});
