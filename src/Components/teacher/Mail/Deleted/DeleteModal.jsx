import { Modal } from '@mui/material';
import { deleteMail } from '../../../../services/mail.service';
import { toast } from 'react-toastify';

function DeleteModal({ open, handleClose, messageData, setFltMails }) {

    const handleDelete = async () => {
        console.log(messageData);
        const res = await deleteMail(messageData.threadId);
        console.log(res.data.message);
        if (res.status === 200) {
            setFltMails(prevData => prevData.map(m => {
                if (m.emailid === messageData.emailid) {
                    return { ...m, is_deleted: new Date() };
                } else {
                    return m;
                }
            }));
            handleClose();
            toast.success(res.data.message);
        } else {
            handleClose();
            toast.error(res.data.message);
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
                <div className="bg-white rounded-lg shadow-lg p-6 w-80" onClick={(e) => e.stopPropagation()}>
                    <h5 className="text-lg font-semibold mb-4">Delete Confirmation</h5>
                    <p className="text-gray-700 text-center mb-6">
                        Are you sure you want to delete this?
                    </p>
                    <div className="flex justify-evenly">
                        <button 
                            onClick={handleClose} 
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleDelete} 
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteModal;