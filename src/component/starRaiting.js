import React from 'react';

const Star = (props) => {

    const changeGrade = (e) => {
        props.changeGradeIndex(e.target.value);
    }

    return (
        <label className="star">
            <input
                type="radio"
                name="rating"
                id={props.grade}
                value={props.index}
                className="stars_radio-input"
                onClick={changeGrade}
            />
            {/* <svg
                width="58"
                height="58"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#393939"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={props.style}
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg> */}
            <svg
                width="30"
                height="28"
                viewBox="0 0 30 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={props.style}
            >
                <path d="M15 22.7742L21.7898 26.7642C23.0332 27.4955 24.5548 26.4145 24.2276 25.0474L22.4279 17.5443L28.4323 12.4892C29.5285 11.5672 28.9395 9.81858 27.4998 9.7073L19.5974 9.05555L16.5052 1.96571C15.9489 0.678096 14.0511 0.678096 13.4948 1.96571L10.4026 9.03965L2.50023 9.69141C1.06047 9.80268 0.471471 11.5513 1.56766 12.4733L7.57213 17.5284L5.77242 25.0315C5.4452 26.3986 6.96677 27.4796 8.2102 26.7483L15 22.7742Z" stroke="#2D2D2D" stroke-width="1.5" />
            </svg>

        </label>
    );
}

export default Star;