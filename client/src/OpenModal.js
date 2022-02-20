import Modal from "./Components/Modal";
import "./Stylesheet/App.scss";

export default function OpenModal() {
    return (
        <div className="openModal">
            <h1>Open Modal</h1>
            <button className="openModalBtn">Open</button>
            <Modal />
        </div>
    )
}