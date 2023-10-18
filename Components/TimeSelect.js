const TimeSelect = (props) => {
    const fromChangeHandler = (e) => {
        props.fromChange(e.target.value)
    }

    const toChangeHandler = (e) => {
        props.toChange(e.target.value)
    }

    return <div className="flex flex-row justify-between gap-3">
                        <select onChange={fromChangeHandler} className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "90px", height: "27px"}}>
                            <option disabled>From</option>
                            <option value="0" className="">12:00am</option>
                            <option value="1" className="">01:00am</option>
                            <option value="2" className="">02:00am</option>
                            <option value="3" className="">03:00am</option>
                            <option value="4" className="">04:00am</option>
                            <option value="5" className="">05:00am</option>
                            <option value="6" className="">06:00am</option>
                            <option value="7" selected className="">07:00am</option>
                            <option value="8" className="">08:00am</option>
                            <option value="9" className="">09:00am</option>
                            <option value="10" className="">10:00am</option>
                            <option value="11" className="">11:00am</option>
                            <option value="12" className="">12:00pm</option>
                            <option value="13" className="">01:00pm</option>
                            <option value="14" className="">02:00pm</option>
                            <option value="15" className="">03:00pm</option>
                            <option value="16" className="">04:00pm</option>
                            <option value="17" className="">05:00pm</option>
                            <option value="18" className="">06:00pm</option>
                            <option value="19" className="">07:00pm</option>
                            <option value="20" className="">08:00pm</option>
                            <option value="21" className="">09:00pm</option>
                            <option value="22" className="">10:00pm</option>
                            <option value="23" className="">11:00pm</option>
                        </select>
                        <select onChange={toChangeHandler} className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "90px", height: "27px"}}>
                            <option disabled>To</option>
                            <option value="0" className="">12:00am</option>
                            <option value="1" className="">01:00am</option>
                            <option value="2" className="">02:00am</option>
                            <option value="3" className="">03:00am</option>
                            <option value="4" className="">04:00am</option>
                            <option value="5" className="">05:00am</option>
                            <option value="6" className="">06:00am</option>
                            <option value="7" className="">07:00am</option>
                            <option value="8" className="">08:00am</option>
                            <option value="9" className="">09:00am</option>
                            <option value="10" className="">10:00am</option>
                            <option value="11" className="">11:00am</option>
                            <option value="12" className="">12:00pm</option>
                            <option value="13" className="">01:00pm</option>
                            <option value="14" className="">02:00pm</option>
                            <option value="15" className="">03:00pm</option>
                            <option value="16" className="">04:00pm</option>
                            <option value="17" className="">05:00pm</option>
                            <option value="18" className="">06:00pm</option>
                            <option value="19" className="">07:00pm</option>
                            <option value="20" className="">08:00pm</option>
                            <option value="21" className="">09:00pm</option>
                            <option value="22" selected className="">10:00pm</option>
                            <option value="23" className="">11:00pm</option>
                        </select> 
                    </div>
}

export default TimeSelect;