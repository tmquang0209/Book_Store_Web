export const Toast = ({ message, type }) => {
    return <span className={`mb-2 flex rounded-md ${type ? "bg-green-300" : "bg-red-300"} p-2 text-white`}>{message}</span>;
};
