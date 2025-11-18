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
