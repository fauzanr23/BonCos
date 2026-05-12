export default function ModalButtons({setOpenModal}){
    return (
        <>
        <div className="modal-action">
          <button
            type="button"
            className="btn"
            onClick={() => setOpenModal(false)}
          >
            Close
          </button>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        </>
    )
}