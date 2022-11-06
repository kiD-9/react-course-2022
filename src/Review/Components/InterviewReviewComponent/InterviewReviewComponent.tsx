import React from "react"
import { Link, useParams } from "react-router-dom"

export const InterviewReviewComponent = React.memo(() => {
    const { id } = useParams();
    return <div>
        <h1>{id}</h1>
        <Link to='/cards'>
            <button>Go to all cards</button>
        </Link>
    </div>
})