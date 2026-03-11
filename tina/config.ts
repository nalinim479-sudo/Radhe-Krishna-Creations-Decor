import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.HEAD ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    "main";

export default defineConfig({
    branch,
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // Get this from tina.io
    token: process.env.TINA_TOKEN, // Get this from tina.io

    build: {
        outputFolder: "admin",
        publicFolder: "public",
    },
    media: {
        tina: {
            mediaRoot: "images",
            publicFolder: "public",
        },
    },
    cmsCallback: (cms) => {
        cms.sidebar.addAdminAction({
            name: "publish",
            label: "Publish to Live Site",
            component: "button",
            onClick: async () => {
                if (confirm("Are you sure you want to publish all changes to the live website? This will trigger a production deployment.")) {
                    try {
                        const res = await fetch("/api/publish", { method: "POST" });
                        const data = await res.json();
                        if (res.ok) {
                            alert("Publishing started! It may take a few minutes for changes to appear on the live site.");
                        } else {
                            alert("Failed to publish: " + (data.message || "Unknown error"));
                        }
                    } catch (e) {
                        alert("An error occurred while publishing.");
                        console.error(e);
                    }
                }
            },
        });
        return cms;
    },
    schema: {
        collections: [
            {
                name: "homepage",
                label: "Homepage",
                path: "content",
                format: "md",
                match: {
                    include: "homepage",
                },
                ui: {
                    allowedActions: {
                        create: false,
                        delete: false,
                    },
                },
                fields: [
                    {
                        type: "string",
                        name: "heroHeadline",
                        label: "Hero Headline",
                    },
                    {
                        type: "string",
                        name: "heroDescription",
                        label: "Hero Description",
                        ui: {
                            component: "textarea",
                        },
                    },
                    {
                        type: "string",
                        name: "featuredSectionTitle",
                        label: "Featured Section Title",
                    },
                    {
                        type: "string",
                        name: "aboutHeadline",
                        label: "About Headline",
                    },
                    {
                        type: "rich-text",
                        name: "aboutText",
                        label: "About Text",
                    },
                    {
                        type: "string",
                        name: "ctaHeadline",
                        label: "CTA Headline",
                    },
                    {
                        type: "string",
                        name: "ctaText",
                        label: "CTA Text",
                    },
                ],
            },
            {
                name: "product",
                label: "Products",
                path: "content/products",
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "number",
                        name: "price",
                        label: "Price",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "category",
                        label: "Category",
                        options: ["Candles", "Festive Decor", "Pooja Decor", "Gift Items"],
                    },
                    {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: {
                            component: "textarea",
                        },
                    },
                    {
                        type: "image",
                        name: "images",
                        label: "Product Images",
                        list: true,
                        ui: {
                            validate: (value) => {
                                if (value && value.length > 4) {
                                    return "You can only upload up to 4 images";
                                }
                            },
                        },
                    },
                    {
                        type: "boolean",
                        name: "featured",
                        label: "Featured Product",
                    },
                ],
            },
        ],
    },
});
