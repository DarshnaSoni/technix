export default function customImageLoader ({ src, width, quality }) {
    const imageUrl = `http://localhost:1337${src}`;
    return `${imageUrl}?w=${width}&q=${quality || 75}`;
}