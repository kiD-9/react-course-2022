import React, { useState } from "react"
import { useQuery } from "react-query";
import Popup from "reactjs-popup";
import { Interview } from "../../../Models/Interviews/Interview";
import { createInvitation } from "../../../Routes/Queries";
import './CreateInvitationButton.less';

export const CreateInvitationButton = React.memo((props: Interview) => {
    const [createInv, setCreateInv] = useState<boolean>(false);
    const [invitation, setInvitation] = useState<string>(null)
    const [showCopied, setShowCopied] = useState<boolean>(false);

    useQuery([`invitation ${props.id}`, props.id],
        () => { return createInvitation('Candidate', props.id) },
        { enabled: createInv && invitation === null, onSuccess: setInvitation });

    const onCreateInvBtnClick = () => {
        if (!createInv) {
            setCreateInv(true);
        }
    }

    const onInvitationClick = () => {
        navigator.clipboard.writeText(`localhost:3000/register/${invitation}`);

        setShowCopied(true);
        setInterval(() => {
            setShowCopied(false);
        }, 1000)
    }

    return (
    <div className="createInvWrapper">
        <button className="createInvBtn" onClick={() => onCreateInvBtnClick()}>
            <div>{props.vacancy}</div>
        </button>
        {invitation && (
            <>
                <div className="invitation" onClick={() =>onInvitationClick()}>
                    {`localhost:3000/register/${invitation}`}
                </div>
                {showCopied && (<span className="copied">Link copied</span>)}
            </>
        )}
    </div>)
})