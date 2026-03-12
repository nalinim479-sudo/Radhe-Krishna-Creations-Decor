import React from "react";
import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    "drafts";

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
                const [status, setStatus] = React.useState<any>(null);
                const [loading, setLoading] = React.useState(true);
                const [secondsUntilRetry, setSecondsUntilRetry] = React.useState(0);

                const fetchStatus = async () => {
                    try {
                        const res = await fetch("/api/publish");
                        if (res.ok) {
                            const data = await res.json();
                            setStatus(data);
                        }
                    } catch (e) {
                        console.error("Failed to fetch status", e);
                    } finally {
                        setLoading(false);
                    }
                };

                React.useEffect(() => {
                    fetchStatus();
                    const interval = setInterval(fetchStatus, 20000); // Poll every 20s
                    return () => clearInterval(interval);
                }, []);

                React.useEffect(() => {
                    if (status?.updated_at) {
                        const updateTimer = () => {
                            const lastUpdate = new Date(status.updated_at).getTime();
                            const now = new Date().getTime();
                            const diff = Math.floor((now - lastUpdate) / 1000);
                            const cooldown = 600; // 10 minutes cooldown
                            setSecondsUntilRetry(Math.max(0, cooldown - diff));
                        };
                        updateTimer();
                        const t = setInterval(updateTimer, 1000);
                        return () => clearInterval(t);
                    }
                }, [status]);

                const onPublish = async () => {
                    if (window.confirm("Are you sure you want to publish? This will merge drafts into the live site.")) {
                        try {
                            const res = await fetch("/api/publish", { method: "POST" });
                            if (res.ok) {
                                window.alert("Publish initiated!");
                                fetchStatus();
                            } else {
                                const data = await res.json();
                                window.alert("Error: " + data.message);
                            }
                        } catch (e) {
                            window.alert("An error occurred.");
                        }
                    }
                };

                const isBuilding = ['in_progress', 'queued', 'pending', 'waiting'].includes(status?.state);
                const isFailed = ['failure', 'error'].includes(status?.state);
                const isCooldown = secondsUntilRetry > 0 && status?.state === 'success';

                return (
                    <div style={{
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        textAlign: 'center',
                        fontFamily: 'sans-serif',
                        background: '#f8fafc'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
                        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: 'bold', color: '#1e293b' }}>Publish Changes</h1>
                        
                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            width: '100%',
                            maxWidth: '500px',
                            marginBottom: '2rem'
                        }}>
                            <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                                Branch: <strong style={{color: '#334155'}}>{branch}</strong>
                            </div>

                            <div style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                background: isFailed ? '#fef2f2' : isBuilding ? '#fffbeb' : '#f0fdf4',
                                border: `1px solid ${isFailed ? '#fecaca' : isBuilding ? '#fef3c7' : '#bbf7d0'}`,
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', color: isFailed ? '#991b1b' : isBuilding ? '#92400e' : '#166534' }}>
                                    {loading ? 'Checking Status...' : (
                                        status?.state === 'success' ? '✅ Live' :
                                        isFailed ? '❌ Last Build Failed' :
                                        isBuilding ? '⏳ Build in Progress' : 'Status: ' + status?.state
                                    )}
                                </div>
                                {status?.description && (
                                    <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                                        {status.description}
                                    </div>
                                )}
                                {status?.updated_at && (
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                                        Updated: {new Date(status.updated_at).toLocaleString()}
                                    </div>
                                )}
                            </div>

                            {isFailed && (
                                <div style={{ fontSize: '0.85rem', color: '#dc2626', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                                    The last update didn't go live. Please fix any errors in your products and try publishing again.
                                </div>
                            )}

                            <button
                                onClick={onPublish}
                                disabled={isBuilding || isCooldown}
                                style={{
                                    background: (isBuilding || isCooldown) ? '#cbd5e1' : '#2296fe',
                                    color: 'white',
                                    padding: '0.8rem 2rem',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    cursor: (isBuilding || isCooldown) ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s ease',
                                    width: '100%'
                                }}
                            >
                                {isBuilding ? 'Building...' : isCooldown ? `Next Publish in ${Math.floor(secondsUntilRetry / 60)}m ${secondsUntilRetry % 60}s` : 'Publish to Live Site'}
                            </button>
                            
                            {isCooldown && (
                                <p style={{ fontSize: '0.8rem', color: '#dc2626', marginTop: '0.75rem', fontWeight: '500' }}>
                                    Publishing is locked for 10 minutes to ensure deployment stability. 
                                    Please wait: {Math.floor(secondsUntilRetry / 60)}m {secondsUntilRetry % 60}s
                                </p>
                            )}
                        </div>

                        <p style={{ color: '#64748b', fontSize: '0.85rem', maxWidth: '400px', lineHeight: '1.5' }}>
                            Edits are saved to the <strong>drafts</strong> branch. 
                            Publishing merges them into the <strong>main</strong> branch and updates the live website.
                        </p>
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
