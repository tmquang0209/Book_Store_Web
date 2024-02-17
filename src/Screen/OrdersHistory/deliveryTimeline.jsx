import { MdOutlineCancel, MdPendingActions } from "react-icons/md";
import { orderStatus } from "../../components/Constants/text";
import { GiConfirmed } from "react-icons/gi";
import { FaRegStar, FaShippingFast } from "react-icons/fa";
import { dateAndTime } from "../../components/Common/date";

const DeliveryTimeline = ({ status, data }) => {
    let timeline = [];
    if (status !== orderStatus.CANCELED)
        timeline = [
            {
                id: orderStatus.PENDING,
                title: "Pending",
                icon: <MdPendingActions size={20} />,
                color: "bg-blue-500",
            },
            {
                id: orderStatus.CONFIRM,
                title: "Confirmed",
                icon: <GiConfirmed size={20} />,
                color: "bg-green-500",
            },
            {
                id: orderStatus.SHIPPING,
                title: "Shipping",
                icon: <FaShippingFast size={20} />,
                color: "bg-yellow-500",
            },
            {
                id: orderStatus.DELIVERED,
                title: "Delivered",
                icon: <FaRegStar size={20} />,
                color: "bg-gray-500",
            },
        ];
    else
        timeline = [
            {
                id: orderStatus.PENDING,
                title: "Pending",
                icon: <MdPendingActions size={20} />,
                color: "bg-blue-500",
            },
            {
                id: orderStatus.CANCELED,
                title: "Cancel",
                icon: <MdOutlineCancel size={20} />,
                color: "bg-red-500",
            },
        ];

    console.log(data, timeline);
    return (
        <ol className="w-full justify-between sm:flex">
            {timeline.map((item, index) => (
                <li className="relative mb-6 w-full sm:mb-0" key={index}>
                    <div className="flex items-center">
                        <div
                            className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.color} text-white ring-0 ring-white sm:ring-8`}
                        >
                            {item.icon}
                        </div>
                        <div className="hidden h-0.5 w-full bg-gray-200 sm:flex"></div>
                    </div>
                    <div className="mt-3 sm:pe-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                        {data &&
                            data.map((shipItem) => {
                                if (shipItem.status === item.id) {
                                    return (
                                        <div className="py-1">
                                            <time className="mb-2 block text-sm font-normal leading-none text-primary">
                                                {dateAndTime(shipItem?.time)}
                                            </time>
                                            <p className="text-base font-normal text-gray-500">{shipItem?.description}</p>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <>
                                            <div></div>
                                        </>
                                    );
                                }
                            })}
                    </div>
                </li>
            ))}
        </ol>
    );
};

export default DeliveryTimeline;
