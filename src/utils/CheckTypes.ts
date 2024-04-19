export const CheckTypes = ({ type, customer, carrier }: any) => {
  //   console.log(customer, carrier);

  if (type.toLowerCase().includes("customer")) {
    return customer;
  } else {
    return carrier;
  }
};
