import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import Swal from "sweetalert2";
import ReactDOM from "react-dom";
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
// const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

function MembershipPlanModal({ visible, onClose, isFirst }) {
  if (!visible) return null;



  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${amount}.00`,
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    if(amount=='499'){
      planPurchase(30)
    }else if(amount=='999'){
      planPurchase(90)
    }else{
      planPurchase(180)
    }
    return actions.order.capture();
  };
  const onError = (err) => {
    console.log(err);
  };

  const token = JSON.parse(localStorage.getItem("token"));
  const profileId = localStorage.getItem("profile_id");
  const [checkout, setCheckout] = useState(false);
  const [amount, setAmount] = useState("");

  if (visible) {
    document.body.style.overflow = "hidden";
  }

  const planPurchase = (duration) => {
    let data = {
      'user' : profileId,
      'duration' : duration
    }
    axios.post(`membership-purchase-view/`, data, {
      headers: {
        Authorization : `Bearer ${token.access}`
      }
    }).then((res) => {
      Swal.fire("Good job!", `${res.data.message} !`, "success").then((res) => {
        onClose();
      });
  
    })
  }

  return (
    <div className="bg-gray-900 fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
      {!checkout ? (
        <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5 w-3/4">
          <div>
            <h1 className="text-3xl font-bold my-5 mb-10">
              Please choose your Package
            </h1>
          </div>
          <div className={isFirst ? "grid grid-cols-4" : "grid grid-cols-3"}>
            {isFirst ? (<div className="col-span-1 border-2 border-gray-400 hover:border-myBlue mx-2  text-center py-10 px-5">
              <div className="text-gray-700 text-xl font-bold  mb-5">
                Trial Plan
              </div>
              <span className="text-myBlue text-3xl font-bold">$ 0.00</span>
              <div>
                <div className="my-5">
                  <span>15 days</span>
                </div>
                <div className="my-5">
                  <span>5 job posting</span>
                </div>
                {/* <div className="my-5">
                <span>
                  5 profile unlock
                </span>
              </div> */}
                <div className="my-5">
                  <button className="bg-myBlue text-white text-lg px-8 py-1 rounded-3xl"
                  onClick={() => {planPurchase(0)}}>
                    select
                  </button>
                </div>
              </div>
            </div>): ""}
            <div className="col-span-1 border-2 border-gray-400 hover:border-myBlue mx-2  text-center py-10 px-5">
              <div className="text-gray-700 text-xl font-bold  mb-5">
                Basic Plan
              </div>
              <span className="text-myBlue text-3xl font-bold">$ 499.00</span>
              <div>
                <div className="my-5">
                  <span>30 days</span>
                </div>
                <div className="my-5">
                  <span>10 job posting</span>
                </div>
                {/* <div className="my-5">
                <span>
                  5 profile unlock
                </span>
              </div> */}
                <div className="my-5">
                  <button className="bg-myBlue text-white text-lg px-8 py-1 rounded-3xl"
                  onClick={() => {
                    setAmount("499")
                    setCheckout(true);
                  }}>
                    select
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-1 border-2 border-gray-400 hover:border-myBlue mx-2  text-center py-10 px-5">
              <div className="text-gray-700 text-xl font-bold mb-5">
                Silver Plan
              </div>
              <span className="text-myBlue text-3xl font-bold">$ 999.00</span>
              <div>
                <div className="my-5">
                  <span>90 days</span>
                </div>
                <div className="my-5">
                  <span>40 job posting</span>
                </div>
                {/* <div className="my-5">
                <span>
                  25 profile unlock / month
                </span>
              </div> */}
                <div className="my-5">
                  <button className="bg-myBlue text-white text-lg px-8 py-1 rounded-3xl"
                  onClick={() => {
                    setAmount("999")
                    setCheckout(true);
                  }}>
                    select
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-1 border-2 border-gray-400 hover:border-myBlue mx-2  text-center py-10 px-5">
              <div className="text-gray-700 text-xl font-bold  mb-5">
                Golden Plan
              </div>
              <span className="text-myBlue text-3xl font-bold">$ 1499.00</span>
              <div>
                <div className="my-5">
                  <span>180 days</span>
                </div>
                <div className="my-5">
                  <span>100 job posting</span>
                </div>
                {/* <div className="my-5">
                <span>
                  50 profile unlock / month
                </span>
              </div> */}
                <div className="my-5">
                  <button
                    className="bg-myBlue text-white text-lg px-8 py-1 rounded-3xl"
                    onClick={() => {
                      setAmount("1499")
                      setCheckout(true);
                    }}
                  >
                    select
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-10">
          <PayPalScriptProvider options={{"client-id" : import.meta.env.VITE_CLIENTID}} >
          <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            onError={(err) => {
              onError(err);
            }}
          />
          </PayPalScriptProvider>
        </div>
      )}
      <button className="bg-red-600 text-white p-2 rounded-lg" onClick={() => onClose()}>close</button>
    </div>
  );
}

export default MembershipPlanModal;
