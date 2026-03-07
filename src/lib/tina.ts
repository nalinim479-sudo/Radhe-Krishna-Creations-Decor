import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export async function getHomepageData() {
    const filePath = path.join(contentDirectory, "homepage.md");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return data;
}

export async function getProducts() {
    const productsDirectory = path.join(contentDirectory, "products");
    if (!fs.existsSync(productsDirectory)) {
        return [];
    }
    const fileNames = fs.readdirSync(productsDirectory);
    const products = fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, "");
            const fullPath = path.join(productsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);
            // Ensure images is always an array and handle migration from single image field
            const images = data.images && Array.isArray(data.images)
                ? data.images
                : (data.image ? [data.image] : []);

            return {
                slug,
                ...data,
                images,
                image: images[0] || null, // Keep image as a convenience field for grids
            };
        });
    return products;
}

export async function getProductBySlug(slug: string) {
    const fullPath = path.join(contentDirectory, "products", `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
        return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Ensure images is always an array and handle migration from single image field
    const images = data.images && Array.isArray(data.images)
        ? data.images
        : (data.image ? [data.image] : []);

    return {
        slug,
        body: content,
        ...data,
        images,
        image: images[0] || null,
    };
}
