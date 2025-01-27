import { defineType } from "sanity";

export default defineType({
  name: "cart",
  title: "Cart",
  type: "document",
  fields: [
    {
      name: "userId",
      title: "User ID",
      type: "string",
    },
    {
      name: "items",
      title: "Cart Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "productId", title: "Product ID", type: "string" },
            { name: "name", title: "Name", type: "string" },
            { name: "price", title: "Price", type: "number" },
            { name: "image", title: "Image", type: "string" },
            { name: "quantity", title: "Quantity", type: "number" },
            { name: "discountPercent", title: "Discount Percent", type: "number" },
            { name: "rating", title: "Rating", type: "number" },
            { name: "color", title: "Color", type: "string" },
            { name: "size", title: "Size", type: "string" },
          ],
        },
      ],
    },
  ],
});
