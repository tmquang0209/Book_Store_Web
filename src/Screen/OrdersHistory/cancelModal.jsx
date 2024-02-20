import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";

const CancelModal = ({ onCancelPress, open, handleOpen }) => {
    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Confirm cancellation</DialogHeader>
            <DialogBody>
                After canceling, the order will be marked as canceled and the customer will be refunded. Are you sure you want to cancel this order?
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={onCancelPress}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default CancelModal;
