
import { NextRequest } from "next/server";
import ShipEngine from "shipengine";

// Initialize ShipEngine
const shipengine = new ShipEngine(process.env.SHIPENGINE_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const {
      shipeToAddress,
      packages } = await req.json();

    if (!shipeToAddress || !packages) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: shipeToAddress and packages",
        }),
        { status: 400 }
      );
    }

    const shipFromAddress = {
      name: "Urooj Sadiq",
      phone: "+92 3022472086",
      addressLine1: "456 Oak Avenue",
      addressLine2: "Suite 200",
      cityLocality: "Los Angeles",
      stateProvince: "CA",
      postalCode: "90001",
      countryCode: "US",
      addressResidentialIndicator: "no" as "no" | "unknown" | "yes",
    };

    const shipmentDetails = await shipengine.getRatesWithShipmentDetails({
      shipment: {
        shipTo: shipeToAddress,
        shipFrom: shipFromAddress,
        packages: packages,
      },
      rateOptions: {
        carrierIds: [
          process.env.SHIPENGINE_COURIER_1 || "",
          process.env.SHIPENGINE_COURIER_2 || "",
          process.env.SHIPENGINE_COURIER_3 || "",
          process.env.SHIPENGINE_COURIER_4 || "",
        ].filter(Boolean),
      },
    });

    return new Response(
      JSON.stringify({ shipeToAddress, packages, shipmentDetails }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching shipping rates:", error)
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}