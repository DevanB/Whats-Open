const buildAddress = (location: any) => {
  let formatted_address = "";
  if (location.address1) formatted_address += location.address1 + ", ";
  if (location.city) formatted_address += location.city + ", ";
  if (location.state) formatted_address += location.state + " ";
  if (location.zip_code) formatted_address += location.zip_code;
  return formatted_address;
};

export default buildAddress;
