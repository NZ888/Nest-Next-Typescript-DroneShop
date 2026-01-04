export function svgToJsx(svg: string): string {
    const camel = (str: string): string =>
        str.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

    return svg
        .replace(/([a-zA-Z-]+)=/g, (match: string): string => camel(match))
        .replace(/style="([^"]+)"/g, (_, styles: string): string => {
            const objectLiteral = styles
                .split(";")
                .filter(Boolean)
                .map((rule: string) => {
                    const [key, value] = rule.split(":");
                    if (!key || !value) return "";
                    return `${camel(key.trim())}: "${value.trim()}"`;
                })
                .join(", ");

            return `style={{ ${objectLiteral} }}`;
        });
}
export async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        let errText = "Unknown server error";

        try {
            const json = await res.json();
            if (json?.message) errText = json.message;
        } catch {
            const text = await res.text();
            if (text) errText = text;
        }

        throw new Error(errText);
    }

    return await res.json() as Promise<T>;
}
