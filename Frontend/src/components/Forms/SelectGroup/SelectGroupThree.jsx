import { useState } from 'react';

const SelectGroupThree = ({ satuanBarang, setSatuanBarang }) => {
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const options = [
    { value: 'Kg', label: 'Kilogram (Kg)' },
    { value: 'Gram', label: 'Gram' },
    { value: 'Meter', label: 'Meter' },
    { value: 'M2', label: 'Meter Persegi (M2)' },
    { value: 'M3', label: 'Meter Kubik (M3)' },
    { value: 'Unit', label: 'Unit' },
    { value: 'Botol', label: 'Botol' },
    { value: 'Liter', label: 'Liter' },
    { value: 'Sak', label: 'Sak' },
    { value: 'Pcs', label: 'Pieces (Pcs)' },
    { value: 'Roll', label: 'Roll' },
    { value: 'Lembar', label: 'Lembar' },
    { value: 'Other', label: 'Lainnya' }, // Opsi lainnya
  ];

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === 'Other') {
      setIsOtherSelected(true);
      setSatuanBarang(''); // Kosongkan value untuk input teks
    } else {
      setIsOtherSelected(false);
      setSatuanBarang(value); // Tetapkan value dari dropdown
    }
  };

  const handleInputChange = (e) => {
    setSatuanBarang(e.target.value);
  };

  const handleResetToDropdown = () => {
    setIsOtherSelected(false);
    setSatuanBarang(''); // Kosongkan value saat kembali ke dropdown
  };

  return (
    <div className="mb-4.5">
      <label
        className="mb-2.5 block text-black dark:text-white"
        htmlFor="satuan-barang"
      >
        Satuan Barang
      </label>
      <div className="flex items-center">
        {isOtherSelected ? (
          <>
            {/* Input text untuk opsi "lainnya" */}
            <input
              id="satuan-barang"
              type="text"
              placeholder="Masukkan satuan barang"
              value={satuanBarang}
              onChange={handleInputChange}
              className="relative z-20 flex-1 rounded-l border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
            />
            {/* Tombol untuk kembali ke dropdown */}
            <button
              type="button"
              onClick={handleResetToDropdown}
              className="rounded-r bg-gray-200 px-4 py-3 text-black hover:bg-gray-300 dark:bg-form-input dark:text-white dark:hover:bg-form-strokedark"
            >
              ↩️
            </button>
          </>
        ) : (
          <div className="relative z-20 flex-1 bg-transparent dark:bg-form-input">
            {/* Dropdown default */}
            <select
              id="satuan-barang"
              value={satuanBarang || ''}
              onChange={handleSelectChange}
              className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                satuanBarang ? 'text-black dark:text-white' : ''
              }`}
            >
              <option
                value=""
                disabled
                className="text-body dark:text-bodydark"
              >
                Pilih satuan barang
              </option>
              {options.map((opt, index) => (
                <option
                  key={index}
                  value={opt.value}
                  className="text-body dark:text-bodydark"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            {/* Icon for dropdown */}
            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                />
              </svg>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectGroupThree;
