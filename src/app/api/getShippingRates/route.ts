// import ShipEngine from "shipengine";

// const shipengine = new ShipEngine(process.env.SHIPENGINE_API_KEY); // Store API key in .env

// export async function getShippingRates(from, to, packageDetails) {
//   try {
//     const result = await shipengine.getRates({
//       rate_options: { carrier_ids: ["se-123456"] }, // Replace with your carrier ID
//       shipment: {
//         service_code: "usps_priority_mail",
//         ship_from: from,
//         ship_to: to,
//         packages: [packageDetails],
//       },
//     });
//     return result;
//   } catch (error) {
//     console.error("Error fetching rates:", error);
//     throw error;
//   }
// }
