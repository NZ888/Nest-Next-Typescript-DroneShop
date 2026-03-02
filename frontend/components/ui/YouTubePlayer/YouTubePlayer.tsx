import {getYoutubeEmbedUrl} from "@/lib/helpers";
import styles from "./YouTubePlayer.module.css"

export default async function YouTubePlayer({ videoUrl }: { videoUrl: string }) {
    const embedUrl = getYoutubeEmbedUrl(videoUrl)
    if (!embedUrl) return null;
    console.log(videoUrl, embedUrl);
    return (
        <div className={styles.videoContainer}>
            <iframe
                src={embedUrl}
                className={styles.videoFrame}
                allowFullScreen
            />
        </div>
    )
}