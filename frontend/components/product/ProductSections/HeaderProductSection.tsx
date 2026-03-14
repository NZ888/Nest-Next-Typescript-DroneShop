import {ISection} from "@/types/product";
import YouTubePlayer from "@/components/ui/YouTubePlayer/YouTubePlayer";

const styles = {
    container: {
        backgroundColor: 'white',
        width: '100vw',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
    },
    infoH2:{
        fontSize: '44px',
        fontWeight: 400,
        fontFamily: 'var(--second-family)',
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    infoP:{
        fontSize: '16px',
        fontWeight: 400,
        fontFamily: 'var(--second-family)',
        letterSpacing: '0.03em',
        textAlign: 'center',
    },
    videoContainer: {
        marginTop: '70px',
        width: '70%',
        height: '100%',
    }
}

export default async function HeaderProductSection(section : ISection){
    let videoUrl:string = "";
    if(section.video){
        videoUrl = section.video
    }

    return(
        <>
            <div style={styles.container}>
                <div style={styles.infoContainer}>
                    <h2 style={styles.infoH2}>{section.title}</h2>
                    <p>{section.text}</p>
                </div>
                <div style={styles.videoContainer}>
                    <YouTubePlayer videoUrl={videoUrl}/>
                </div>
            </div>
        </>
    )
}