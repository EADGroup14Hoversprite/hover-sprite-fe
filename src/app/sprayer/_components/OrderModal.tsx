"use client";
import React, { useState } from "react";
import Button from "./Button";
import { IOrder } from "@/models/Order";
import API from "@/utils/axiosClient";
import RoutingMap from "@/components/map/RoutingMap"; 
import QRmodal from "./QRmodal";

interface OrderModalProps {
  order: IOrder;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ order, onClose }) => {
  const [showQRModal, setShowQRModal] = useState(false)

  const confirmPayment = async () => {
    try {
      await API.post<{ message: string }>(
        `/order/${order.id}/confirm-cash-payment`
      );
    } catch (e) {
      return {
        message: "Failed to confirm cash payment",
      };
    }
    onClose();
  };

  const updateOrderStatus = async (status: string) => {
    try {
      await API.post<{ message: string; order: IOrder }>(
        `/order/${order.id}/update-status`,
        {status}
      );
        } catch (e) {
          return {
            message: "Failed to update order status",
          };
        }
      onClose();
    } 

    const handleQRCodeModal = () => {
      setShowQRModal(true); 
    };

  return (
    <div
      id="order-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
    >
      <div className="relative w-full max-w-6xl h-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
          <div className="flex space-x-2">
          <Button
                className="mr-10 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleQRCodeModal()}
                text="Generate QR code"
              />
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          </div>
          
        </div>

        {/* Modal Body with Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Order Details Section */}
          <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg shadow-inner">
            <div className="space-y-4">
              <div className="pb-2 border-b">
                <h4 className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="material-icons mr-2">Farmer Details</span>
                </h4>
                <p className="text-sm">
                  <strong>Farmer Name:</strong> {order.farmerName}
                </p>
                <p className="text-sm">
                  <strong>Phone Number:</strong> {order.farmerPhoneNumber}
                </p>
                <p className="text-sm">
                  <strong>Address:</strong> {order.address}
                </p>
              </div>

              <div className="pb-2 border-b">
                <h4 className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="material-icons mr-2">Order Info</span>
                </h4>
                <p className="text-sm">
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p className="text-sm">
                  <strong>Crop Type:</strong> {order.cropType}
                </p>
                <p className="text-sm">
                  <strong>Farmland Area:</strong> {order.farmlandArea} acres
                </p>
                <p className="text-sm">
                  <strong>Desired Date:</strong> {new Date(order.desiredDate * 1000).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <strong>Time Slot:</strong> {order.timeSlot}
                </p>
                <p className="text-sm">
                  <strong>Status:</strong>{" "}
                  <span className={order.status === "ASSIGNED" ? "text-red-600" : "text-green-600"}>
                    {order.status}
                  </span>
                </p>
              </div>

              <div className="pb-2">
                <h4 className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="material-icons mr-2">Payment Info</span>            
                </h4>
                <p className="text-sm">
                  <strong>Total Cost:</strong> ${order.totalCost}
                </p>
                <p className="text-sm">
                  <strong>Payment Method:</strong> {order.paymentMethod}
                </p>
                <p className="text-sm">
                  <strong>Payment Status:</strong>{" "}
                  <span className={order.paymentStatus === true ? "text-green-600" : "text-red-600"}>
                  {order.paymentStatus ? "Payment accepted" : "Ongoing"}
                  </span>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mt-4">
              <Button
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                onClick={() => updateOrderStatus("IN_PROGRESS")}
                text="Accept order"
              />
              <Button
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                onClick={() => confirmPayment()}
                text="Confirm payment"
              />
            </div>
          </div>

          {/* Map Section - Slightly Taller */}
          <div className="md:col-span-2 w-full h-auto bg-gray-200 rounded-lg overflow-hidden shadow-inner">
            <div className="h-72"> {/* Slightly increased height */}
              {/* Pass lat and lon to the RoutingMap component */}
              <RoutingMap lat={order.location.latitude} lon={order.location.longitude} />
            </div>
          </div>
        </div>

        {showQRModal && (
          <QRmodal
            order={order}
            onClose={() => setShowQRModal(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default OrderModal;
