// import React from "react";
// import ReactDOM from "react-dom"
// const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });


// function PayPalModal({visible}) {
//   if(!visible){
//     return
//   }
//   const createOrder = (data, actions) => {
//     return actions.order.create({
//       purchase_units: [
//         {
//           amount: {
//             value: "0.01",
//           },
//         },
//       ],
//     });
//   };
//   const onApprove = (data, actions) => {
//     return actions.order.capture();
//   };
//   return (
//     <div className="bg-gray-900 fixed inset-0 z-10 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
//       <PayPalButton
//       createOrder={(data, actions) => createOrder(data, actions)}
//       onApprove={(data, actions) => onApprove(data, actions)}
//     />
//     </div>
//   );
// }
// export default PayPalModal