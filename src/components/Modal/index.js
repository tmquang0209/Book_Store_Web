import { IoIosClose } from "react-icons/io";

export const Modal = (props) => {
    const { modal, setModal, headerTitle, body, footer } = props;

    return (
        <>
            {modal && (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden outline-none backdrop-blur-sm focus:outline-none">
                        <div className="relative mx-auto my-6 w-auto max-w-3xl">
                            {/*content*/}
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                                {/*header*/}
                                <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                                    <h3 className="text-3xl font-semibold">{headerTitle}</h3>
                                    <button
                                        className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                                        onClick={() => setModal(false)}
                                    >
                                        <IoIosClose />
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative flex-auto p-6">{body}</div>
                                {/*footer*/}
                                <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                                    {/* <button
                                        className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                                        type="button"
                                        onClick={() => setModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                                        type="button"
                                        onClick={() => setModal(false)}
                                    >
                                        Save Changes
                                    </button> */}
                                    {footer}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
            )}
        </>
    );
};
