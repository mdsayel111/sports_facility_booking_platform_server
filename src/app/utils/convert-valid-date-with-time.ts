// creat validDateWithtime function
const validDateWithtime = (dateString: string, timeString: string) => {
    return new Date(`${dateString}T${timeString}`);
}

export default validDateWithtime
