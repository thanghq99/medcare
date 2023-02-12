function createData(
  staffId,
  specialtyId,
  name,
  phoneNumber,
  email,
  dob,
  address,
  role,
  specialty,
  degree,
  status,
  examinationFee
) {
  return {
    staffId,
    specialtyId,
    name,
    phoneNumber,
    email,
    dob,
    address,
    role,
    specialty,
    degree,
    status,
    examinationFee,
  };
}

const rows = [
  createData(
    0,
    1,
    "Thang",
    "0123456789",
    "thang@thang.com",
    "02/04/1999",
    "trai ca, truong dinh",
    "bac si",
    "mat",
    "giao su",
    "active",
    1000000
  ),
  createData(
    1,
    1,
    "Thang",
    "0123456789",
    "thang@thang.com",
    "02/04/1999",
    "trai ca, truong dinh",
    "bac si",
    "da khoa",
    "giao su",
    "inactive",
    1000000
  ),
  createData(
    2,
    1,
    "Thang",
    "0123456789",
    "thang@thang.com",
    "02/04/1999",
    "trai ca, truong dinh",
    "bac si",
    "rang ham mat",
    "giao su",
    "active",
    1000000
  ),
  createData(
    3,
    1,
    "Thang",
    "0123456789",
    "thang@thang.com",
    "02/04/1999",
    "trai ca, truong dinh",
    "bac si",
    "phu khoa",
    "giao su",
    "active",
    1000000
  ),
  createData(
    4,
    1,
    "Thang",
    "0123456789",
    "thang@thang.com",
    "02/04/1999",
    "trai ca, truong dinh",
    "bac si",
    "rang ham mat",
    "giao su",
    "inactive",
    1000000
  ),
  createData(
    5,
    1,
    "Thang",
    "0123456789",
    "thang@thang.com",
    "02/04/1999",
    "trai ca, truong dinh",
    "bac si",
    "ho hap",
    "giao su",
    "active",
    1000000
  ),
];

export default rows;
