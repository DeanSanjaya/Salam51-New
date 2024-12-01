import React, { useState } from 'react';

const DynamicFields = ({ attributes, setAttributes }) => {
  const handleAddField = () => {
    setAttributes([...attributes, { label: '', value: '' }]);
  };

  const handleChange = (index, key, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][key] = value;
    setAttributes(updatedAttributes);
  };

  const handleRemoveField = (index) => {
    const updatedAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(updatedAttributes);
  };

  return (
    <div>
      <div className="flex gap-3 mb-5">
        <h4 className="text-black dark:text-white">
          Atribut Tambahan ( jika ada )
        </h4>
        <button
          type="button"
          onClick={handleAddField}
          className="rounded bg-primary text-white hover:bg-opacity-90 px-3"
        >
          Tambah Atribut
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-5">
        {attributes.map((attr, index) => (
          <div key={index} className="flex gap-2 w-[calc(50%-0.5rem)]">
            <input
              type="text"
              placeholder="Contoh: Dimensi, Volume, dan lain-lain"
              className="w-3/5 rounded border-[1.5px] border-stroke py-2 px-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
              value={attr.label}
              onChange={(e) => handleChange(index, 'label', e.target.value)}
            />

            <input
              type="text"
              placeholder="Value"
              className="w-1/5 rounded border-[1.5px] border-stroke py-2 px-3 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
              value={attr.value}
              onChange={(e) => handleChange(index, 'value', e.target.value)}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="w-1/5 self-start py-2 px-3 text-red-500 hover:text-red-700"
            >
              Hapus Atribut
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicFields;
