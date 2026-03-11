import React from "react";
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
        cms.plugins.add({
            __type: "screen",
            name: "Publish",
            layout: "fullscreen",
            Icon: () => "🚀",
            Component: () => {
                const onPublish = async () => {
                    if (window.confirm("Are you sure you want to publish all changes to the live website? This will trigger a production deployment.")) {
                        try {
                            const res = await fetch("/api/publish", { method: "POST" });
                            if (res.ok) {
                                window.alert("Publishing started! It may take a few minutes for changes to appear on the live site.");
                            } else {
                                const data = await res.json();
                                window.alert("Failed to publish: " + (data.message || "Unknown error"));
                            }
                        } catch (e) {
                            window.alert("An error occurred while publishing.");
                            console.error(e);
                        }
                    }
                };

                return (
                    <div style={{
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        textAlign: 'center',
                        fontFamily: 'sans-serif'
                    }}>
                        <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🚀</div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>Publish Changes</h1>
                        <p style={{ color: '#666', marginBottom: '2.5rem', maxWidth: '450px', lineHeight: '1.5' }}>
                            You are currently editing on the <strong>drafts</strong> branch.
                            Clicking the button below will merge your work into the live site (main) and trigger a deployment.
                        </p>
                        <button
                            onClick={onPublish}
                            style={{
                                background: '#2296fe',
                                color: 'white',
                                padding: '1rem 2rem',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 4px 12px rgba(34, 150, 254, 0.3)'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = '#0070f3';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = '#2296fe';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            Publish to Live Site
                        </button>
                    </div>
                );
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
