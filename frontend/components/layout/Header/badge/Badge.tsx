export const Badge = ({ value, top, right }: { value: number, top:number, right: number }) => {
    if (value <= 0) return null;

    return (
        <div
            style={{
                position: "absolute",
                top: `${top}px`,
                right: `${right}px`,
                minWidth: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: "#B62D11",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 600,
                lineHeight: 1,
                padding: "0 4px",
            }}
        >
            {value > 99 ? "99+" : value}
        </div>
    );
};
