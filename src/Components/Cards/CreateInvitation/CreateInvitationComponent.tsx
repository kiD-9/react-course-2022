import React, { useState } from "react";
import "./CreateInvitationComponent.less";
import Popup from "reactjs-popup";
import { getInterviews } from "../../../Routes/Queries";
import { useQuery } from "react-query";
import { Interview } from "../../../Models/Interviews/Interview";
import { CreateInvitationButton } from "./CreateInvitationButton";

export const CreateInvitationComponent = React.memo(() => {
    const [open, setOpen] = useState<boolean>(false);
    const closeModal = () => setOpen(false);
    const [interviews, setInterviews] = useState<Interview[]>();

    const { isLoading, data } = useQuery('interviews', getInterviews, {onSuccess: setInterviews });

    return (
    <div>
        <div className="createInvBtnWrapper">
            <button className="showPopupBtn" onClick={() => setOpen(open => !open)}>+ Пригласить участника</button>
        </div>
        <Popup open={open} closeOnDocumentClick onClose={closeModal} className="my-popup">
        <div className="modal">
            <a className="close" onClick={closeModal}>&times;</a><br/>
            {isLoading
            ? <div>Loading</div>
            : <span className="content">
                {isLoading
                ? <div>Loading</div>
                : (<div className="interviews">
                    {interviews.map(interview => <CreateInvitationButton {...interview} key={interview.id}/>)}
                </div>)}
            </span>}
        </div>
        </Popup>
    </div>
    );
})