import React from "react";
import { useState } from "react";

export default function Player ({initialName, symbol}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        // setIsEditing(!isEditing);
        setIsEditing((editing) => !editing);
    }
    
    function handleChangePlayerName(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName} </span>;
    let buttonCaption = 'Edit';
    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChangePlayerName}/>;
        buttonCaption = 'Save';
    }

    return (
        <li>
            <span className="player">
              {editablePlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{buttonCaption}</button>
          </li>
    )
}
    