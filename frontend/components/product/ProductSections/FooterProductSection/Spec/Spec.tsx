import {ISpecs} from "@/types/product";
import styles from "./Spec.module.css"

export default function Spec(spec: ISpecs){
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div style={{display: "flex", alignItems: "end"}}>
                    <h2>{spec.value}</h2>
                </div>
                {spec.unit &&
                    <div style={{display: "flex", alignItems: "end"}}>
                        <h3>{spec.unit}</h3>
                    </div>
                }
            </div>
            <p className={styles.label}>{spec.labelUk}</p>
        </div>
    )
}