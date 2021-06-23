import copyImg from '../assets/images/copy.svg'

import '../styles/roomcode.scss';

type RoomCodeProps = {
    code: string;
}

export function Roomcode(props: RoomCodeProps) {

    function copyCode() {
        navigator.clipboard.writeText(props.code);
    }
    return (
        <button className="roomcode" onClick={copyCode}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>{props.code}</span>
        </button>
    );
}