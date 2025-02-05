"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { DownloadIcon } from "lucide-react";

type ShippingRate = {
  rateId: string;
  carrierFriendlyName: string;
  serviceType: string;
  shippingAmount: {
    amount: number;
    currency: string;
  };
};

// Helper function to safely access address fields
const getAddressField = (
  address: { [key: string]: string },
  field: string
): string => {
  return address[field] || "";
};

export default function TrackingShipment() {
  // State for the shipping address
  const [shipeToAddress, setshipeToAddress] = useState({
    name: "",
    phone: "",
    addressLine1: "1600 Pennsylvania Avenue NW",
    cityLocality: "Washington",
    stateProvince: "DC",
    postalCode: "20500",
    countryCode: "US",
    addressResidentialIndicator: "no",
  });

  // State for shipping rates, selected rate, label, tracking, loading, and errors
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [rateId, setRateId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [shippingLabel, setShippingLabel] = useState<string | null>(null);
  const [trackingInfo, setTrackingInfo] = useState<{
    trackingNumber: string;
    labelId: string;
    carrierCode: string;
  } | null>(null);

  // Handle form submission to fetch shipping rates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setShippingRates([]);

    try {
      const response = await fetch("/api/getShippingRates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipeToAddress,
          packages: [
            {
              weight: { value: 5, unit: "ounce" },
              dimensions: { height: 3, width: 15, length: 10, unit: "inch" },
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setShippingRates(data.shipmentDetails.rateResponse.rates);
    } catch (error) {
      console.error("Error fetching rates:", error);
      setErrors(["An error occurred while fetching rates."]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLabel = async () => {
    if (!rateId) {
      alert("Please select a rate to create a label.");
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const response = await fetch("/api/createShippingLabel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rateId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const labelData = await response.json();
      setShippingLabel(labelData.labelDownload.href);

      setTrackingInfo({
        trackingNumber: labelData.trackingNumber,
        labelId: labelData.labelId,
        carrierCode: labelData.carrierCode,
      });
    } catch (error) {
      console.error("Error creating label:", error);
      setErrors(["An error occurred while creating the label."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen max-w-7xl mx-auto md:pt-28 pt-28 pb-10 md:px-12 px-4 flex flex-col ">
      <h1 className="font-integral font-extrabold md:text-4xl text-3xl md:mb-10 mb-6">
        Shipping Rates Calculator
      </h1>
      <div className=" bg-white shadow-xl rounded-lg lg:p-16 p-4">
        {/* Shipping Address Form */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "name",
              "phone",
              "addressLine1",
              "cityLocality",
              "stateProvince",
              "postalCode",
              "countryCode",
            ].map((field, index) => (
              <input
                key={index}
                type="text"
                placeholder={
                  field === "country"
                    ? "Country Code (e.g., US)"
                    : field.replace(/([A-Z])/g, " $1").trim()
                }
                value={getAddressField(shipeToAddress, field)}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    [field]: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-md shadow-sm"
                required
              />
            ))}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="relative overflow-hidden group transition-all duration-300 ease-in-out px-8 p-6 rounded-3xl text-black bg-gray-200 hover:text-white"
          >
            <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
            <h1 className="relative z-10 flex items-center gap-2">
              {loading ? "Calculating..." : "Fetch Shipping Options"}
            </h1>
          </Button>
        </form>

        {/* Display Error Messages */}
        {errors.length > 0 && (
          <div className="my-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.map((error, index) => (
              <p key={index}>⚠️ {error}</p>
            ))}
          </div>
        )}
      </div>

      {/* Display Available Shipping Rates */}
      {shippingRates.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
          }}
          className="border md:p-14 p-4 shadow-xl rounded-lg w-full bg-white mt-8 "
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Available Shipping Options
          </h2>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            {shippingRates.map((option) => (
              <div
                key={option.rateId}
                className={`p-4 border rounded-lg cursor-pointer transition-colors shadow-sm hover:shadow-lg hover:bg-gray-100 ${
                  rateId === option.rateId
                    ? "border-white bg-gray-200 "
                    : "border-gray-500"
                }`}
                onClick={() => setRateId(option.rateId)}
              >
                <p className="lg:text-xl font-bold text-gray-800">
                  {option.carrierFriendlyName} - {option.serviceType}
                </p>
                <p className="text-gray-500 lg:text-lg">
                  {option.shippingAmount.amount}{" "}
                  {option.shippingAmount.currency}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Show Create Label button when a rate is selected */}
      {rateId && (
        <div className="text-center mt-8">
          <Button
            onClick={handleCreateLabel}
            disabled={loading}
            className="lg:w-1/2 w-full my-4 relative overflow-hidden group transition-all duration-300 ease-in-out px-8 p-6 rounded-3xl text-black bg-gray-200 hover:text-white"
          >
            <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
            <h1 className="relative z-10 flex items-center gap-2">
              {loading ? "Generating Label..." : "Create Shipping Label"}
            </h1>
          </Button>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center gap-6 my-10">
        {trackingInfo && (
          <motion.div
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
            }}
            className="border md:p-14 p-4 rounded-lg shadow-xl w-full bg-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tracking Information
            </h2>

            <p>
              <strong>Tracking Number:</strong> {trackingInfo.trackingNumber}
            </p>
            <p>
              <strong>Label ID:</strong> {trackingInfo.labelId}
            </p>
            <p>
              <strong>Carrier:</strong> {trackingInfo.carrierCode}
            </p>
          </motion.div>
        )}

        {shippingLabel && (
          <div className="text-end ">
            <Link href={shippingLabel} target="_blank">
              <Button className="my-4 relative overflow-hidden group transition-all duration-300 ease-in-out px-8 p-6 rounded-3xl text-black bg-gray-200 hover:text-white">
                <span className="absolute inset-0 bg-black transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
                <h1 className="relative z-10 flex items-center gap-2">
                  <DownloadIcon /> Download Label
                </h1>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
