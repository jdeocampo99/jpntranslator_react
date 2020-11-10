export const call_api = () => {
  var conjugation_obj = {};
  fetch("http://localhost:9000/testAPI").then((res) => res.text);
  //.then((res) => )
};
