import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";

export const Share = ({shareUrl})=>{
    return(
        <div className="flex gap-4">
            <EmailShareButton url={shareUrl}>
                <EmailIcon size={32} round={true} className="hover:bg-gray-400 rounded-md"></EmailIcon>
            </EmailShareButton>
            <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round={true} className="hover:bg-gray-400 rounded-md"></FacebookIcon>
            </FacebookShareButton>
            <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={32} round={true} className="hover:bg-gray-400 rounded-md"></LinkedinIcon>
            </LinkedinShareButton>
            <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={32} round={true} className="hover:bg-gray-400 rounded-md"></WhatsappIcon>
            </WhatsappShareButton>
        </div>
    )
}
