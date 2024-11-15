export const convertLeadTimeToDays = (leadTime, satuanWaktu) => {
  switch (satuanWaktu) {
    case 'Jam':
      return leadTime / 24;
    case 'Bulan':
      return leadTime * 30;
    default:
      return leadTime;
  }
};

export const calculateROP = (leadTime, satuanWaktu, rerata, safetyStock) => {
  const leadTimeInDays = convertLeadTimeToDays(
    parseInt(leadTime, 10),
    satuanWaktu,
  );

  const ROP = Math.ceil(
    leadTimeInDays * parseFloat(rerata) + parseInt(safetyStock, 10),
  );

  return ROP;
};
